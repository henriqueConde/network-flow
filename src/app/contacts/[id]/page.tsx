import { ContactDetailPageContainer } from '@/features/contacts';

type ContactDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
  const { id } = await params;
  return <ContactDetailPageContainer contactId={id} />;
}


