'use client';

import { Box, Typography, Button, Chip, Link, FormControlLabel, Switch, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import { useRouter } from 'next/navigation';
import type { ConversationDetailHeaderProps } from './conversation-detail-header.types';
import { styles } from './conversation-detail-header.styles';

export function ConversationDetailHeader({
  contactName,
  contactCompany,
  opportunityId,
  opportunityTitle,
  isOutOfSync,
  config,
  onBack,
  autoFollowupsEnabled,
  onToggleAutoFollowups,
}: ConversationDetailHeaderProps) {
  const router = useRouter();

  return (
    <Box sx={styles.headerSection()}>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={styles.backButton()}>
        {config.copy.backButton}
      </Button>

      <Box sx={styles.header()}>
        <Box>
          <Typography variant="h4" sx={styles.title()}>
            {contactName}
          </Typography>
          {contactCompany && (
            <Typography variant="body2" color="text.secondary">
              {contactCompany}
            </Typography>
          )}
          {opportunityId && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Opportunity:
              </Typography>
              <Link
                component="button"
                variant="body2"
                onClick={() => router.push(`/opportunities/${opportunityId}`)}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                {opportunityTitle || 'View Opportunity'}
                <LaunchIcon fontSize="small" />
              </Link>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title={config.copy.autoFollowups.helper}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={autoFollowupsEnabled}
                  onChange={(e) => onToggleAutoFollowups(e.target.checked)}
                />
              }
              label={config.copy.autoFollowups.label}
            />
          </Tooltip>
          {isOutOfSync && <Chip label="Out of sync" color="warning" variant="outlined" />}
        </Box>
      </Box>
    </Box>
  );
}

