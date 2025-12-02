import { z } from 'zod';

/**
 * Response DTO for sync status.
 */
export const syncStatusDto = z.object({
  lastLinkedInImportAt: z.string().datetime().nullable(),
  latestMessageTimestampFromExport: z.string().datetime().nullable(),
  latestLinkedInEmailTimestamp: z.string().datetime().nullable(),
});

export type SyncStatusDto = z.infer<typeof syncStatusDto>;

/**
 * Body schema for updating sync status.
 */
export const updateSyncStatusBody = z.object({
  lastLinkedInImportAt: z.string().datetime().nullable().optional(),
  latestMessageTimestampFromExport: z.string().datetime().nullable().optional(),
  latestLinkedInEmailTimestamp: z.string().datetime().nullable().optional(),
});

export type UpdateSyncStatusBody = z.infer<typeof updateSyncStatusBody>;


