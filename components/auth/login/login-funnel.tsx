"use client";

import { getAccessToken } from "@libs/data";
import AuthError from "../auth-error";
import AuthLoginSuccess from "./login-success";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthPending from "../auth-pending";

export default function AuthLoginFunnel() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  useEffect(() => {
    (async function () {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        setStatus("error");
      } else {
        Cookies.remove("login-token");
        Cookies.set("access-token", accessToken);
        setStatus("success");
      }
    })();
  }, []);

  if (status === "idle" || status === "pending") {
    return <AuthPending />;
  }

  if (status === "error") {
    return <AuthError />;
  }

  return <AuthLoginSuccess />;
}
