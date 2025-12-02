'use client';

import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { AiAssistantCardProps } from './ai-assistant-card.types';
import { styles } from './ai-assistant-card.styles';

export function AiAssistantCard({
  aiAnalysis,
  hasExistingSummary,
  config,
  onRequestAnalysis,
  onRegenerateReply,
}: AiAssistantCardProps) {
  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AutoAwesomeIcon color="primary" />
          <Typography variant="h6" sx={styles.cardTitle()}>
            {config.copy.aiAssistant.title}
          </Typography>
        </Box>

        {aiAnalysis?.isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : aiAnalysis?.error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {aiAnalysis.error}
          </Alert>
        ) : (
          <>
            {aiAnalysis?.suggestedReply && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  {config.copy.aiAssistant.suggestedReply.title}
                </Typography>
                <Box sx={styles.suggestedReplyBox()}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {aiAnalysis.suggestedReply}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => {
                      navigator.clipboard.writeText(aiAnalysis.suggestedReply || '');
                    }}
                  >
                    {config.copy.aiAssistant.suggestedReply.copy}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={onRegenerateReply}
                    disabled={aiAnalysis.isLoading}
                  >
                    {config.copy.aiAssistant.suggestedReply.regenerate}
                  </Button>
                </Stack>
              </Box>
            )}

            {aiAnalysis?.suggestedNextAction && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  {config.copy.aiAssistant.suggestedNextAction.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {aiAnalysis.suggestedNextAction}
                  {aiAnalysis.suggestedNextActionDueAt && (
                    <> • Due: {aiAnalysis.suggestedNextActionDueAt}</>
                  )}
                </Typography>
              </Box>
            )}

            {aiAnalysis?.summary && !hasExistingSummary && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  {config.copy.aiAssistant.summary.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {aiAnalysis.summary}
                </Typography>
              </Box>
            )}
          </>
        )}

        <Button
          variant="contained"
          fullWidth
          startIcon={aiAnalysis?.isLoading ? <CircularProgress size={16} /> : <AutoAwesomeIcon />}
          onClick={onRequestAnalysis}
          disabled={aiAnalysis?.isLoading}
        >
          {aiAnalysis?.suggestedReply
            ? config.copy.aiAssistant.button.reanalyze
            : config.copy.aiAssistant.button.getSuggestions}
        </Button>
      </CardContent>
    </Card>
  );
}

