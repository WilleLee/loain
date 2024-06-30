import { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ReactNode, Suspense } from "react";
import { PortalProvider } from "./global-portal";
import ThemeInitializer from "./theme-initializer";

export const dynamic = "force-dynamic";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "로아인",
    template: "%s | 로아인",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="bg-background dark:bg-darkBackground">
      <body
        suppressHydrationWarning={true}
        className={clsx("antialiased", notoSansKR.className)}
      >
        <Layout>
          <Suspense fallback={null}>
            <PortalProvider>{children}</PortalProvider>
          </Suspense>
          <Suspense fallback={null}>
            <ThemeInitializer />
          </Suspense>
        </Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-auth min-h-screen w-full max-w-full overflow-x-hidden text-grey-900 dark:text-grey-50">
      <div className="mx-auto my-0 w-full max-w-[520px] px-[8px] py-[64px]">
        {children}
      </div>
    </div>
  );
}
