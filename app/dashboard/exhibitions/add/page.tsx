import AddExhibitionForm from "@/app/_components/forms/AddExhibitionForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add exhibition",
};

function Page() {
  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Add exhibition</h3>
      <AddExhibitionForm />
      <Link
        href="/dashboard/exhibitions"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default Page;
