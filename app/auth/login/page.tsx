import AuthPending from "@components/auth/auth-pending";
import AuthLoginFunnel from "@components/auth/login/login-funnel";
import { Suspense } from "react";

export default async function AuthLoginPage() {
  return (
    <Suspense fallback={<AuthPending />}>
      <AuthLoginFunnel />
    </Suspense>
  );
}
