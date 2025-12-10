'use client';

import { Card, Box, Typography, Chip, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { PipelineOpportunity } from '../../services/pipeline.service';
import { styles } from './pipeline-page.styles';
import type { PipelinePageViewProps } from './pipeline-page.types';

type PipelinePageConfig = PipelinePageViewProps['config'];

interface SortableOpportunityCardProps {
  opportunity: PipelineOpportunity;
  config: PipelinePageConfig;
  onOpportunityClick: (id: string) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}

export function SortableOpportunityCard({
  opportunity,
  config,
  onOpportunityClick,
  onMenuOpen,
}: SortableOpportunityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: opportunity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={styles.opportunityCard()}
      onClick={() => onOpportunityClick(opportunity.id)}
      {...attributes}
      {...listeners}
    >
      <Box sx={styles.opportunityHeader()}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={styles.opportunityName()}>
            {opportunity.title || opportunity.contactName}
          </Typography>
          {opportunity.contactCompany && (
            <Typography variant="body2" sx={styles.opportunityCompany()}>
              {opportunity.contactCompany}
            </Typography>
          )}
          {opportunity.title && (
            <Typography variant="caption" sx={styles.opportunityContact()}>
              {opportunity.contactName}
            </Typography>
          )}
        </Box>
        <IconButton
          size="small"
          sx={styles.menuButton()}
          onClick={(e) => {
            e.stopPropagation();
            onMenuOpen(e, opportunity.id);
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      {opportunity.isOutOfSync && (
        <Chip
          label={config.copy.opportunity.outOfSync}
          size="small"
          sx={styles.outOfSyncBadge()}
        />
      )}

      <Box sx={styles.opportunityMeta()}>
        {opportunity.categoryName && (
          <Typography variant="caption" sx={styles.opportunityMetaItem()}>
            {opportunity.categoryName}
          </Typography>
        )}
        {opportunity.challengeName && (
          <Typography variant="caption" sx={styles.opportunityMetaItem()}>
            Challenge: {opportunity.challengeName}
          </Typography>
        )}
        {opportunity.nextActionType && (
          <Typography variant="caption" sx={styles.opportunityMetaItem()}>
            {opportunity.nextActionType}
            {opportunity.nextActionDueAtDate && ` • ${formatDate(opportunity.nextActionDueAtDate)}`}
          </Typography>
        )}
        {opportunity.lastMessageAtDate && (
          <Typography variant="caption" sx={styles.opportunityMetaItem()}>
            Last: {formatDate(opportunity.lastMessageAtDate)}
          </Typography>
        )}

        {opportunity.conversations.length > 0 && (
          <Box sx={styles.opportunityConversations()}>
            <Typography
              variant="caption"
              sx={styles.opportunityConversationsHeader()}
            >
              Conversations ({opportunity.conversations.length})
            </Typography>

            {opportunity.conversations.map((conv) => (
              <Box key={conv.id} sx={styles.opportunityConversationItem()}>
                <Typography
                  variant="caption"
                  sx={styles.opportunityConversationTitle()}
                >
                  {conv.contactName}
                  {conv.contactCompany ? ` • ${conv.contactCompany}` : ''}
                </Typography>
                <Typography
                  variant="caption"
                  sx={styles.opportunityConversationMeta()}
                >
                  {conv.stageName && `${conv.stageName} • `}
                  {conv.channel}
                  {conv.lastMessageAt && ` • ${formatDate(new Date(conv.lastMessageAt))}`}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
}

