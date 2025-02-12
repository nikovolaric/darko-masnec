import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";

const DMSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Darko Masnec",
    default: "Welcome | Darko Masnec",
  },
  description:
    "Darko Masnec's personal website. In 2017 he obtained his Ph.D. degree at the Academy of Fine Arts in Zagreb.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DMSans.className} mx-4 max-w-[1440px] bg-neutral tracking-base text-primary md:mx-8 lg:mx-20 xl:mx-auto xl:px-20`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
