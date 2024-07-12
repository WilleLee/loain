import AuthFunnel from "@components/auth/auth-funnel";
import AuthPending from "@components/auth/auth-pending";
import { Suspense } from "react";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const code = searchParams.code;
  return (
    <Suspense fallback={<AuthPending />}>
      <AuthFunnel code={code} />
    </Suspense>
  );
}
