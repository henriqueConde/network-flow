import { Prisma } from '@prisma/client';
import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Contacts data access.
 */
export function makeContactsRepo() {
  return {
    /**
     * List contacts for a user with optional filters.
     */
    async listContacts(params: {
      userId: string;
      search?: string;
      company?: string;
      categoryId?: string;
      stageId?: string;
      primaryPlatform?: string;
      page: number;
      pageSize: number;
      sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt';
      sortDir: 'asc' | 'desc';
    }) {
      const {
        userId,
        search,
        company,
        categoryId,
        stageId,
        primaryPlatform,
        page,
        pageSize,
        sortBy,
        sortDir,
      } = params;

      const where: any = {
        userId,
      };

      // Search by name, headline, or company
      if (search && search.trim().length > 0) {
        where.OR = [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            headlineOrRole: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            company: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ];
      }

      if (company) {
        where.company = {
          contains: company,
          mode: 'insensitive',
        };
      }

      if (primaryPlatform) {
        where.primaryPlatform = primaryPlatform;
      }

      // Filter by category or stage - check both contact's own category/stage and conversations
      if (categoryId || stageId) {
        const categoryStageFilters: any[] = [];

        // Contact has both category and stage
        if (categoryId && stageId) {
          categoryStageFilters.push({
            categoryId,
            stageId,
          });
          categoryStageFilters.push({
            conversations: {
              some: {
                categoryId,
                stageId,
              },
            },
          });
        } else {
          // Contact has category or stage (or both separately)
          if (categoryId) {
            categoryStageFilters.push({ categoryId });
            categoryStageFilters.push({
              conversations: {
                some: { categoryId },
              },
            });
          }
          if (stageId) {
            categoryStageFilters.push({ stageId });
            categoryStageFilters.push({
              conversations: {
                some: { stageId },
              },
            });
          }
        }

        // If we have both search and category/stage filters, combine them with AND
        if (where.OR && categoryStageFilters.length > 0) {
          // Search OR condition exists, combine with category/stage filter using AND
          where.AND = [
            { OR: where.OR },
            { OR: categoryStageFilters },
          ];
          delete where.OR;
        } else if (categoryStageFilters.length > 0) {
          // No search filter, just use category/stage OR
          where.OR = categoryStageFilters;
        }
      }

      const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
          where,
          include: {
            category: true,
            stage: true,
            conversations: {
              include: {
                category: true,
                stage: true,
              },
              orderBy: {
                updatedAt: 'desc',
              },
              take: 1, // Get the most recent conversation for summary
            },
          },
          orderBy: {
            [sortBy]: sortDir,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.contact.count({ where }),
      ]);

      return {
        contacts,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    /**
     * Get a single contact by ID with all related conversations.
     */
    async getContactById(params: { userId: string; contactId: string }) {
      const { userId, contactId } = params;

      const contact = await prisma.contact.findFirst({
        where: {
          id: contactId,
          userId,
        },
        include: {
          category: true,
          stage: true,
          conversations: {
            include: {
              category: true,
              stage: true,
            },
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      });

      return contact;
    },

    /**
     * Check if a contact already exists by LinkedIn URL.
     * Returns the existing contact if found, null otherwise.
     */
    async findContactByLinkedInUrl(params: {
      userId: string;
      linkedInUrl: string;
    }) {
      const { userId, linkedInUrl } = params;

      // Get all contacts for the user and filter in memory
      // This is necessary because Prisma's JSON filtering is limited
      const contacts = await prisma.contact.findMany({
        where: {
          userId,
          profileLinks: {
            not: Prisma.JsonNull,
          },
        },
        select: {
          id: true,
          name: true,
          profileLinks: true,
        },
      });

      // Filter contacts where profileLinks.linkedin matches
      const matchingContact = contacts.find((contact) => {
        if (!contact.profileLinks || typeof contact.profileLinks !== 'object') {
          return false;
        }
        const links = contact.profileLinks as Record<string, unknown>;
        return links.linkedin === linkedInUrl;
      });

      if (!matchingContact) {
        return null;
      }

      // Return full contact
      return await prisma.contact.findUnique({
        where: {
          id: matchingContact.id,
        },
      });
    },

    /**
     * Check if a contact already exists by name (case-insensitive).
     * Returns the existing contact if found, null otherwise.
     */
    async findContactByName(params: {
      userId: string;
      name: string;
    }) {
      const { userId, name } = params;

      const contact = await prisma.contact.findFirst({
        where: {
          userId,
          name: {
            equals: name,
            mode: 'insensitive',
          },
        },
      });

      return contact;
    },

    /**
     * Create a new contact.
     */
    async createContact(params: {
      userId: string;
      data: {
        name: string;
        headlineOrRole?: string | null;
        company?: string | null;
        primaryPlatform?: string | null;
        profileLinks?: Record<string, string> | null;
        tags?: string[];
        categoryId?: string | null;
        stageId?: string | null;
      };
    }) {
      const { userId, data } = params;

      // Handle JSON field null values properly for Prisma
      const profileLinksValue = data.profileLinks === null
        ? Prisma.JsonNull
        : data.profileLinks;

      const contact = await prisma.contact.create({
        data: {
          userId,
          name: data.name,
          headlineOrRole: data.headlineOrRole ?? null,
          company: data.company ?? null,
          primaryPlatform: data.primaryPlatform ?? null,
          profileLinks: profileLinksValue,
          tags: data.tags ?? [],
          categoryId: data.categoryId ?? null,
          stageId: data.stageId ?? null,
        },
        include: {
          category: true,
          stage: true,
          conversations: {
            include: {
              category: true,
              stage: true,
            },
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      });

      return contact;
    },

    /**
     * Update a contact.
     */
    async updateContact(params: {
      userId: string;
      contactId: string;
      updates: {
        name?: string;
        headlineOrRole?: string | null;
        company?: string | null;
        primaryPlatform?: string | null;
        profileLinks?: Record<string, string> | null;
        tags?: string[];
        categoryId?: string | null;
        stageId?: string | null;
      };
    }) {
      const { userId, contactId, updates } = params;

      // Handle JSON field null values properly for Prisma
      const updateData: any = {
        ...updates,
        updatedAt: new Date(),
      };

      if ('profileLinks' in updates && updates.profileLinks !== undefined) {
        updateData.profileLinks = updates.profileLinks === null
          ? Prisma.JsonNull
          : updates.profileLinks;
      }

      const updated = await prisma.contact.updateMany({
        where: {
          id: contactId,
          userId,
        },
        data: updateData,
      });

      if (updated.count === 0) {
        return null;
      }

      return await prisma.contact.findFirst({
        where: {
          id: contactId,
          userId,
        },
        include: {
          category: true,
          stage: true,
          conversations: {
            include: {
              category: true,
              stage: true,
            },
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      });
    },

    /**
     * Delete a contact.
     * This will cascade delete all associated conversations and their messages
     * due to the onDelete: Cascade relationship in the schema.
     */
    async deleteContact(params: { userId: string; contactId: string }) {
      const { userId, contactId } = params;

      // First verify the contact exists and belongs to the user
      const contact = await prisma.contact.findFirst({
        where: {
          id: contactId,
          userId,
        },
      });

      if (!contact) {
        return false;
      }

      // Use delete (not deleteMany) to ensure cascade deletes work properly
      // The cascade will automatically delete:
      // - All conversations associated with this contact
      // - All messages in those conversations (via conversation's cascade)
      await prisma.contact.delete({
        where: {
          id: contactId,
        },
      });

      return true;
    },
  };
}

