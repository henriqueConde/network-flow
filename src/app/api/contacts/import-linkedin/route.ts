import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { importLinkedInContacts } from '@/backend/features/contacts';

/**
 * POST /api/contacts/import-linkedin
 * Import contacts from LinkedIn.
 * Returns a streaming response with progress updates.
 */
export async function POST(req: NextRequest) {
    try {
        const user = await getSessionUser();
        if (!user) {
            throw new UnauthorizedError();
        }

        // Create a ReadableStream for Server-Sent Events
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();

                try {
                    // Send initial progress
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ status: 'started', total: 0, processed: 0, created: 0, skipped: 0 })}\n\n`)
                    );

                    // Process imports and stream progress
                    for await (const progress of importLinkedInContacts(user.id)) {
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({ status: 'progress', ...progress })}\n\n`)
                        );
                    }

                    // Send completion
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ status: 'completed' })}\n\n`)
                    );
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ status: 'error', error: errorMessage })}\n\n`)
                    );
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }

        const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;
        console.error('[api/contacts/import-linkedin] Unexpected error:', errorMessage, errorStack || '');

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}


