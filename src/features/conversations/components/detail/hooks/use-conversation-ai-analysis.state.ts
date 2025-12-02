import { useState } from 'react';
import type { useAnalyzeConversationMutation } from '../../../services/conversation-ai.mutations';
import type { ChatMessage } from '../components/ai-assistant-card/ai-assistant-card.types';

/**
 * UI state hook for conversation AI analysis with chat interface.
 * Component-level hook for AI analysis state and handlers (no I/O, uses mutations).
 */
export function useConversationAiAnalysis(
  conversationId: string | undefined,
  analyzeMutation: ReturnType<typeof useAnalyzeConversationMutation>,
) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const clearMessages = () => {
    setMessages([]);
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!conversationId) return;

    // Add user message to chat
    const userChatMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userChatMessage]);

    try {
      const result = await analyzeMutation.mutateAsync({
        conversationId,
        userContext: userMessage,
        onChunk: (chunk) => {
          // Optional: handle streaming chunks if needed
          console.log('AI chunk:', chunk);
        },
      });

      // Add assistant response to chat
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result.summary || 'I\'ve analyzed the conversation and prepared suggestions.',
        timestamp: new Date(),
        metadata: {
          summary: result.summary,
          suggestedReply: result.suggestedReply,
          suggestedNextAction: result.suggestedNextAction?.type,
          suggestedNextActionDueAt: result.suggestedNextAction?.dueAt,
        },
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Failed to analyze conversation:', err);
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return {
    messages,
    handleSendMessage,
    clearMessages,
    isLoading: analyzeMutation.isPending,
    error: analyzeMutation.error?.message,
  };
}

