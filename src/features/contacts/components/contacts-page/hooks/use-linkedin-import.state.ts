import { useState, useCallback } from 'react';
import { importLinkedInContacts } from '../../../services/linkedin-import.service';
import { useQueryClient } from '@tanstack/react-query';
import { contactsKeys } from '../../../services/contacts.keys';

export interface ImportProgress {
    total: number;
    processed: number;
    created: number;
    skipped: number;
    currentContact?: {
        name: string;
        status: 'processing' | 'created' | 'skipped';
    };
}

export function useLinkedInImport() {
    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState<ImportProgress | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isImporting, setIsImporting] = useState(false);
    const queryClient = useQueryClient();

    const startImport = useCallback(async () => {
        setIsOpen(true);
        setIsImporting(true);
        setProgress(null);
        setError(null);

        try {
            for await (const update of importLinkedInContacts()) {
                if (update.status === 'error') {
                    setError(update.error || 'Import failed');
                    setIsImporting(false);
                    break;
                }

                if (update.status === 'progress') {
                    setProgress({
                        total: update.total || 0,
                        processed: update.processed || 0,
                        created: update.created || 0,
                        skipped: update.skipped || 0,
                        currentContact: update.currentContact,
                    });
                }

                if (update.status === 'completed') {
                    setIsImporting(false);
                    // Invalidate contacts list to refresh
                    queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
                }
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            setIsImporting(false);
        }
    }, [queryClient]);

    const close = useCallback(() => {
        setIsOpen(false);
        // Reset state after a delay to allow dialog close animation
        setTimeout(() => {
            setProgress(null);
            setError(null);
            setIsImporting(false);
        }, 300);
    }, []);

    return {
        isOpen,
        progress,
        error,
        isImporting,
        startImport,
        close,
    };
}

