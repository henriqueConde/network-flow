import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import { analyzeConversation } from '@/backend/features/conversations';

const analyzeConversationParamsSchema = z.object({
    id: z.string().uuid('Invalid conversation ID'),
});

const analyzeConversationBodySchema = z.object({
    userContext: z.string().optional(),
});

/**
 * POST /api/conversations/[id]/analyze
 * Analyze a conversation and generate AI suggestions (summary, reply, next action).
 * Accepts optional userContext for additional instructions.
 * Returns a streaming text response with JSON containing the analysis.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const user = await getSessionUser();
        if (!user) {
            throw new UnauthorizedError();
        }

        const rawParams = await params;
        const { id } = analyzeConversationParamsSchema.parse(rawParams);

        // Parse request body for user context
        let userContext: string | undefined;
        try {
            const body = await req.json();
            const parsed = analyzeConversationBodySchema.parse(body);
            userContext = parsed.userContext;
        } catch {
            // Body is optional, continue without it
        }

        // Create a streaming response
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();

                try {
                    // Stream the AI analysis (use-case handles conversation access check)
                    for await (const chunk of analyzeConversation({
                        userId: user.id,
                        conversationId: id,
                        userContext,
                    })) {
                        controller.enqueue(encoder.encode(chunk));
                    }
                    controller.close();
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : 'Unknown error occurred';
                    controller.error(new Error(errorMessage));
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        if (error instanceof HttpError) {
            return new Response(
                JSON.stringify({ error: error.message }),
                {
                    status: error.status,
                    headers: { 'Content-Type': 'application/json' },
                },
            );
        }

        const errorMessage =
            error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;
        console.error(
            '[api/conversations/[id]/analyze] Unexpected error:',
            errorMessage,
            errorStack || '',
        );

        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            },
        );
    }
}

