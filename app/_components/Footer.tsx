"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className={`absolute left-0 z-50 mt-24 w-full bg-primary/75 py-4 text-neutral ${pathname.startsWith("/dashboard") || pathname === "/login" ? "hidden" : ""}`}
    >
      <div className="mx-4 flex max-w-[1440px] flex-col gap-6 text-sm md:mx-8 lg:mx-20 lg:grid lg:grid-cols-2 lg:text-base xl:mx-auto xl:px-20">
        <p className="font-semibold">
          Darko Masnec. &copy; All rights reserved, 2025.
        </p>
        <p className="lg:order-3">
          Text, photo, graphic, audio and/or video material or other materials
          may not be published, broadcast, rewritten for broadcast or
          publication or redistributed directly or indirectly in any medium,
          without the written permission from the author.
        </p>
        <p className="self-end text-sm lg:justify-self-end">
          Web development:{" "}
          <Link href="https://www.lamastrategies.com" target="_blank">
            LAMA Strategies
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
