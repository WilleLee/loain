import { fetcher } from "./fetcher";
import Cookies from "js-cookie";

export async function helloWorld(hello: string) {
  const reqObj = {
    hello,
  } as any;
  const response = await fetcher<string>("POST", "/hello", reqObj);

  return response;
}

export async function discordLogin() {
  const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_GENERATED_URL as string;
  window.location.href = DISCORD_URL;
}

export async function logout() {
  if (typeof window === "undefined") return;
  Cookies.remove("access-token");
  await fetcher("POST", "/users/logout");
}

export async function getLoginToken(code: string) {
  const reqObj = { code } as any;
  const { isSuccessful, data } = await fetcher<string>("POST", "/auth", reqObj);
  if (isSuccessful && !!data && typeof window !== "undefined") {
    Cookies.set("login-token", data, {
      expires: 1,
    });
    return true;
  }
  return false;
}

export async function getAccessToken() {
  const { isSuccessful, data } = await fetcher<string>("POST", "/users/login");
  if (isSuccessful && !!data && typeof window !== "undefined") {
    Cookies.set("access-token", data, {
      expires: 1,
    });
    return true;
  }
  return false;
}
