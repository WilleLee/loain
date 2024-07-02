import AuthController from "@components/auth/AuthController";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const code = searchParams.code;

  return <AuthController code={code} />;
}
