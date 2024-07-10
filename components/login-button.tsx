"use client";

import { discordLogin } from "@libs/actions";
import Button from "./button";
import { FormEvent, useCallback, useState } from "react";

export default function LoginButton() {
  const [pending, setPending] = useState(false);
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    discordLogin();
    setPending(false);
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        buttonType="discord"
        aria-disabled={pending}
        disabled={pending}
      >
        로그인
      </Button>
    </form>
  );
}
