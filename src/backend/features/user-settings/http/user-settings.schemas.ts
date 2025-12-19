import { z } from 'zod';

export const userSettingsDto = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  activeOpportunitiesGoal: z.number().int().min(1).max(1000),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserSettingsDto = z.infer<typeof userSettingsDto>;

export const updateUserSettingsBody = z.object({
  activeOpportunitiesGoal: z.number().int().min(1).max(1000).optional(),
});

export type UpdateUserSettingsBody = z.infer<typeof updateUserSettingsBody>;




