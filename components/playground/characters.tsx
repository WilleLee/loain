"use client";

import { fetcher } from "@libs/fetcher";
import { useEffect } from "react";

export default function Characters() {
  useEffect(() => {
    let isValidCall = true;
    (async () => {
      const r = await fetcher("GET", "/lostark");
      if (!isValidCall) return;
      console.log("r", r);
    })();
    return () => {
      isValidCall = false;
    };
  }, []);
  return <div>characters</div>;
}
