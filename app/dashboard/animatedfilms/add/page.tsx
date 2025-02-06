import AddAnimatedFilmForm from "@/app/_components/forms/AddAnimatedFilmForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Animated Film",
};

function Page() {
  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Add animated film</h3>
      <AddAnimatedFilmForm />
      <Link
        href="/dashboard/animatedfilms"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default Page;
