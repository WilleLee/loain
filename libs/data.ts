import { fetcher } from "./fetcher";
import { LostarkNotice } from "./types";

export async function getLostartNotice() {
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
