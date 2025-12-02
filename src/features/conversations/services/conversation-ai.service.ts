import { getAuthHeaders } from '@/shared/services/http/client';
import { normalizeHttpError, type HttpError } from '@/shared/services/http/error';

export interface ConversationAnalysisResult {
    summary: string;
    suggestedNextAction: {
        type: string;
        dueAt: string;
        reasoning: string;
    };
    suggestedReply: string;
}

/**
 * Calls the /api/conversations/[id]/analyze endpoint.
 *
 * - Backend expects: conversation ID in URL
 * - Backend responds as a text stream (ReadableStream of chunks)
 *
 * Uses the axios client's auth mechanism (via getAuthHeaders) to ensure
 * consistent authentication with other axios requests. However, the actual
 * HTTP request uses fetch instead of axios because:
 * 1. Axios doesn't support streaming responses in browser environments
 * 2. We need to process the response as a stream chunk-by-chunk
 * 3. Fetch's ReadableStream API is the standard way to handle streaming in browsers
 *
 * The request uses the same auth headers that the axios client would use,
 * ensuring consistency across the application.
 *
 * If `onChunk` is provided, we stream and feed chunks into it.
 * Otherwise we just accumulate everything and return the full text.
 *
 * The response is expected to be JSON text that can be parsed.
 */
export async function analyzeConversation(
    conversationId: string,
    onChunk?: (chunk: string) => void,
): Promise<ConversationAnalysisResult> {
    // Prepare request headers using axios client's auth mechanism
    // This ensures we get the same auth headers as other axios requests
    const headers = await getAuthHeaders();

    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'text/plain';

    // Use fetch for streaming (axios doesn't support streaming in browser)
    // but with the headers prepared by the axios client's auth mechanism
    // Note: This is a Next.js API route (relative path), not the external API
    const res = await fetch(`/api/conversations/${conversationId}/analyze`, {
        method: 'POST',
        headers,
    });

    if (!res.ok) {
        // Normalize error to match axios client error shape
        const errorText = await res.text().catch(() => 'Unknown error');
        let errorData: any;
        try {
            errorData = JSON.parse(errorText);
        } catch {
            errorData = errorText;
        }

        const normalized: HttpError = {
            status: res.status,
            message:
                res.status === 401
                    ? 'Unauthorized: please sign in to use the AI assistant.'
                    : errorData?.error || errorText || `AI Analysis API error: ${res.status}`,
            data: errorData,
        };

        throw normalizeHttpError(normalized);
    }

    // The route always streams text/plain
    const reader = res.body?.getReader();

    if (!reader) {
        // Fallback: no stream for some reason, just get text
        const fallback = await res.text();
        if (onChunk && fallback) onChunk(fallback);

        try {
            return JSON.parse(fallback);
        } catch {
            throw new Error('Failed to parse AI analysis response');
        }
    }

    const decoder = new TextDecoder();
    let full = '';

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            if (!chunk) continue;

            full += chunk;

            if (onChunk) {
                onChunk(chunk);
            }
        }
    } finally {
        reader.releaseLock();
    }

    // Parse the accumulated JSON response
    try {
        // The AI might return JSON wrapped in markdown code blocks or plain JSON
        // Try to extract JSON if it's wrapped
        let jsonText = full.trim();

        // Remove markdown code blocks if present
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        return JSON.parse(jsonText);
    } catch (parseError) {
        // If parsing fails, try to extract JSON from the text
        const jsonMatch = full.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch {
                // Fall through to error
            }
        }

        throw new Error(
            `Failed to parse AI analysis response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
        );
    }
}



