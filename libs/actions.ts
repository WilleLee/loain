"use server";

import { fetcher } from "./fetcher";

export async function helloWorld(formData: FormData) {
  const hello = formData.get("hello") as string;
  const reqObj = { hello } as any;
  const response = await fetcher("POST", "/hello", reqObj);

  return response;
}
