"use client";

import Button from "@components/button";
import Text from "@components/text";
import useInternalRouter from "@hooks/useInternalRouter";
import clsx from "clsx";

export default function AuthError() {
  const { replace } = useInternalRouter();
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
          <Text typography="medium">오류가 발생했습니다.</Text>
        </p>
        <Button onClick={() => replace("/")}>홈으로</Button>
      </div>
    </div>
  );
}
