"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SubMenu() {
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams);

  return (
    <ul className="noscroll flex items-center gap-5 overflow-x-scroll px-1 tracking-more sm:mx-auto sm:w-5/6 sm:justify-between sm:gap-0 sm:overflow-hidden lg:w-7/12 lg:text-xl">
      <li
        className={`w-fit flex-none ${!params.videogame && !params.video && !params.painting ? "font-semibold underline" : ""}`}
      >
        <Link href="/projects" scroll={false}>
          Animated film
        </Link>
      </li>
      <li
        className={`w-fit flex-none ${params.videogame ? "font-semibold underline" : ""}`}
      >
        <Link href={{ query: { videogame: "true" } }} scroll={false}>
          Interactive/videogame
        </Link>
      </li>
      <li
        className={`w-fit flex-none ${params.video ? "font-semibold underline" : ""}`}
      >
        <Link href={{ query: { video: "true" } }} scroll={false}>
          Installation/video
        </Link>
      </li>
      <li className={params.painting ? "font-semibold underline" : ""}>
        <Link href={{ query: { painting: "true" } }} scroll={false}>
          Paintings
        </Link>
      </li>
    </ul>
  );
}

export default SubMenu;
