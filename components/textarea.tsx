"use client";

import clsx from "clsx";
import { Ref, TextareaHTMLAttributes, forwardRef } from "react";
import Text from "./text";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef(function Textarea(
  props: Props,
  ref: Ref<HTMLTextAreaElement>,
) {
  const { label, error, ...rest } = props;
  return (
    <div className={clsx("my-[8px] flex flex-col")}>
      <label className={clsx("mb-[8px]")}>
        <Text typography="meta">{label}</Text>
      </label>
      <div
        className={clsx(
          "mb-[2px] h-[84px] w-full",
          "shadow-light dark:shadow-dark rounded-[10px] border-[2px] border-solid transition-colors",
          {
            "border-transparent focus-within:border-teal-600": !error,
            "border-red-300 dark:border-red-400": !!error,
          },
        )}
      >
        <div className={clsx("h-full w-full px-[8px] py-[4px]")}>
          <textarea
            ref={ref}
            className={clsx(
              "h-full w-full resize-none bg-transparent focus:outline-none",
              "text-[14px] font-normal text-grey-900 dark:text-inverseGrey-900",
              {
                "caret-teal-600": !error,
                "caret-red-300 dark:caret-red-400": !!error,
                "text-grey-900 dark:text-inverseGrey-900": !error,
                "text-red-300 dark:text-red-400": !!error,
              },
            )}
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

export default Textarea;
