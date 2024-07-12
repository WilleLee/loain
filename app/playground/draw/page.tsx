import clsx from "clsx";
import DrawUI from "./draw-ui";
import Text from "@components/text";

export default function PlaygroundDrawPage() {
  return (
    <div
      className={clsx(
        "fixed left-[50%] top-[50%] w-full max-w-[320px] -translate-x-[50%] -translate-y-[50%] rounded-[10px] border-[0] border-solid border-transparent shadow-light dark:shadow-dark",
      )}
    >
      <div className={clsx("w-full px-[16px] py-[24px]")}>
        <h2 className={clsx("mb-[16px] text-center")}>
          <Text typography="semibold">회원가입</Text>
        </h2>
        <DrawUI />
      </div>
    </div>
  );
}
