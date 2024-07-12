"use client";

import { logout } from "@libs/actions";
import nProgress from "nprogress";

export default function LogoutButton() {
  const handleAction = () => {
    nProgress.start();
    logout();
  };
  return (
    <form action={handleAction}>
      <button type="submit">로그아웃</button>
    </form>
  );
}
