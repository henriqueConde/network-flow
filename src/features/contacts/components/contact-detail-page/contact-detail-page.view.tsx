'use client';

import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import type { ContactDetailViewProps } from './contact-detail-page.types';
import { styles } from './contact-detail-page.styles';
import { LoadingView } from './components/loading-view';
import { ErrorView } from './components/error-view';

export function ContactDetailPageView({
  contact,
  isLoading,
  error,
  config,
  availableCategories,
  availableStages,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  onBack,
  onStartEdit,
  onChangeEditField,
  onSave,
  onCancel,
  onGoToConversation,
}: ContactDetailViewProps) {
  if (isLoading) {
    return <LoadingView />;
  }

  if (error || !contact) {
    return <ErrorView error={error || 'Contact not found'} isNotFound={!contact} config={config} onBack={onBack} />;
  }

  const linkedinUrl = contact.profileLinks?.linkedin || editValues.linkedinUrl || null;
  const email = editValues.email || null;
  const connectedOn = editValues.connectedOn || null;

  return (
    <Box sx={styles.container()}>
      {/* Header */}
      <Box sx={styles.headerSection()}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={styles.backButton()}>
          {config.copy.backButton}
        </Button>

        <Box sx={styles.header()}>
          <Box>
            <Typography variant="h4" sx={styles.title()}>
              {isEditing ? (
                <TextField
                  fullWidth
                  value={editValues.name}
                  onChange={(e) => onChangeEditField('name', e.target.value)}
                  error={!!editErrors.name}
                  helperText={editErrors.name}
                  size="small"
                />
              ) : (
                contact.name
              )}
            </Typography>
            {contact.company && (
              <Typography variant="body2" color="text.secondary">
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.company || ''}
                    onChange={(e) => onChangeEditField('company', e.target.value || null)}
                    error={!!editErrors.company}
                    helperText={editErrors.company}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  contact.company
                )}
              </Typography>
            )}
          </Box>
          {!isEditing && (
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={onStartEdit}
            >
              {config.copy.buttons.edit}
            </Button>
          )}
          {isEditing && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={onCancel} disabled={isSaving}>
                {config.copy.buttons.cancel}
              </Button>
              <Button variant="contained" onClick={onSave} disabled={isSaving}>
                {isSaving ? <CircularProgress size={20} /> : config.copy.buttons.save}
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={styles.scrollableContent()}>
        <Box sx={styles.contentGrid()}>
          {/* Main Column */}
          <Box sx={styles.mainColumn()}>
            {/* Basic Information */}
            <Box sx={styles.card()}>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.sections.basicInfo}
              </Typography>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.firstName}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.firstName}
                    onChange={(e) => onChangeEditField('firstName', e.target.value)}
                    error={!!editErrors.firstName}
                    helperText={editErrors.firstName}
                    size="small"
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {editValues.firstName || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.lastName}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.lastName}
                    onChange={(e) => onChangeEditField('lastName', e.target.value)}
                    error={!!editErrors.lastName}
                    helperText={editErrors.lastName}
                    size="small"
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {editValues.lastName || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.headlineOrRole}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.headlineOrRole || ''}
                    onChange={(e) => onChangeEditField('headlineOrRole', e.target.value || null)}
                    error={!!editErrors.headlineOrRole}
                    helperText={editErrors.headlineOrRole}
                    size="small"
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {contact.headlineOrRole || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.position}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.position || ''}
                    onChange={(e) => onChangeEditField('position', e.target.value || null)}
                    error={!!editErrors.position}
                    helperText={editErrors.position}
                    size="small"
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {editValues.position || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.company}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.company || ''}
                    onChange={(e) => onChangeEditField('company', e.target.value || null)}
                    error={!!editErrors.company}
                    helperText={editErrors.company}
                    size="small"
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {contact.company || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.email}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    type="email"
                    value={editValues.email || ''}
                    onChange={(e) => onChangeEditField('email', e.target.value || null)}
                    error={!!editErrors.email}
                    helperText={editErrors.email}
                    size="small"
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {email || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>{config.copy.empty.noEmail}</span>}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* LinkedIn Information */}
            <Box sx={styles.card()}>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.sections.linkedinInfo}
              </Typography>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.linkedinUrl}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.linkedinUrl || ''}
                    onChange={(e) => onChangeEditField('linkedinUrl', e.target.value || null)}
                    error={!!editErrors.linkedinUrl}
                    helperText={editErrors.linkedinUrl}
                    size="small"
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {linkedinUrl ? (
                      <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                        {linkedinUrl}
                      </Link>
                    ) : (
                      <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>{config.copy.empty.noLinkedInUrl}</span>
                    )}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.connectedOn}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    type="date"
                    value={editValues.connectedOn || ''}
                    onChange={(e) => onChangeEditField('connectedOn', e.target.value || null)}
                    error={!!editErrors.connectedOn}
                    helperText={editErrors.connectedOn}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {connectedOn ? new Date(connectedOn).toLocaleDateString() : <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>{config.copy.empty.noConnectedOn}</span>}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Conversations */}
            <Box sx={styles.card()}>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.sections.conversations}
              </Typography>
              {contact.conversations.length === 0 ? (
                <Typography sx={styles.emptyValue()}>{config.copy.empty.noConversations}</Typography>
              ) : (
                <Box sx={styles.conversationsList()}>
                  {contact.conversations.map((conv) => (
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
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onGoToConversation(conv.id)}
                        >
                          {config.copy.conversations.goToConversation}
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          {/* Sidebar */}
          <Box>
            {/* Additional Information */}
            <Box sx={styles.card()}>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.sections.additionalInfo}
              </Typography>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.primaryPlatform}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    select
                    value={editValues.primaryPlatform || ''}
                    onChange={(e) => onChangeEditField('primaryPlatform', e.target.value || null)}
                    error={!!editErrors.primaryPlatform}
                    helperText={editErrors.primaryPlatform}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="twitter">Twitter</MenuItem>
                  </TextField>
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {contact.primaryPlatform || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.tags}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editValues.tags.join(', ')}
                    onChange={(e) => onChangeEditField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                    error={!!editErrors.tags}
                    helperText={editErrors.tags}
                    size="small"
                    placeholder="Comma-separated tags"
                  />
                ) : (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {contact.tags.length === 0 ? (
                      <Typography sx={styles.emptyValue()}>—</Typography>
                    ) : (
                      contact.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))
                    )}
                  </Box>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.category}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    select
                    value={editValues.categoryId || ''}
                    onChange={(e) => onChangeEditField('categoryId', e.target.value || null)}
                    error={!!editErrors.categoryId}
                    helperText={editErrors.categoryId}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    {availableCategories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {contact.categoryId ? availableCategories.find(c => c.id === contact.categoryId)?.name || '—' : '—'}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.stage}</Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    select
                    value={editValues.stageId || ''}
                    onChange={(e) => onChangeEditField('stageId', e.target.value || null)}
                    error={!!editErrors.stageId}
                    helperText={editErrors.stageId}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    {availableStages.map((stage) => (
                      <MenuItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {contact.stageId ? availableStages.find(s => s.id === contact.stageId)?.name || '—' : '—'}
                  </Typography>
                )}
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.createdAt}</Typography>
                <Typography sx={styles.fieldValue()}>
                  {contact.createdAtDate.toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>{config.copy.fields.updatedAt}</Typography>
                <Typography sx={styles.fieldValue()}>
                  {contact.updatedAtDate.toLocaleDateString()}
                </Typography>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

