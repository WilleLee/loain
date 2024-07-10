"use client";

import { fetcher } from "@libs/fetcher";
import { useEffect } from "react";

export default function TestNews() {
  useEffect(() => {
    let isValidCall = true;

    (async () => {
      const { isSuccessful, data } = await fetcher("GET", "/lostark/news");
      if (!isValidCall) return;
      if (isSuccessful && !!data) {
        console.log("news data", data);
      }
    })();

    return () => {
      isValidCall = false;
    };
  }, []);
  return null;
}
