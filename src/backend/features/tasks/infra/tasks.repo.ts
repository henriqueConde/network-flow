import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Tasks data access.
 * Handles all database queries for tasks.
 */
export function makeTasksRepo() {
  return {
    /**
     * Create a new task
     */
    async createTask(params: {
      userId: string;
      title: string;
      description?: string | null;
      dueAt?: Date | null;
      priority?: 'low' | 'medium' | 'high' | null;
      conversationId?: string | null;
      opportunityId?: string | null;
    }) {
      const task = await prisma.task.create({
        data: {
          userId: params.userId,
          title: params.title,
          description: params.description ?? null,
          dueAt: params.dueAt ?? null,
          priority: params.priority ?? null,
          conversationId: params.conversationId ?? null,
          opportunityId: params.opportunityId ?? null,
        },
      });

      return task;
    },

    /**
     * Get a task by ID
     */
    async getTaskById(params: { userId: string; taskId: string }) {
      const task = await prisma.task.findFirst({
        where: {
          id: params.taskId,
          userId: params.userId,
        },
        include: {
          conversation: {
            select: {
              id: true,
              contact: {
                select: {
                  name: true,
                  company: true,
                },
              },
            },
          },
          opportunity: {
            select: {
              id: true,
              title: true,
              contact: {
                select: {
                  name: true,
                  company: true,
                },
              },
            },
          },
        },
      });

      return task;
    },

    /**
     * List tasks with filters
     */
    async listTasks(params: {
      userId: string;
      completed?: boolean;
      dueDate?: 'today' | 'overdue' | 'upcoming' | 'all';
      priority?: 'low' | 'medium' | 'high';
    }) {
      const { userId, completed, dueDate, priority } = params;
      const now = new Date();
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

      const where: any = {
        userId,
      };

      // Filter by completion status
      if (completed !== undefined) {
        if (completed) {
          where.completedAt = { not: null };
        } else {
          where.completedAt = null;
        }
      }

      // Filter by due date
      if (dueDate && dueDate !== 'all') {
        if (dueDate === 'today') {
          where.dueAt = {
            lte: endOfToday,
            not: null,
          };
        } else if (dueDate === 'overdue') {
          where.dueAt = {
            lt: now,
            not: null,
          };
          where.completedAt = null; // Only incomplete overdue tasks
        } else if (dueDate === 'upcoming') {
          where.dueAt = {
            gt: endOfToday,
            not: null,
          };
        }
      }

      // Filter by priority
      if (priority) {
        where.priority = priority;
      }

      const tasks = await prisma.task.findMany({
        where,
        include: {
          conversation: {
            select: {
              id: true,
              contact: {
                select: {
                  name: true,
                  company: true,
                },
              },
            },
          },
          opportunity: {
            select: {
              id: true,
              title: true,
              contact: {
                select: {
                  name: true,
                  company: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            priority: 'desc', // high > medium > low > null
          },
          {
            dueAt: 'asc',
          },
          {
            createdAt: 'desc',
          },
        ],
      });

      return tasks;
    },

    /**
     * Update a task
     */
    async updateTask(params: {
      userId: string;
      taskId: string;
      title?: string;
      description?: string | null;
      dueAt?: Date | null;
      priority?: 'low' | 'medium' | 'high' | null;
      conversationId?: string | null;
      opportunityId?: string | null;
    }) {
      const { userId, taskId, ...updates } = params;

      const updateData: any = {};
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.dueAt !== undefined) updateData.dueAt = updates.dueAt;
      if (updates.priority !== undefined) updateData.priority = updates.priority;
      if (updates.conversationId !== undefined) updateData.conversationId = updates.conversationId;
      if (updates.opportunityId !== undefined) updateData.opportunityId = updates.opportunityId;

      const task = await prisma.task.updateMany({
        where: {
          id: taskId,
          userId,
        },
        data: updateData,
      });

      if (task.count === 0) {
        return null;
      }

      return this.getTaskById({ userId, taskId });
    },

    /**
     * Mark task as completed
     */
    async completeTask(params: { userId: string; taskId: string }) {
      const task = await prisma.task.updateMany({
        where: {
          id: params.taskId,
          userId: params.userId,
        },
        data: {
          completedAt: new Date(),
        },
      });

      if (task.count === 0) {
        return null;
      }

      return this.getTaskById({ userId: params.userId, taskId: params.taskId });
    },

    /**
     * Mark task as not completed
     */
    async uncompleteTask(params: { userId: string; taskId: string }) {
      const task = await prisma.task.updateMany({
        where: {
          id: params.taskId,
          userId: params.userId,
        },
        data: {
          completedAt: null,
        },
      });

      if (task.count === 0) {
        return null;
      }

      return this.getTaskById({ userId: params.userId, taskId: params.taskId });
    },

    /**
     * Delete a task
     */
    async deleteTask(params: { userId: string; taskId: string }) {
      const task = await prisma.task.deleteMany({
        where: {
          id: params.taskId,
          userId: params.userId,
        },
      });

      return task.count > 0;
    },

    /**
     * Get tasks due today or overdue (for today page)
     * Includes both incomplete tasks and tasks completed today
     */
    async getTodayTasks(userId: string) {
      const now = new Date();
      // Use start of tomorrow to include all of today (including 23:59:59.999)
      const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
      // Start of today to filter tasks completed today
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

      const tasks = await prisma.task.findMany({
        where: {
          userId,
          dueAt: {
            lt: startOfTomorrow, // Less than start of tomorrow = all of today
            not: null,
          },
          // Include incomplete tasks OR tasks completed today
          OR: [
            { completedAt: null },
            {
              completedAt: {
                gte: startOfToday, // Completed today
              },
            },
          ],
        },
        include: {
          conversation: {
            select: {
              id: true,
              contact: {
                select: {
                  name: true,
                  company: true,
                },
              },
            },
          },
          opportunity: {
            select: {
              id: true,
              title: true,
              contact: {
                select: {
                  name: true,
                  company: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            priority: 'desc',
          },
          {
            dueAt: 'asc',
          },
        ],
        take: 20,
      });

      return tasks;
    },
  };
}

