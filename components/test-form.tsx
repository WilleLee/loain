"use client";

import { helloWorld } from "@libs/actions";
import nProgress from "nprogress";
import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./button";

export default function TestForm() {
  const [pending, setPending] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ hello: string }>({
    defaultValues: {
      hello: "",
    },
  });

  const onSubmit = useCallback(
    async (formData: { hello: string }) => {
      nProgress.start();
      setPending(true);
      const { isSuccessful, data, error } = await helloWorld(formData.hello);
      if (!isSuccessful) {
        alert(error);
      } else if (!!data) {
        alert(data);
      }
      nProgress.done();
      reset();
      setPending(false);
    },
    [reset],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
