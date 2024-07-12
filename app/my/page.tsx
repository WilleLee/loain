import Header from "@components/header";
import LogoutButton from "@components/my/logout-button";
import { ButtonSkeleton } from "@components/skeletons";
import { Suspense } from "react";

export default function MyPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ButtonSkeleton>로그아웃</ButtonSkeleton>}>
        <LogoutButton />
      </Suspense>
    </>
  );
}
