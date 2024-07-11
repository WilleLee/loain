import { fetcher } from "./fetcher";

export async function getLoginToken(code: string) {
  const reqObj = { code } as any;
  const { isSuccessful, data: loginToken } = await fetcher<string>(
    "POST",
    "/auth",
    reqObj,
  );

  if (isSuccessful && !!loginToken) {
    return loginToken;
  }
  return null;
}

export async function getAccessToken() {
  const { isSuccessful, data: accessToken } = await fetcher<string>(
    "POST",
    "/users/login",
  );

  if (isSuccessful && !!accessToken) {
    return accessToken;
  }
  return null;
}
