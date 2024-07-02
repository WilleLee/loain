"use client";

import { useThemeStore } from "@libs/zustand/theme/use-theme-store";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/20/solid";

export default function ThemeButton() {
  const { toggleTheme, theme } = useThemeStore();
  return (
    <button
      className="inline-flex w-[26px] items-center justify-center"
      onClick={() => {
        if (theme === "dark") {
          localStorage.setItem("theme", "light");
        } else {
          localStorage.setItem("theme", "dark");
        }
        toggleTheme();
      }}
      aria-label="테마 변경 버튼"
      title="테마 변경"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
