import clsx from "clsx";
import { InputHTMLAttributes, Ref, forwardRef } from "react";
import Text from "./text";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  currentDate: string;
  error?: string;
}

const DateInput = forwardRef(function DateInput(
  props: Props,
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

export default DateInput;
