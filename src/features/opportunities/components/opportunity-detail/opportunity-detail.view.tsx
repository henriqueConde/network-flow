'use client';

import { Box, Typography, Button, Card, CardContent, CircularProgress, Alert, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { OpportunityDetail } from '../../services/opportunities.service';
import { useMemo } from 'react';

type OpportunityDetailViewProps = {
  opportunity: OpportunityDetail | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
  onConversationClick: (conversationId: string) => void;
  onInterviewClick: (conversationId: string) => void;
};

export function OpportunityDetailView({
  opportunity,
  isLoading,
  error,
  onBack,
  onConversationClick,
  onInterviewClick,
}: OpportunityDetailViewProps) {
  // Separate conversations into interviews and all conversations
  // Interviews should appear in BOTH sections (as interviews AND as conversations)
  const { interviews, allConversations } = useMemo(() => {
    if (!opportunity) return { interviews: [], allConversations: [] };
    
    const interviewsList = opportunity.conversations.filter(
      (conv) => conv.stageName === 'Interviewing'
    );
    
    return {
      interviews: interviewsList,
      allConversations: opportunity.conversations, // All conversations, including interviews
    };
  }, [opportunity]);
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !opportunity) {
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ marginBottom: 2 }}
        >
          Back
        </Button>
        <Alert severity={!opportunity ? 'info' : 'error'}>
          {!opportunity ? 'Opportunity not found' : error}
        </Alert>
      </Box>
    );
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ marginBottom: 2 }}
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        {opportunity.title || opportunity.contactName}
      </Typography>

      {opportunity.contactCompany && (
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {opportunity.contactCompany}
        </Typography>
      )}

      {/* Interviews Section */}
      {interviews.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Interviews ({interviews.length})
          </Typography>
          {interviews.map((interview) => (
            <Card key={interview.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                      <Typography variant="h6">{interview.channel}</Typography>
                      <Chip label="Interview" color="primary" size="small" />
                    </Box>
                    {interview.lastMessageAt && (
                      <Typography variant="body2" color="text.secondary">
                        Last message: {formatDate(interview.lastMessageAt)}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {interview.messages.length} message{interview.messages.length !== 1 ? 's' : ''}
                    </Typography>
                    {interview.lastMessageSnippet && (
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                        &quot;{interview.lastMessageSnippet.slice(0, 100)}{interview.lastMessageSnippet.length > 100 ? '...' : ''}&quot;
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => onInterviewClick(interview.id)}
                    sx={{ ml: 2 }}
                  >
                    View Interview
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Conversations Section */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          Conversations ({allConversations.length})
        </Typography>

        {allConversations.length === 0 ? (
          <Typography color="text.secondary">
            No conversations yet. Create one to get started.
          </Typography>
        ) : (
          allConversations.map((conv) => {
            const isInterview = conv.stageName === 'Interviewing';
            return (
              <Card key={conv.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                        <Typography variant="h6">{conv.channel}</Typography>
                        {isInterview && (
                          <Chip label="Interview" color="primary" size="small" />
                        )}
                        {conv.stageName && !isInterview && (
                          <Chip label={conv.stageName} size="small" />
                        )}
                      </Box>
                      {conv.lastMessageAt && (
                        <Typography variant="body2" color="text.secondary">
                          Last message: {formatDate(conv.lastMessageAt)}
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {conv.messages.length} message{conv.messages.length !== 1 ? 's' : ''}
                      </Typography>
                      {conv.lastMessageSnippet && (
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                          &quot;{conv.lastMessageSnippet.slice(0, 100)}{conv.lastMessageSnippet.length > 100 ? '...' : ''}&quot;
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => onConversationClick(conv.id)}
                      sx={{ ml: 2 }}
                    >
                      View Conversation
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
}

