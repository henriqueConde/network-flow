'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Autocomplete,
  Chip,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatEnumToTitleCase } from '@/shared/utils/string.utils';
import type { ProofOfWorkEditCardProps } from './proof-of-work-edit-card.types';
import { styles } from './proof-of-work-edit-card.styles';

export function ProofOfWorkEditCard({
  opportunity,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  availableCategories,
  availableStages,
  strategies,
  onChangeEditField,
  onSave,
  onCancel,
}: ProofOfWorkEditCardProps) {

  // Format date for input[type="datetime-local"]
  const formatDateForInput = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  const handleDateChange = (field: string, value: string) => {
    if (!value) {
      onChangeEditField(field as any, null);
      return;
    }
    try {
      const date = new Date(value);
      onChangeEditField(field as any, date.toISOString());
    } catch {
      onChangeEditField(field as any, null);
    }
  };

  const handleAddIssue = () => {
    const currentIssues = Array.isArray(editValues.issuesFound) ? editValues.issuesFound : [];
    onChangeEditField('issuesFound', [...currentIssues, { issue: '', notes: '', screenshot: null }]);
  };

  const handleRemoveIssue = (index: number) => {
    const currentIssues = Array.isArray(editValues.issuesFound) ? editValues.issuesFound : [];
    const newIssues = [...currentIssues];
    newIssues.splice(index, 1);
    onChangeEditField('issuesFound', newIssues.length > 0 ? newIssues : null);
  };

  const handleIssueChange = (index: number, field: 'issue' | 'notes' | 'screenshot', value: string | null) => {
    const currentIssues = Array.isArray(editValues.issuesFound) ? editValues.issuesFound : [];
    const newIssues = [...currentIssues];
    if (!newIssues[index]) {
      newIssues[index] = { issue: '', notes: '', screenshot: null };
    }
    newIssues[index] = { ...newIssues[index], [field]: value };
    onChangeEditField('issuesFound', newIssues);
  };

  const handleAddTeamResponse = () => {
    const currentResponses = Array.isArray(editValues.teamResponses) ? editValues.teamResponses : [];
    onChangeEditField('teamResponses', [...currentResponses, { name: '', response: '', date: new Date().toISOString() }]);
  };

  const handleRemoveTeamResponse = (index: number) => {
    const currentResponses = Array.isArray(editValues.teamResponses) ? editValues.teamResponses : [];
    const newResponses = [...currentResponses];
    newResponses.splice(index, 1);
    onChangeEditField('teamResponses', newResponses.length > 0 ? newResponses : null);
  };

  const handleTeamResponseChange = (index: number, field: 'name' | 'response' | 'date', value: string) => {
    const currentResponses = Array.isArray(editValues.teamResponses) ? editValues.teamResponses : [];
    const newResponses = [...currentResponses];
    if (!newResponses[index]) {
      newResponses[index] = { name: '', response: '', date: new Date().toISOString() };
    }
    newResponses[index] = { ...newResponses[index], [field]: value };
    onChangeEditField('teamResponses', newResponses);
  };

  const handleAddSharedChannel = () => {
    const currentChannels = editValues.sharedChannels || [];
    onChangeEditField('sharedChannels', [...currentChannels, '']);
  };

  const handleRemoveSharedChannel = (index: number) => {
    const currentChannels = editValues.sharedChannels || [];
    const newChannels = [...currentChannels];
    newChannels.splice(index, 1);
    onChangeEditField('sharedChannels', newChannels);
  };

  const handleSharedChannelChange = (index: number, value: string) => {
    const currentChannels = editValues.sharedChannels || [];
    const newChannels = [...currentChannels];
    newChannels[index] = value;
    onChangeEditField('sharedChannels', newChannels);
  };

  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h6">
            Proof-of-Work Tracking
          </Typography>
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Strategies</Typography>
          {isEditing ? (
            <Autocomplete
              multiple
              options={strategies}
              getOptionLabel={(option) => option.title}
              value={strategies.filter((s) => editValues.strategyIds?.includes(s.id)) || []}
              onChange={(_, newValue) => {
                onChangeEditField('strategyIds', newValue.map((s) => s.id));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Select strategies..."
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    label={option.title}
                    size="small"
                  />
                ))
              }
              disabled={isSaving}
            />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {opportunity.strategyIds.length === 0 ? (
                <Typography sx={styles.emptyValue()}>—</Typography>
              ) : (
                opportunity.strategyIds.map((strategyId) => {
                  const strategy = strategies.find((s) => s.id === strategyId);
                  return strategy ? (
                    <Chip key={strategyId} label={strategy.title} size="small" />
                  ) : null;
                })
              )}
            </Box>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Proof-of-Work Type</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              select
              size="small"
              value={editValues.proofOfWorkType || ''}
              onChange={(e) =>
                onChangeEditField(
                  'proofOfWorkType',
                  (e.target.value as 'proof_of_work_bugs' | 'proof_of_work_build' | 'other') || null,
                )
              }
              error={!!editErrors.proofOfWorkType}
              helperText={editErrors.proofOfWorkType}
              disabled={isSaving}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="proof_of_work_bugs">Proof of Work - Bugs</MenuItem>
              <MenuItem value="proof_of_work_build">Proof of Work - Build</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          ) : (
            <Typography sx={styles.fieldValue()}>
              {opportunity.proofOfWorkType ? (
                <Chip
                  label={formatEnumToTitleCase(opportunity.proofOfWorkType)}
                  size="small"
                />
              ) : (
                <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>
              )}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Project Details</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              size="small"
              value={editValues.projectDetails || ''}
              onChange={(e) => onChangeEditField('projectDetails', e.target.value || null)}
              error={!!editErrors.projectDetails}
              helperText={editErrors.projectDetails}
              disabled={isSaving}
              placeholder="Describe the project..."
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {opportunity.projectDetails || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Loom Video URL</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              value={editValues.loomVideoUrl || ''}
              onChange={(e) => onChangeEditField('loomVideoUrl', e.target.value || null)}
              error={!!editErrors.loomVideoUrl}
              helperText={editErrors.loomVideoUrl}
              disabled={isSaving}
              placeholder="https://..."
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {opportunity.loomVideoUrl || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>GitHub Repository URL</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              value={editValues.githubRepoUrl || ''}
              onChange={(e) => onChangeEditField('githubRepoUrl', e.target.value || null)}
              error={!!editErrors.githubRepoUrl}
              helperText={editErrors.githubRepoUrl}
              disabled={isSaving}
              placeholder="https://..."
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {opportunity.githubRepoUrl || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Live Demo URL</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              value={editValues.liveDemoUrl || ''}
              onChange={(e) => onChangeEditField('liveDemoUrl', e.target.value || null)}
              error={!!editErrors.liveDemoUrl}
              helperText={editErrors.liveDemoUrl}
              disabled={isSaving}
              placeholder="https://..."
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {opportunity.liveDemoUrl || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Issues Found</Typography>
          {isEditing ? (
            <Box>
              {Array.isArray(editValues.issuesFound) && editValues.issuesFound.map((issue: any, index: number) => (
                <Card key={index} variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 1 }}>
                    <Typography variant="subtitle2">Issue {index + 1}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveIssue(index)}
                      disabled={isSaving}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="Issue"
                    value={issue.issue || ''}
                    onChange={(e) => handleIssueChange(index, 'issue', e.target.value)}
                    disabled={isSaving}
                    sx={{ marginBottom: 1 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    size="small"
                    label="Notes"
                    value={issue.notes || ''}
                    onChange={(e) => handleIssueChange(index, 'notes', e.target.value)}
                    disabled={isSaving}
                    sx={{ marginBottom: 1 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Screenshot URL"
                    value={issue.screenshot || ''}
                    onChange={(e) => handleIssueChange(index, 'screenshot', e.target.value || null)}
                    disabled={isSaving}
                    placeholder="https://..."
                  />
                </Card>
              ))}
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddIssue}
                disabled={isSaving}
              >
                Add Issue
              </Button>
            </Box>
          ) : (
            <Box>
              {opportunity.issuesFound && Array.isArray(opportunity.issuesFound) && opportunity.issuesFound.length > 0 ? (
                opportunity.issuesFound.map((issue: any, index: number) => (
                  <Card key={index} variant="outlined" sx={{ padding: 1, marginBottom: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {issue.issue || 'Issue'}
                    </Typography>
                    {issue.notes && (
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                        {issue.notes}
                      </Typography>
                    )}
                    {issue.screenshot && (
                      <Box sx={{ marginTop: 1 }}>
                        <Image
                          src={issue.screenshot}
                          alt="Screenshot"
                          width={800}
                          height={600}
                          style={{ maxWidth: '100%', height: 'auto', borderRadius: 4 }}
                        />
                      </Box>
                    )}
                  </Card>
                ))
              ) : (
                <Typography sx={styles.emptyValue()}>—</Typography>
              )}
            </Box>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Shared Channels</Typography>
          {isEditing ? (
            <Box>
              {(editValues.sharedChannels || []).map((channel, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={channel}
                    onChange={(e) => handleSharedChannelChange(index, e.target.value)}
                    disabled={isSaving}
                    placeholder="e.g., slack, linkedin, discord"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveSharedChannel(index)}
                    disabled={isSaving}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddSharedChannel}
                disabled={isSaving}
              >
                Add Channel
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {opportunity.sharedChannels && opportunity.sharedChannels.length > 0 ? (
                opportunity.sharedChannels.map((channel) => (
                  <Chip key={channel} label={channel} size="small" />
                ))
              ) : (
                <Typography sx={styles.emptyValue()}>—</Typography>
              )}
            </Box>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Team Responses</Typography>
          {isEditing ? (
            <Box>
              {Array.isArray(editValues.teamResponses) && editValues.teamResponses.map((response: any, index: number) => (
                <Card key={index} variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 1 }}>
                    <Typography variant="subtitle2">Response {index + 1}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveTeamResponse(index)}
                      disabled={isSaving}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name"
                    value={response.name || ''}
                    onChange={(e) => handleTeamResponseChange(index, 'name', e.target.value)}
                    disabled={isSaving}
                    sx={{ marginBottom: 1 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    size="small"
                    label="Response"
                    value={response.response || ''}
                    onChange={(e) => handleTeamResponseChange(index, 'response', e.target.value)}
                    disabled={isSaving}
                    sx={{ marginBottom: 1 }}
                  />
                  <TextField
                    fullWidth
                    type="datetime-local"
                    size="small"
                    label="Date"
                    value={formatDateForInput(response.date)}
                    onChange={(e) => handleTeamResponseChange(index, 'date', e.target.value ? new Date(e.target.value).toISOString() : new Date().toISOString())}
                    disabled={isSaving}
                    InputLabelProps={{ shrink: true }}
                  />
                </Card>
              ))}
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddTeamResponse}
                disabled={isSaving}
              >
                Add Team Response
              </Button>
            </Box>
          ) : (
            <Box>
              {opportunity.teamResponses && Array.isArray(opportunity.teamResponses) && opportunity.teamResponses.length > 0 ? (
                opportunity.teamResponses.map((response: any, index: number) => (
                  <Card key={index} variant="outlined" sx={{ padding: 1, marginBottom: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {response.name || 'Team Member'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                      {response.response}
                    </Typography>
                    {response.date && (
                      <Typography variant="caption" color="text.secondary" sx={{ marginTop: 0.5, display: 'block' }}>
                        {new Date(response.date).toLocaleDateString()}
                      </Typography>
                    )}
                  </Card>
                ))
              ) : (
                <Typography sx={styles.emptyValue()}>—</Typography>
              )}
            </Box>
          )}
        </Box>

        {isEditing && (
          <Box sx={styles.actionsRow()}>
            <Button onClick={onCancel} disabled={isSaving}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onSave}
              disabled={isSaving}
              startIcon={isSaving ? <CircularProgress size={16} /> : null}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

