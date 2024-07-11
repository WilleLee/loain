"use server";

import { redirect } from "next/navigation";
import { fetcher } from "./fetcher";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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
