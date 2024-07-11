import clsx from "clsx";
import { ReactNode } from "react";

export function ButtonSkeleton(props: {
  children: ReactNode;
  fullWidth?: boolean;
}) {
  const { children, fullWidth = true } = props;
  return (
    <button
      className={clsx(
        "inline-flex h-[42px] cursor-pointer items-center text-[15px] font-medium transition-colors",
        "rounded-[5px] border-0 border-solid border-transparent",
        "text-inverseGrey-900 dark:text-grey-900",
        "disabled:cursor-not-allowed disabled:opacity-[0.34]",
        "animate-skeleton-pulse bg-grey-500",
        {
          "w-full": fullWidth,
          "w-auto": !fullWidth,
        },
      )}
    >
      <span className={clsx("inline-block w-full px-[16px]")}>{children}</span>
    </button>
  );
}
