import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  singleLine?: boolean;
  textAlign?: "left" | "center" | "right";
  typography?: "light" | "regular" | "medium" | "semibold" | "bold" | "meta";
  color?: "normal" | "red";
  style?: CSSProperties;
};

export default function Text(props: Props) {
  const {
    children,
    singleLine = false,
    textAlign = "left",
    typography = "regular",
    color = "normal",
    style = {},
  } = props;
  return (
    <span
      className={clsx("inline-block", `text-${textAlign}`, {
        "max-w-full overflow-hidden text-ellipsis whitespace-nowrap":
          singleLine,
        "text-[12px] font-semibold": typography === "meta",
        "text-[12px] font-light": typography === "light",
        "text-[14px] font-normal": typography === "regular",
        "text-[16px] font-medium": typography === "medium",
        "text-[18px] font-semibold": typography === "semibold",
        "text-[20px] font-bold": typography === "bold",
        "text-grey-900 dark:text-inverseGrey-900": color === "normal",
        "text-red-300 dark:text-red-400": color === "red",
      })}
      style={style}
    >
      {children}
    </span>
  );
}
