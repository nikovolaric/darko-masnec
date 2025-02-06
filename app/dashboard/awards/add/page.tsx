import AddAwardForm from "@/app/_components/forms/AddAwardForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add award",
};

function Page() {
  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Add award or festival</h3>
      <AddAwardForm />
      <Link
        href="/dashboard/awards"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default Page;
