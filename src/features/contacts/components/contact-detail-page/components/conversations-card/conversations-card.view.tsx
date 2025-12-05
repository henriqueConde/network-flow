'use client';

import { Box, Typography, Button } from '@mui/material';
import type { ConversationsCardProps } from './conversations-card.types';
import { styles } from './conversations-card.styles';

export function ConversationsCard({
  conversations,
  config,
  onGoToConversation,
  onStartConversation,
}: ConversationsCardProps) {
  return (
    <Box sx={styles.card()}>
      <Typography variant="h6" sx={styles.cardTitle()}>
        {config.copy.sections.conversations}
      </Typography>
      {conversations.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2 }}>
          <Typography sx={styles.emptyValue()}>{config.copy.empty.noConversations}</Typography>
          <Button variant="contained" onClick={onStartConversation}>
            {config.copy.conversations.startConversation}
          </Button>
        </Box>
      ) : (
        <Box sx={styles.conversationsList()}>
          {conversations.map((conv) => (
            <Box key={conv.id}>
              <Box sx={styles.conversationItem()}>
                <Typography variant="body2" fontWeight={500}>
                  {conv.channel}
                </Typography>
                {conv.lastMessageSnippet && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {conv.lastMessageSnippet}
                  </Typography>
                )}
                {conv.lastMessageAtDate && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {conv.lastMessageAtDate.toLocaleDateString()}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
                <Button variant="outlined" size="small" onClick={() => onGoToConversation(conv.id)}>
                  {config.copy.conversations.goToConversation}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

