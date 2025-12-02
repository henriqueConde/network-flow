import { useState } from 'react';
import type { ConversationsInboxFilterStatus } from '../conversations-inbox.types';
import { useListQueryControls } from '@/shared/hooks';

/**
 * UI state hook for Conversations Inbox filters, pagination, and sorting.
 * Component-level; no data fetching or I/O.
 */
export function useConversationsFilters() {
    const [status, setStatus] = useState<ConversationsInboxFilterStatus>('all');

    const {
        search,
        page,
        pageSize,
        sortBy,
        sortDir,
        setSearch,
        setPage,
        setSort,
    } = useListQueryControls<'updatedAt' | 'lastMessageAt' | 'priority'>({
        initialSearch: '',
        initialPage: 1,
        initialPageSize: 20,
        initialSortBy: 'updatedAt',
        initialSortDir: 'desc',
    });

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    const handleStatusChange = (value: ConversationsInboxFilterStatus) => {
        setStatus(value);
        setPage(1);
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
    };

    const handleSortChange = (
        nextSortBy: 'updatedAt' | 'lastMessageAt' | 'priority',
        nextSortDir: 'asc' | 'desc',
    ) => {
        setSort(nextSortBy, nextSortDir);
    };

    return {
        search,
        status,
        page,
        pageSize,
        sortBy,
        sortDir,
        handleSearchChange,
        handleStatusChange,
        handlePageChange,
        handleSortChange,
    };
}


