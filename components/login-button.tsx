"use client";

import { login } from "@libs/actions";
import Button from "./button";
import { useState } from "react";

export default function LoginButton() {
  const [pending, setPending] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPending(true);
        login();
        setPending(false);
      }}
    >
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
