import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  buttonType?: "primary" | "secondary" | "alert" | "discord";
}

const Button = forwardRef(function Button(
  props: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const { children, fullWidth = true, buttonType = "primary", ...rest } = props;
  return (
    <button
      ref={ref}
      className={clsx(
        "inline-flex h-[42px] cursor-pointer items-center text-[15px] font-medium transition-colors",
        "rounded-[5px] border-0 border-solid border-transparent",
        "text-inverseGrey-900 dark:text-grey-900",
        "disabled:cursor-not-allowed disabled:opacity-[0.34]",
        {
          "w-full": fullWidth,
          "w-auto": !fullWidth,
        },
        {
          "bg-teal-600 hover:bg-teal-700 active:bg-teal-800":
            buttonType === "primary",
          "bg-grey-500 hover:bg-grey-600 active:bg-grey-700":
            buttonType === "secondary",
          "bg-red-500 hover:bg-red-600 active:bg-red-700":
            buttonType === "alert",
          "bg-discord hover:bg-discordHover active:bg-discordActive":
            buttonType === "discord",
        },
      )}
      {...rest}
    >
      <span className={clsx("inline-block w-full px-[16px]")}>{children}</span>
    </button>
  );
});

export default Button;
