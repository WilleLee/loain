"use client";

import { GlobalPortal } from "@app/global-portal";
import { helloWorld } from "@libs/actions";
import nProgress from "nprogress";
import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export default function TestForm() {
  const { register, reset } = useForm<{ hello: string }>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState("");
  const handleSubmit = useCallback(
    async (formData: FormData) => {
      nProgress.start();
      const { isSuccessful, error, data, code } = await helloWorld(formData);
      if (!isSuccessful) {
        setMessage("");
        setErrorMessage(`${error} ${code}`);
        reset({
          hello: "",
        });
      } else {
        setMessage(data as string);
        setErrorMessage("");
      }
      nProgress.done();
    },
    [reset],
  );
  return (
    <>
      <form action={handleSubmit}>
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
              setMessage("");
            },
          })}
        />
        <button aria-label="제출" type="submit">
          제출
        </button>
      </form>
      {message.length > 0 && <p>{message}</p>}
      {errorMessage.length > 0 && (
        <GlobalPortal>
          <p className="text-red-400">{errorMessage}</p>
        </GlobalPortal>
      )}
    </>
  );
}
