import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { ConversationDetailDto } from '../http/conversations.schemas';
import { env } from '@/backend/core/config/env';

/**
 * Creates the system message for the conversation analysis agent.
 * This provides context about the conversation, contact, category, and stage.
 */
function createSystemMessage(conversation: ConversationDetailDto): string {
    const categoryInfo = conversation.categoryName
        ? `Category: ${conversation.categoryName}`
        : 'Category: Not set';

    const stageInfo = conversation.stageName
        ? `Stage: ${conversation.stageName}`
        : 'Stage: Not set';

    const nextActionInfo = conversation.nextActionType
        ? `Current Next Action: ${conversation.nextActionType}${conversation.nextActionDueAt ? ` (due: ${new Date(conversation.nextActionDueAt).toLocaleDateString()})` : ''}`
        : 'Current Next Action: None';

    const notesInfo = conversation.notes
        ? `Notes: ${conversation.notes}`
        : 'Notes: None';

    return `You are an AI assistant helping with networking and job hunting conversations.

You are analyzing a conversation with the following context:

Contact: ${conversation.contactName}${conversation.contactCompany ? ` (${conversation.contactCompany})` : ''}
Channel: ${conversation.channel}
${categoryInfo}
${stageInfo}
Priority: ${conversation.priority}
${nextActionInfo}
${notesInfo}

Your task is to:
1. Analyze the conversation messages to understand the context and tone
2. Generate a concise summary of what's happening
3. Suggest an appropriate next action based on the category, stage, and conversation flow
4. Craft a professional reply that matches the tone and context

Guidelines:
- Consider the category and stage when making suggestions (e.g., "Recently funded startup" at "First touch" stage needs different approach than "Recruiter" at "Interviewing" stage)
- Match the tone of the conversation (formal vs casual)
- Be concise but warm and professional
- If this is a follow-up, acknowledge previous messages
- If this is initial outreach, be clear about your intent
- Align suggestions with the suggested next action

Keep responses clear, actionable, and appropriate for networking/job-hunting context.`;
}

/**
 * Formats conversation messages for the prompt.
 */
function formatMessages(conversation: ConversationDetailDto): string {
    if (conversation.messages.length === 0) {
        return 'No messages in this conversation yet.';
    }

    return conversation.messages
        .map((msg) => {
            const sender = msg.sender === 'user' ? 'You' : conversation.contactName;
            const timestamp = msg.sentAt
                ? new Date(msg.sentAt).toLocaleString()
                : '';
            return `[${timestamp}] ${sender}: ${msg.body}`;
        })
        .join('\n\n');
}

/**
 * Streams AI analysis of a conversation.
 * Generates: summary, suggested reply, and next action suggestions.
 * 
 * @param conversation - The conversation detail with messages and context
 * @returns Async generator that yields text chunks
 */
export async function* analyzeConversation(
    conversation: ConversationDetailDto,
): AsyncGenerator<string, void, unknown> {
    if (!conversation || !conversation.messages || conversation.messages.length === 0) {
        throw new Error('Conversation with messages is required');
    }

    if (!env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured');
    }

    // Set API key for the AI SDK
    process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

    const systemMessage = createSystemMessage(conversation);
    const messagesText = formatMessages(conversation);

    const prompt = `Analyze this conversation and provide:

1. **Summary**: A concise 2-3 sentence summary of what's happening in this conversation, the tone, and current status.

2. **Suggested Next Action**: What should be the next action? (e.g., "Follow up", "Send CV", "Schedule call", "Thank them", "Wait for response"). Also suggest when this action should be due (e.g., "in 2 days", "by end of week", "within 24 hours").

3. **Suggested Reply**: Craft a professional reply that:
   - Matches the tone of the conversation
   - Is appropriate for the category and stage
   - Is concise but warm
   - Acknowledges previous messages if this is a follow-up
   - Is clear about intent if this is initial outreach

Format your response as JSON:
{
  "summary": "Your summary here",
  "suggestedNextAction": {
    "type": "Action type",
    "dueAt": "Suggested due date/time (ISO string or relative like 'in 2 days')",
    "reasoning": "Brief explanation"
  },
  "suggestedReply": "Your suggested reply text here"
}

Conversation messages:
${messagesText}`;

    const { textStream } = streamText({
        model: openai('gpt-4o-mini'),
        system: systemMessage,
        prompt,
        temperature: 0.7,
    });

    for await (const chunk of textStream) {
        yield chunk;
    }
}

