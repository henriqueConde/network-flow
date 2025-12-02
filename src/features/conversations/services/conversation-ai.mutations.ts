import { useMutation, useQueryClient } from '@tanstack/react-query';
import { analyzeConversation, type ConversationAnalysisResult } from './conversation-ai.service';
import { conversationsKeys } from './conversations.keys';

export interface AnalyzeConversationMutationVariables {
    conversationId: string;
    onChunk?: (chunk: string) => void;
}

/**
 * Mutation hook for analyzing a conversation with AI (streaming support).
 * Defined in services layer for reusability and separation of concerns.
 *
 * The onChunk callback can be passed as part of the mutation variables
 * to handle streaming chunks as they arrive.
 */
export function useAnalyzeConversationMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ConversationAnalysisResult,
        Error,
        AnalyzeConversationMutationVariables
    >({
        mutationFn: async (variables: AnalyzeConversationMutationVariables): Promise<ConversationAnalysisResult> => {
            const { onChunk, conversationId } = variables;
            return analyzeConversation(conversationId, onChunk);
        },
        // Note: Streaming mutations typically don't need retries
        retry: false,
        onSuccess: (data, variables) => {
            // Invalidate the conversation query to refresh data after analysis
            queryClient.invalidateQueries({
                queryKey: conversationsKeys.detail(variables.conversationId),
            });
        },
    });
}



