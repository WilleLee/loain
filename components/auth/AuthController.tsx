"use client";

import { useEffect } from "react";
import useInternalRouter from "@hooks/useInternalRouter";
import { getLoginToken } from "@libs/actions";

export default function AuthController({ code }: { code: string }) {
  const { replace } = useInternalRouter();
  useEffect(() => {
    let isValidEffect = true;
    (async function () {
      const isSuccessful = await getLoginToken(code);
      if (isValidEffect) {
        if (isSuccessful) {
          replace("/auth/login");
        } else {
          replace("/");
        }
      }
    })();
    return () => {
      isValidEffect = false;
    };
  }, [replace, code]);
  return null;
}
