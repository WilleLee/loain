import clsx from "clsx";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import ThemeButton from "./theme-button";
import { ButtonSkeleton } from "@components/skeletons";
import Image from "next/image";
import LoginButton from "./login-button";
import { cookies } from "next/headers";
import RouteButton from "@components/route-button";

export default function Header() {
  const accessToken = cookies().get("access-token")?.value;
  const isLoggedin = !!accessToken;

  return (
    <Layout>
      <div>
        <Link
          href="/"
          scroll={false}
          aria-label="홈 페이지로 이동"
          title="로아인"
        >
          <Image
            src="/favicon.ico"
            width="42"
            height="42"
            alt="favicon"
            priority
          />
        </Link>
      </div>
      <div className={clsx("flex items-center gap-[16px]")}>
        <Suspense fallback={null}>
          <ThemeButton />
        </Suspense>
        {!isLoggedin && (
          <Suspense fallback={<ButtonSkeleton>로그인</ButtonSkeleton>}>
            <LoginButton />
          </Suspense>
        )}
        {isLoggedin && (
          <Suspense fallback={<ButtonSkeleton>나의 정보</ButtonSkeleton>}>
            <RouteButton path="/my" aria-label="나의 정보 페이지로 이동">
              나의 정보
            </RouteButton>
          </Suspense>
        )}
      </div>
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
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
        {children}
      </div>
    </header>
  );
}
