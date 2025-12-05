import { client } from '@/shared/services/http/client';
import { z } from 'zod';

const ScheduledFollowupDto = z.object({
  conversationId: z.string().uuid(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  opportunityId: z.string().uuid().nullable(),
  opportunityTitle: z.string().nullable(),
  channel: z.string(),
  lastMessageAt: z.string().datetime(),
  followupNumber: z.number().int().min(0).max(2),
  dueDate: z.string().datetime(),
});

const ScheduledFollowupsListDto = z.array(
  z.object({
    date: z.string(), // YYYY-MM-DD
    followups: z.array(ScheduledFollowupDto),
  }),
);

export type ScheduledFollowup = z.infer<typeof ScheduledFollowupDto> & {
  lastMessageAtDate: Date;
  dueDateDate: Date;
};

export type ScheduledFollowupsByDate = {
  date: string;
  followups: ScheduledFollowup[];
};

/**
 * Fetch scheduled follow-ups grouped by date.
 */
export async function listScheduledFollowups(): Promise<ScheduledFollowupsByDate[]> {
  const res = await client.get('/api/followups');
  const data = ScheduledFollowupsListDto.parse(res.data);

  return data.map((group) => ({
    date: group.date,
    followups: group.followups.map((f) => ({
      ...f,
      lastMessageAtDate: new Date(f.lastMessageAt),
      dueDateDate: new Date(f.dueDate),
    })),
  }));
}

