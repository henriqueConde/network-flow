'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  Button,
  Chip,
  TextField,
  MenuItem,
  List,
  ListItem,
} from '@mui/material';
import type { SettingsPageViewProps } from './settings-page.types';
import { styles } from './settings-page.styles';

export function SettingsPageView({
  syncStatus,
  isLoading,
  error,
  config,
}: SettingsPageViewProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <Box sx={styles.container()}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.container()}>
      <Box sx={styles.header()}>
        <Typography variant="h4" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Typography variant="body2" sx={styles.subtitle()}>
          {config.copy.subtitle}
        </Typography>
      </Box>

      <Box sx={styles.scrollableContent()}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {/* Data Sources Section */}
        <Box sx={styles.section()}>
          <Card sx={styles.sectionCard()}>
            <Typography variant="h6" sx={styles.sectionTitle()}>
              {config.copy.sections.dataSources.title}
            </Typography>
            <Typography variant="body2" sx={styles.sectionDescription()}>
              {config.copy.sections.dataSources.description}
            </Typography>

            {/* Gmail Integration */}
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
                {config.copy.sections.dataSources.gmail.title}
              </Typography>
              <Typography variant="body2" sx={styles.subsectionDescription()}>
                {config.copy.sections.dataSources.gmail.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={config.copy.sections.dataSources.gmail.statusDisconnected}
                  color="default"
                  size="small"
                  sx={styles.statusChip()}
                />
                <Button variant="outlined" size="small" disabled>
                  {config.copy.sections.dataSources.gmail.connectButton}
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: 1 }}>
                Gmail integration coming soon
              </Typography>
            </Box>

            {/* Manual Paste */}
            <Box sx={styles.subsection()}>
              <Typography variant="subtitle1" sx={styles.subsectionTitle()}>
                {config.copy.sections.dataSources.manualPaste.title}
              </Typography>
              <Typography variant="body2" sx={styles.subsectionDescription()}>
                {config.copy.sections.dataSources.manualPaste.description}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 500 }}>
                {config.copy.sections.dataSources.manualPaste.instructions}:
              </Typography>
              <List sx={styles.instructionsList()}>
                {config.copy.sections.dataSources.manualPaste.instructionsSteps.map((step, index) => (
                  <ListItem key={index} sx={{ display: 'list-item', padding: 0 }}>
                    {step}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Card>
        </Box>

        {/* AI Behavior Section */}
        <Box sx={styles.section()}>
          <Card sx={styles.sectionCard()}>
            <Typography variant="h6" sx={styles.sectionTitle()}>
              {config.copy.sections.ai.title}
            </Typography>
            <Typography variant="body2" sx={styles.sectionDescription()}>
              {config.copy.sections.ai.description}
            </Typography>

            <TextField
              select
              label={config.copy.sections.ai.tone.label}
              defaultValue="friendly"
              fullWidth
              sx={styles.formField()}
              disabled
            >
              <MenuItem value="friendly">{config.copy.sections.ai.tone.options.friendly}</MenuItem>
              <MenuItem value="professional">{config.copy.sections.ai.tone.options.professional}</MenuItem>
              <MenuItem value="concise">{config.copy.sections.ai.tone.options.concise}</MenuItem>
            </TextField>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: -1, marginBottom: 2 }}>
              {config.copy.sections.ai.tone.description}
            </Typography>

            <TextField
              label={config.copy.sections.ai.language.label}
              defaultValue="English"
              fullWidth
              sx={styles.formField()}
              disabled
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: -1, marginBottom: 2 }}>
              {config.copy.sections.ai.language.description}
            </Typography>

            <TextField
              label={config.copy.sections.ai.maxLength.label}
              type="number"
              defaultValue={500}
              fullWidth
              sx={styles.formField()}
              disabled
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: -1 }}>
              {config.copy.sections.ai.maxLength.description}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: 2 }}>
              AI settings coming soon
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

