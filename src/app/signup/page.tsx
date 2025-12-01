import { SignupFormContainer } from '@/features/auth';

type SignupPageSearchParams = {
  next?: string;
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams?: Promise<SignupPageSearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const nextPath =
    typeof resolvedSearchParams.next === 'string' ? resolvedSearchParams.next : undefined;

  return <SignupFormContainer nextPath={nextPath} />;
}

