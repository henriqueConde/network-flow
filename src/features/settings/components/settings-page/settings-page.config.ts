export const SETTINGS_PAGE_CONFIG = {
  copy: {
    title: 'Settings',
    subtitle: 'Configure your data sources and AI preferences.',
    sections: {
      dataSources: {
        title: 'Data Sources',
        description: 'Manage how Network Flow receives your conversation data.',
        gmail: {
          title: 'Gmail Integration',
          description: 'Connect your Gmail to detect new LinkedIn messages via email notifications.',
          connectButton: 'Connect Gmail',
          disconnectButton: 'Disconnect',
          statusConnected: 'Connected',
          statusDisconnected: 'Not connected',
          lastSync: 'Last sync',
        },
        manualPaste: {
          title: 'Manual Paste',
          description: 'The primary way to add and update conversations in Network Flow.',
          instructions: 'To add or update a conversation:',
          instructionsSteps: [
            'Open the conversation on LinkedIn (or another platform)',
            'Select and copy the messages you want to add',
            'In Network Flow, create a new conversation or open an existing one',
            'Paste the copied text into the message field',
            'Save to parse and structure the conversation',
          ],
        },
      },
      ai: {
        title: 'AI Behavior',
        description: 'Customize how AI suggests replies and classifies conversations.',
        tone: {
          label: 'Reply Tone',
          description: 'The tone AI uses when suggesting replies.',
          options: {
            friendly: 'Friendly',
            professional: 'Professional',
            concise: 'Very concise',
          },
        },
        language: {
          label: 'Language',
          description: 'Language for AI-generated content.',
        },
        maxLength: {
          label: 'Max Reply Length',
          description: 'Maximum length for AI-suggested replies (in characters).',
        },
      },
    },
  },
} as const;

