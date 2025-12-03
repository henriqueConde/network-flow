import { fetchLinkedInContacts, type LinkedInContact } from '../infra/linkedin.service';
import { makeContactsRepo } from '../infra/contacts.repo';
import { getCategoryByName, ensureDefaultCategories } from '@/backend/features/categories';
import { Prisma } from '@prisma/client';

export interface ImportProgress {
    total: number;
    processed: number;
    created: number;
    skipped: number;
    currentContact?: {
        name: string;
        status: 'processing' | 'created' | 'skipped';
    };
}

/**
 * Use case: Import LinkedIn contacts.
 * Fetches contacts from LinkedIn API and creates them in the database,
 * skipping duplicates and assigning "Warm outreach" category and "linkedin imported" tag.
 */
export async function* importLinkedInContacts(
    userId: string
): AsyncGenerator<ImportProgress, ImportProgress, unknown> {
    const contactsRepo = makeContactsRepo();

    // Ensure default categories exist (including "Warm outreach")
    await ensureDefaultCategories(userId);

    // Get the "Warm outreach" category
    let warmOutreachCategory = await getCategoryByName(userId, 'Warm outreach');
    if (!warmOutreachCategory) {
        // If it doesn't exist, ensure defaults again and try once more
        await ensureDefaultCategories(userId);
        warmOutreachCategory = await getCategoryByName(userId, 'Warm outreach');
        if (!warmOutreachCategory) {
            throw new Error('Could not find or create "Warm outreach" category');
        }
    }

    // Fetch contacts from LinkedIn
    const linkedInContacts = await fetchLinkedInContacts();

    let processed = 0;
    let created = 0;
    let skipped = 0;
    const total = linkedInContacts.length;

    // Process each contact
    for (const linkedInContact of linkedInContacts) {
        const firstName = linkedInContact['First Name']?.trim() || '';
        const lastName = linkedInContact['Last Name']?.trim() || '';
        const name = `${firstName} ${lastName}`.trim();

        // Skip if no name
        if (!name) {
            processed++;
            skipped++;
            yield {
                total,
                processed,
                created,
                skipped,
                currentContact: {
                    name: 'Unknown',
                    status: 'skipped',
                },
            };
            continue;
        }

        const linkedInUrl = linkedInContact.URL?.trim() || '';
        const company = linkedInContact.Company?.trim() || null;
        const position = linkedInContact.Position?.trim() || null;
        const email = linkedInContact['Email Address']?.trim() || null;

        // Check for duplicates
        // First check by LinkedIn URL if available
        let existingContact = null;
        if (linkedInUrl) {
            existingContact = await contactsRepo.findContactByLinkedInUrl({
                userId,
                linkedInUrl,
            });
        }

        // If not found by URL, check by name
        if (!existingContact) {
            existingContact = await contactsRepo.findContactByName({
                userId,
                name,
            });
        }

        if (existingContact) {
            // Skip duplicate
            processed++;
            skipped++;
            yield {
                total,
                processed,
                created,
                skipped,
                currentContact: {
                    name,
                    status: 'skipped',
                },
            };
            continue;
        }

        // Create the contact
        const profileLinks: Record<string, string> = {};
        if (linkedInUrl) {
            profileLinks.linkedin = linkedInUrl;
        }

        const tags = ['linkedin imported'];

        await contactsRepo.createContact({
            userId,
            data: {
                name,
                headlineOrRole: position || null,
                company: company || null,
                primaryPlatform: linkedInUrl ? 'linkedin' : null,
                profileLinks: Object.keys(profileLinks).length > 0 ? profileLinks : null,
                tags,
                categoryId: warmOutreachCategory.id,
                stageId: null,
            },
        });

        processed++;
        created++;
        yield {
            total,
            processed,
            created,
            skipped,
            currentContact: {
                name,
                status: 'created',
            },
        };
    }

    // Final progress update
    return {
        total,
        processed,
        created,
        skipped,
    };
}

