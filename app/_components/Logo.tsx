import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="tracking-more text-2xl text-secondary lg:text-[28px]"
    >
      Darko<span className="font-semibold">Masnec</span>
    </Link>
  );
}

export default Logo;
