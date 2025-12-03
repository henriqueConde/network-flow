import { Suspense } from 'react';
import { OpportunitiesInboxContainer } from '@/features/opportunities';

export default function OpportunitiesInboxPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OpportunitiesInboxContainer />
    </Suspense>
  );
}

