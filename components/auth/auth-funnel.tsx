import { getLoginToken } from "@libs/data";
import AuthError from "./auth-error";
import AuthSuccess from "./auth-success";

export default async function AuthFunnel({ code }: { code: string }) {
  const loginToken = await getLoginToken(code);
  if (!loginToken) {
    return <AuthError />;
  }

  return <AuthSuccess loginToken={loginToken} />;
}
