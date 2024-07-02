"use client";

import Text from "@components/text";
import clsx from "clsx";
import dayjs from "dayjs";
import { InputHTMLAttributes, Ref, forwardRef } from "react";
import { useForm } from "react-hook-form";

export default function DateInputLoader() {
  const { register, watch } = useForm({
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD") || "1994-03-11",
      date2: dayjs().format("YYYY-MM-DD") || "1994-03-11",
    },
  });
  const { date, date2 } = watch();
  return (
    <>
      <TestDateInput
        label="label"
        currentDate={dayjs(date).format("YYYY.MM.DD")}
        {...register("date")}
      />
      <TestDateInput
        label="label"
        currentDate={dayjs(date2).format("YYYY.MM.DD")}
        error="에러가 발생했어요."
        {...register("date2")}
      />
    </>
  );
}

interface TestDateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  currentDate: string;
  error?: string;
}

const TestDateInput = forwardRef(function TestDateInput(
  props: TestDateInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const { label, currentDate, error, ...rest } = props;
  return (
    <div className={clsx("my-[8px] flex flex-col")}>
      <p className={clsx("mb-[8px]")}>
        <Text typography="meta">{label}</Text>
      </p>
      <div
        className={clsx(
          "relative flex h-[42px] w-full items-center",
          "shadow-light dark:shadow-dark rounded-[10px] border-[2px] border-solid transition-colors",
          {
            "border-transparent focus-within:border-teal-600": !error,
            "border-red-300 dark:border-red-400": !!error,
          },
        )}
      >
        <p className="px-[8px]">
          <Text color={!!error ? "red" : "normal"}>{currentDate}</Text>
        </p>
        <input
          ref={ref}
          className={clsx("absolute left-0 top-0 z-10 h-full w-full opacity-0")}
          type="date"
          {...rest}
        />
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
