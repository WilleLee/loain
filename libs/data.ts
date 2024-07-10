import { delay } from "./delay";
import { fetcher } from "./fetcher";
import { LostarkNotice } from "./types";

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

export async function getLostartNotice() {
  await delay(1000);
  const { isSuccessful, data, error } = await fetcher<LostarkNotice[]>(
    "GET",
    "/lostark/news",
  );
  if (isSuccessful && !!data) {
    return {
      news: data,
      error: "",
    };
  }
  return {
    news: null,
    error,
  };
}
