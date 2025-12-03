import { makeUserSettingsRepo } from '../infra/user-settings.repo';
import { userSettingsDto } from '../http/user-settings.schemas';

const userSettingsRepo = makeUserSettingsRepo();

/**
 * Get user settings, creating default settings if they don't exist.
 */
export async function getUserSettings(userId: string) {
  const settings = await userSettingsRepo.getOrCreateSettings(userId);
  
  // Normalize Dates to ISO strings for DTO
  const dto = {
    ...settings,
    createdAt: settings.createdAt.toISOString(),
    updatedAt: settings.updatedAt.toISOString(),
  };
  
  return userSettingsDto.parse(dto);
}

/**
 * Update user settings.
 */
export async function updateUserSettings(
  userId: string,
  data: { activeOpportunitiesGoal?: number },
) {
  const settings = await userSettingsRepo.updateSettings(userId, data);
  
  // Normalize Dates to ISO strings for DTO
  const dto = {
    ...settings,
    createdAt: settings.createdAt.toISOString(),
    updatedAt: settings.updatedAt.toISOString(),
  };
  
  return userSettingsDto.parse(dto);
}

