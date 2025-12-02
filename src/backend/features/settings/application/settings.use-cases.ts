import { makeSettingsRepo } from '../infra/settings.repo';
import { syncStatusDto, type UpdateSyncStatusBody } from '../http/settings.schemas';

/**
 * Use case: get sync status for the Settings page.
 */
export async function getSyncStatus(userId: string) {
  const repo = makeSettingsRepo();
  const syncStatus = await repo.getSyncStatus(userId);

  return syncStatusDto.parse({
    lastLinkedInImportAt: syncStatus.lastLinkedInImportAt?.toISOString() || null,
    latestMessageTimestampFromExport: syncStatus.latestMessageTimestampFromExport?.toISOString() || null,
    latestLinkedInEmailTimestamp: syncStatus.latestLinkedInEmailTimestamp?.toISOString() || null,
  });
}

/**
 * Use case: update sync status.
 * Expects already-validated body payload from the HTTP layer.
 */
export async function updateSyncStatus(input: {
  userId: string;
  body: UpdateSyncStatusBody;
}) {
  const repo = makeSettingsRepo();

  const updates: {
    lastLinkedInImportAt?: Date | null;
    latestMessageTimestampFromExport?: Date | null;
    latestLinkedInEmailTimestamp?: Date | null;
  } = {};

  if (input.body.lastLinkedInImportAt !== undefined) {
    updates.lastLinkedInImportAt = input.body.lastLinkedInImportAt
      ? new Date(input.body.lastLinkedInImportAt)
      : null;
  }
  if (input.body.latestMessageTimestampFromExport !== undefined) {
    updates.latestMessageTimestampFromExport = input.body.latestMessageTimestampFromExport
      ? new Date(input.body.latestMessageTimestampFromExport)
      : null;
  }
  if (input.body.latestLinkedInEmailTimestamp !== undefined) {
    updates.latestLinkedInEmailTimestamp = input.body.latestLinkedInEmailTimestamp
      ? new Date(input.body.latestLinkedInEmailTimestamp)
      : null;
  }

  const updated = await repo.updateSyncStatus(input.userId, updates);

  return syncStatusDto.parse({
    lastLinkedInImportAt: updated.lastLinkedInImportAt?.toISOString() || null,
    latestMessageTimestampFromExport: updated.latestMessageTimestampFromExport?.toISOString() || null,
    latestLinkedInEmailTimestamp: updated.latestLinkedInEmailTimestamp?.toISOString() || null,
  });
}

