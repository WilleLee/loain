"use client";

import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { useEffect } from "react";

export default function NProgressLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.start();
    nProgress.done();

    return () => {
      nProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
}
