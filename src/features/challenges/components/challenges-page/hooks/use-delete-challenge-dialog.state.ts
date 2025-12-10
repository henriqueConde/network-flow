import { useState } from 'react';

/**
 * UI state hook for the delete challenge confirmation dialog.
 */
export function useDeleteChallengeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [challengeName, setChallengeName] = useState<string>('');

  const open = (id: string, name: string) => {
    setChallengeId(id);
    setChallengeName(name);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setChallengeId(null);
    setChallengeName('');
  };

  return {
    isOpen,
    challengeId,
    challengeName,
    open,
    close,
  };
}


