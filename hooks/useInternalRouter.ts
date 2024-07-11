import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function useInternalRouter() {
  const router = useRouter();

  return useMemo(
    () => ({
      push: (path: Path) => router.push(path, { scroll: false }),
      replace: (path: Path) => router.replace(path, { scroll: false }),
      goBack: () => router.back(),
    }),
    [router],
  );
}

type Path = `/${string}`;
