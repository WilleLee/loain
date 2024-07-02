import { fetcher } from "./fetcher";

export async function helloWorld(hello: string) {
  const reqObj = {
    hello,
  } as any;
  const response = await fetcher<string>("POST", "/hello", reqObj);

  return response;
}

export async function login() {
  const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_GENERATED_URL as string;
  window.location.href = DISCORD_URL;
}
