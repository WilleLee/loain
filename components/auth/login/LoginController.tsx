"use client";

import useInternalRouter from "@hooks/useInternalRouter";
import { getAccessToken } from "@libs/actions";
import { useEffect } from "react";

export default function LoginController() {
  const { replace } = useInternalRouter();
  useEffect(() => {
    let isValidEffect = true;
    (async () => {
      const isSuccessful = await getAccessToken();
      if (isValidEffect) {
        if (isSuccessful) {
          console.log("success!");
          replace("/");
        } else {
          console.log("failed!");
          replace("/");
        }
      }
    })();
    return () => {
      isValidEffect = false;
    };
  }, [replace]);
  return null;
}
