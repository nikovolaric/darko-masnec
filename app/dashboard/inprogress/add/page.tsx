import AddInProgressForm from "@/app/_components/forms/AddInProgressForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add work in progress",
};

function Page() {
  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Add work in progress</h3>
      <AddInProgressForm />
      <Link
        href="/dashboard/inprogress"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default Page;
