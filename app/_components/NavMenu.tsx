"use client";

import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(
    function () {
      if (isOpen) {
        scrollTo(0, 0);
        setTimeout(function () {
          document.body.style.overflow = "hidden";
        }, 50);
      } else {
        document.body.style.overflow = "auto";
      }
    },
    [isOpen],
  );

  function handleClick() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <nav
        className={`tracking-more pt-8 lg:hidden ${pathname !== "/" ? "border-b border-primary py-12" : ""}`}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <Bars2Icon className="w-10 text-secondary" onClick={handleClick} />
        </div>
        <div
          className={`absolute left-0 top-0 z-20 ${!isOpen ? "h-0" : "h-full pt-12"} w-full bg-neutral text-center transition-all duration-300`}
        >
          {isOpen && (
            <>
              <XMarkIcon
                className="mx-auto h-8 text-secondary"
                onClick={handleClick}
              />
              <ul className="mt-10 flex flex-col gap-8 text-xl">
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
                <li>
                  <Link href="/inprogress">Work in progress</Link>
                </li>
                <li>
                  <Link href="/awards-festivals">Awards & Festivals</Link>
                </li>
                <li>
                  <Link href="/exhibitions">Exhibitions list</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
      <nav
        className={`tracking-more hidden pt-10 lg:flex lg:flex-col lg:items-center lg:gap-20 ${pathname !== "/" ? "border-b border-primary py-12" : ""}`}
      >
        <Logo />
        <ul className="flex w-full items-center justify-between text-xl font-semibold">
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/inprogress">Work in progress</Link>
          </li>
          <li>
            <Link href="/awards-festivals">Awards & Festivals</Link>
          </li>
          <li>
            <Link href="/exhibitions">Exhibitions list</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavMenu;
