import { Suspense } from 'react';
import { OpportunitiesInboxContainer } from '@/features/opportunities/components/inbox/opportunities-inbox.container';

export default function OpportunitiesInboxPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OpportunitiesInboxContainer />
    </Suspense>
  );
}

