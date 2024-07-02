"use client";

import { getAccess, getLoginToken } from "@libs/data";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useInternalRouter from "@hooks/useInternalRouter";

export default function AuthController({ code }: { code: string }) {
  const { replace } = useInternalRouter();
  useEffect(() => {
    let isValidCall = true;
    (async () => {
      const loginToken = await getLoginToken(code);
      if (!isValidCall) return;
      if (!loginToken) return;
      Cookies.set("login-token", loginToken, {
        expires: 1,
      });
      const accessToken = await getAccess();
      if (!isValidCall) return;
      if (!accessToken) return;
      Cookies.set("access-token", accessToken, {
        expires: 1,
      });
      replace("/");
    })();
    return () => {
      isValidCall = false;
    };
  }, [replace, code]);
  return null;
}
