"use client";

import { login } from "@libs/actions";
import clsx from "clsx";

export default function LoginButton() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <button className={clsx("bg-discord")} type="submit">
        login
      </button>
    </form>
  );
}
