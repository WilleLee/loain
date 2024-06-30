import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function useInternalRouter() {
  const router = useRouter();

  return useMemo(
    () => ({
      push: (path: Path) => router.push(path),
      replace: (path: Path) => router.replace(path),
      goBack: () => router.back(),
    }),
    [router],
  );
}

type Path = `/${string}`;
