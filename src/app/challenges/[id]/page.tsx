import { ChallengeDetailPageContainer } from '@/features/challenges/components/challenge-detail-page/challenge-detail-page.container';

type ChallengeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const { id } = await params;
  return <ChallengeDetailPageContainer challengeId={id} />;
}

