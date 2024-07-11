import Text from "@components/text";
import clsx from "clsx";

export default function AuthPending() {
  return (
    <div
      className={clsx(
        "fixed left-[50%] top-[50%] w-full max-w-[320px] -translate-x-[50%] -translate-y-[50%] rounded-[10px] border-[0] border-solid border-transparent shadow-light dark:shadow-dark",
      )}
    >
      <div
        className={clsx(
          "flex w-full flex-col items-center gap-[16px] px-[16px] py-[24px]",
        )}
      >
        <p>
          <Text typography="medium">로그인 중...</Text>
        </p>
      </div>
    </div>
  );
}
