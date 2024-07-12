"use client";

import DateInput from "@components/date-input";
import dayjs from "dayjs";
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
      <DateInput
        label="label"
        currentDate={dayjs(date).format("YYYY.MM.DD")}
        {...register("date")}
      />
      <DateInput
        label="label"
        currentDate={dayjs(date2).format("YYYY.MM.DD")}
        error="에러가 발생했어요."
        {...register("date2")}
      />
    </>
  );
}
