import { fetcher } from "./fetcher";

export async function getLoginToken(code: string) {
  const reqObj = { code } as any;
  const { isSuccessful, data } = await fetcher<string>("POST", "/auth", reqObj);
  if (isSuccessful && !!data) {
    return data;
  }
  return null;
}

export async function getAccess() {
  const { isSuccessful, data } = await fetcher<string>("POST", "/users/login");
  if (isSuccessful && !!data) {
    return data;
  }
  return null;
}
