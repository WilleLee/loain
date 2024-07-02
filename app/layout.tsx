import { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ReactNode, Suspense } from "react";
import { PortalProvider } from "./global-portal";
import ThemeInitializer from "./theme-initializer";
import NProgressLoader from "./nprogress-loader";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME as string;

export const dynamic = "force-dynamic";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#17171c" },
  ],
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  appleWebApp: {
    capable: true,
    title: "Wille logs",
  },
  authors: [
    {
      name: "Inpyo Lee",
      url: "https://github.com/WilleLee",
    },
    {
      name: "Kwanjung Kim",
      url: "https://github.com/KwanjungKim",
    },
  ],
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
          <Suspense fallback={null}>
            <NProgressLoader />
          </Suspense>
        </Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-auth mx-auto my-0 min-h-screen w-full max-w-[1280px] overflow-x-hidden text-grey-900 dark:text-inverseGrey-900">
      <div className="w-full px-[8px] pb-[24px] pt-[64px] xs:px-[16px]">
        {children}
      </div>
    </div>
  );
}
