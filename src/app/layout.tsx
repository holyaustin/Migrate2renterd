import "./globals.css";
import { Inter } from "next/font/google";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Home from "./page";

export const metadata = {
  title: "Migrate2renterd - Migrate from AWS to Sia Cloud",
  description:
    "Easily migrate your data from AWS to Sia  decentralized cloud via renterd",
  twitter: {
    card: "summary_large_image",
    title: "Migrate2renterd - Migrate from AWS to Sia Cloud",
    description:
      "Easily migrate your data from AWS to Sia  decentralized cloud via renterd",
    creator: "@holyaustin",
  },
  metadataBase: new URL("https://migrate2renterd.vercel.app/"),
  themeColor: "#FFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cx(sfPro.variable, inter.variable)}
        suppressHydrationWarning={true}
      >
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-green-100" />
        <Nav />
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
