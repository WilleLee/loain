"use client";

import { helloWorld } from "@libs/actions";
import { ChangeEvent, useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "./button";
import { useFormStatus } from "react-dom";
import nProgress from "nprogress";

export default function TestForm() {
  const { pending } = useFormStatus();
  const { register } = useForm<{ hello: string }>({
    defaultValues: {
      hello: "",
    },
  });

  const handleAction = useCallback(async (formData: FormData) => {
    nProgress.start();
    const { data } = await helloWorld(formData);
    console.log("data", data);
    nProgress.done();
  }, []);

  return (
    <>
      <form action={handleAction}>
        <input
          className="text-grey-900"
          placeholder="world를 입력하세요."
          type="text"
          required
          aria-required
          aria-label="영문 world를 입력하세요."
          {...register("hello", {
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value
                .replace(/^\s+/, "")
                .replace(/\s+/g, " ");
            },
          })}
        />
        <Button
          aria-label="제출"
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          fullWidth={false}
        >
          제출
        </Button>
      </form>
    </>
  );
}
