import { client } from '@/shared/services/http/client';

export interface ImportProgress {
    status: 'started' | 'progress' | 'completed' | 'error';
    total?: number;
    processed?: number;
    created?: number;
    skipped?: number;
    currentContact?: {
        name: string;
        status: 'processing' | 'created' | 'skipped';
    };
    error?: string;
}

/**
 * Import LinkedIn contacts with progress tracking.
 * Returns an async generator that yields progress updates.
 */
export async function* importLinkedInContacts(): AsyncGenerator<ImportProgress, void, unknown> {
    const response = await fetch('/api/contacts/import-linkedin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to start import' }));
        yield {
            status: 'error',
            error: error.error || 'Failed to start import',
        };
        return;
    }

    if (!response.body) {
        yield {
            status: 'error',
            error: 'No response body',
        };
        return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));
                        yield data as ImportProgress;

                        if (data.status === 'completed' || data.status === 'error') {
                            return;
                        }
                    } catch (e) {
                        // Skip invalid JSON lines
                        console.warn('Failed to parse SSE data:', line);
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}



