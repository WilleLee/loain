"use server";

import { redirect } from "next/navigation";
import { fetcher } from "./fetcher";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { MainCharacter } from "./types";
import { delay } from "./delay";

export async function helloWorld(formData: FormData) {
  const hello = formData.get("hello") as string;
  const reqObj = {
    hello,
  } as any;
  const response = await fetcher<string>("POST", "/hello", reqObj);

  return response;
}

export async function discordLogin() {
  const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_GENERATED_URL as string;
  redirect(DISCORD_URL);
}

export async function logout() {
  cookies().delete("access-token");
  cookies().delete("login-token");
  revalidatePath("/");
  redirect("/");
}

export async function signup(
  apiKey: string,
  mainCharacter: MainCharacter,
  characters: string[],
) {
  const loginToken = cookies().get("login-token")?.value;
  const reqObj = {
    apiKey,
    mainCharacter,
    characters,
  } as any;
  if (!loginToken) {
    return {
      isSuccessful: false,
    };
  }
  // access-token을 가져와 로그인 처리
  await fetcher("POST", "/users", reqObj);
}

export async function validateCharacter(characterName: string, apiKey: string) {
  const reqObj = {
    characterName,
    apiKey,
  } as any;
  await delay(1000);
  const { data } = await fetcher<{
    characters: string[];
    mainCharacter: MainCharacter;
  }>("POST", "/lostark", reqObj);
  return data;
}
