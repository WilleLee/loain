"use client";

import { getAccessToken } from "@libs/data";
import AuthError from "../auth-error";
import AuthLoginSuccess from "./login-success";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthPending from "../auth-pending";
import AuthLoginSignup from "./login-signup";

export default function AuthLoginFunnel() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "signup"
  >("idle");

  useEffect(() => {
    (async function () {
      const { isSuccessful, accessToken } = await getAccessToken();
      if (!isSuccessful) {
        setStatus("error");
      } else {
        if (!accessToken) {
          setStatus("signup");
        } else {
          Cookies.remove("login-token");
          Cookies.set("access-token", accessToken);
          setStatus("success");
        }
      }
    })();
  }, []);

  if (status === "idle" || status === "pending") {
    return <AuthPending />;
  }

  if (status === "error") {
    return <AuthError />;
  }

  if (status === "signup") {
    return <AuthLoginSignup />;
  }

  return <AuthLoginSuccess />;
}
