"use client";

import { FormEvent, useCallback } from "react";
import Button from "./button";
import { logout } from "@libs/actions";

export default function LogoutButton() {
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await logout();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" buttonType="discord">
        로그아웃
      </Button>
    </form>
  );
}
