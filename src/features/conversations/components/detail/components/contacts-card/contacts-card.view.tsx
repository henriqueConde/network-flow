'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { getContactColor } from '@/shared/utils/color.utils';
import type { ContactsCardProps } from './contacts-card.types';
import { styles } from './contacts-card.styles';

export function ContactsCard({
  contacts,
  config,
  onAddContact,
  onRemoveContact,
  isAddingContact,
  isRemovingContact,
}: ContactsCardProps) {
  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Box sx={styles.header()}>
          <Typography variant="h6" sx={styles.title()}>
            {config.copy.contacts.title}
          </Typography>
          <Button
            size="small"
            startIcon={<PersonAddIcon />}
            onClick={onAddContact}
            disabled={isAddingContact}
            variant="outlined"
          >
            {config.copy.contacts.addContact}
          </Button>
        </Box>

        {contacts.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {config.copy.contacts.empty}
          </Typography>
        ) : (
          <Box sx={styles.contactsList()}>
            {contacts.map((contact) => (
              <Box key={contact.id} sx={styles.contactItem()}>
                <Box sx={styles.contactInfo()}>
                  <Box sx={styles.contactNameRow()}>
                    {/* Color indicator */}
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: getContactColor(contact.id),
                        flexShrink: 0,
                        mr: 1,
                        border: '2px solid',
                        borderColor: 'background.paper',
                        boxShadow: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {contact.name}
                    </Typography>
                  </Box>
                  {contact.company && (
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 3 }}>
                      {contact.company}
                    </Typography>
                  )}
                </Box>
                <Box sx={styles.contactActions()}>
                  {contacts.length > 1 && (
                    <Tooltip title={config.copy.contacts.removeContact}>
                      <IconButton
                        size="small"
                        onClick={() => onRemoveContact?.(contact.id)}
                        disabled={isRemovingContact}
                        color="error"
                        sx={styles.actionButton()}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}


