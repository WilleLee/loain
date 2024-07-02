import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";
import ThemeButton from "./theme-button";
import { ThemeButtonSkeleton } from "./skeletons";
import Image from "next/image";
import LoginButton from "./login-button";

export default function Header() {
  return (
    <header
      className={clsx(
        "fixed left-[50%] top-0 z-50 -translate-x-[50%]",
        "h-[64px] w-full max-w-[1280px]",
        "bg-background dark:bg-darkBackground",
      )}
    >
      <div
        className={clsx(
          "h-full w-full px-[8px] xs:px-[16px]",
          "flex items-center justify-between",
        )}
      >
        <div>
          <Link href="/" scroll={false}>
            <Image
              src="/favicon.ico"
              width="32"
              height="32"
              alt="favicon"
              priority
            />
          </Link>
        </div>
        <div className={clsx("flex items-center")}>
          <Suspense fallback={<button></button>}>
            <LoginButton />
          </Suspense>
          <Suspense fallback={<ThemeButtonSkeleton />}>
            <ThemeButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
