import { useState } from 'react';
import type { useAnalyzeConversationMutation } from '../../../services/conversation-ai.mutations';

type AiAnalysisState = {
  summary?: string;
  suggestedReply?: string;
  suggestedNextAction?: string;
  suggestedNextActionDueAt?: string;
} | null;

/**
 * UI state hook for conversation AI analysis.
 * Component-level hook for AI analysis state and handlers (no I/O, uses mutations).
 */
export function useConversationAiAnalysis(
  conversationId: string | undefined,
  analyzeMutation: ReturnType<typeof useAnalyzeConversationMutation>,
) {
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysisState>(null);

  const handleRequestAnalysis = async () => {
    if (!conversationId) return;

    try {
      const result = await analyzeMutation.mutateAsync({
        conversationId,
        onChunk: (chunk) => {
          // Optional: handle streaming chunks if needed
          console.log('AI chunk:', chunk);
        },
      });

      setAiAnalysis({
        summary: result.summary,
        suggestedReply: result.suggestedReply,
        suggestedNextAction: result.suggestedNextAction?.type,
        suggestedNextActionDueAt: result.suggestedNextAction?.dueAt,
      });
    } catch (err) {
      console.error('Failed to analyze conversation:', err);
    }
  };

  const handleRegenerateReply = () => {
    handleRequestAnalysis();
  };

  return {
    aiAnalysis,
    handleRequestAnalysis,
    handleRegenerateReply,
    isLoading: analyzeMutation.isPending,
    error: analyzeMutation.error?.message,
  };
}

