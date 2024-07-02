"use client";

import clsx from "clsx";
import { InputHTMLAttributes, Ref, forwardRef, useId } from "react";
import Text from "./text";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef(function TestInput(
  props: Props,
  ref: Ref<HTMLInputElement>,
) {
  const { label, error, ...rest } = props;
  const id = useId();
  return (
    <div className={clsx("my-[8px] flex flex-col")}>
      <label className={clsx("mb-[8px]")} htmlFor={id}>
        <Text typography="meta">{label}</Text>
      </label>
      <div
        className={clsx(
          "mb-[2px] flex h-[42px] w-full items-center",
          "shadow-light dark:shadow-dark rounded-[10px] border-[2px] border-solid transition-colors",
          {
            "border-transparent focus-within:border-teal-600": !error,
            "border-red-300 dark:border-red-400": !!error,
          },
        )}
      >
        <div className={clsx("flex h-full w-full items-center px-[8px]")}>
          <input
            className={clsx(
              "w-full bg-transparent focus:outline-none",
              "text-[14px] font-normal",
              {
                "caret-teal-600": !error,
                "caret-red-300 dark:caret-red-400": !!error,
                "text-grey-900 dark:text-inverseGrey-900": !error,
                "text-red-300 dark:text-red-400": !!error,
              },
            )}
            ref={ref}
            id={id}
            {...rest}
          />
        </div>
      </div>
      {error && (
        <p>
          <Text typography="meta" color="red">
            {error}
          </Text>
        </p>
      )}
    </div>
  );
});

export default Input;
