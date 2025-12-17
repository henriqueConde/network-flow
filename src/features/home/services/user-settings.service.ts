import { client } from '@/shared/services/http/client';
import { z } from 'zod';

/**
 * Response schema matching backend DTO
 */
const userSettingsResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  activeOpportunitiesGoal: z.number().int().min(1).max(1000),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserSettings = z.infer<typeof userSettingsResponseSchema>;

/**
 * Service function for user settings.
 */
export async function getUserSettings(): Promise<UserSettings> {
  const res = await client.get('/api/user-settings');
  return userSettingsResponseSchema.parse(res.data);
}

/**
 * Update user settings.
 */
export async function updateUserSettings(data: { activeOpportunitiesGoal?: number }): Promise<UserSettings> {
  const res = await client.patch('/api/user-settings', data);
  return userSettingsResponseSchema.parse(res.data);
}



