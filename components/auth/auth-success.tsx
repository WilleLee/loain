"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import useInternalRouter from "@hooks/useInternalRouter";

export default function AuthSuccess({ loginToken }: { loginToken: string }) {
  const { replace } = useInternalRouter();
  useEffect(() => {
    Cookies.set("login-token", loginToken, {
      expires: 24 * 60 * 60 * 1000,
    });
    console.log("loginToken set", loginToken);
    replace("/auth/login");
  }, [loginToken, replace]);
  return null;
}
