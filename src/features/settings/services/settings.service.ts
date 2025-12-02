import { client } from '@/shared/services/http/client';
import { z } from 'zod';

/**
 * Sync status DTO.
 */
const SyncStatusDto = z.object({
  lastLinkedInImportAt: z.string().datetime().nullable(),
  latestMessageTimestampFromExport: z.string().datetime().nullable(),
  latestLinkedInEmailTimestamp: z.string().datetime().nullable(),
});

export type SyncStatus = {
  lastLinkedInImportAt: Date | null;
  latestMessageTimestampFromExport: Date | null;
  latestLinkedInEmailTimestamp: Date | null;
};

/**
 * Update sync status payload.
 */
const UpdateSyncStatusBody = z.object({
  lastLinkedInImportAt: z.string().datetime().nullable().optional(),
  latestMessageTimestampFromExport: z.string().datetime().nullable().optional(),
  latestLinkedInEmailTimestamp: z.string().datetime().nullable().optional(),
});

export type UpdateSyncStatusPayload = z.infer<typeof UpdateSyncStatusBody>;

/**
 * Fetch sync status.
 */
export async function getSyncStatus(): Promise<SyncStatus> {
  const res = await client.get('/api/settings/sync-status');
  const data = SyncStatusDto.parse(res.data);

  return {
    lastLinkedInImportAt: data.lastLinkedInImportAt ? new Date(data.lastLinkedInImportAt) : null,
    latestMessageTimestampFromExport: data.latestMessageTimestampFromExport
      ? new Date(data.latestMessageTimestampFromExport)
      : null,
    latestLinkedInEmailTimestamp: data.latestLinkedInEmailTimestamp
      ? new Date(data.latestLinkedInEmailTimestamp)
      : null,
  };
}

/**
 * Update sync status.
 */
export async function updateSyncStatus(payload: UpdateSyncStatusPayload): Promise<SyncStatus> {
  const body = UpdateSyncStatusBody.parse(payload);
  const res = await client.patch('/api/settings/sync-status', body);
  const data = SyncStatusDto.parse(res.data);

  return {
    lastLinkedInImportAt: data.lastLinkedInImportAt ? new Date(data.lastLinkedInImportAt) : null,
    latestMessageTimestampFromExport: data.latestMessageTimestampFromExport
      ? new Date(data.latestMessageTimestampFromExport)
      : null,
    latestLinkedInEmailTimestamp: data.latestLinkedInEmailTimestamp
      ? new Date(data.latestLinkedInEmailTimestamp)
      : null,
  };
}

