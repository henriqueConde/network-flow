'use client';

import { useParams, useRouter } from 'next/navigation';
import { useOpportunityDetail } from '../../services/opportunities.queries';
import { OpportunityDetailView } from './opportunity-detail.view';

export function OpportunityDetailContainer() {
  const params = useParams();
  const router = useRouter();
  const opportunityId = params?.id as string;

  const { data: opportunity, isLoading, error } = useOpportunityDetail(opportunityId);

  const handleBack = () => {
    router.push('/pipeline');
  };

  const handleConversationClick = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
  };

  const handleInterviewClick = (conversationId: string) => {
    router.push(`/interviews/${conversationId}`);
  };

  return (
    <OpportunityDetailView
      opportunity={opportunity ?? null}
      isLoading={isLoading}
      error={error ? 'Failed to load opportunity. Please try again.' : null}
      onBack={handleBack}
      onConversationClick={handleConversationClick}
      onInterviewClick={handleInterviewClick}
    />
  );
}

