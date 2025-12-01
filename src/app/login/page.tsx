import { LoginFormContainer } from '@/features/auth';

type LoginPageSearchParams = {
  next?: string;
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<LoginPageSearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const nextPath =
    typeof resolvedSearchParams.next === 'string' ? resolvedSearchParams.next : undefined;

  return <LoginFormContainer nextPath={nextPath} />;
}

