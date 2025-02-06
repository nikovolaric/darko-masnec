"use client";

import { deleteAward } from "@/app/_lib/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function DashboardAwardItem({
  award,
}: {
  award: { awardTitle?: string; festival: string; year?: number; _id: string };
}) {
  const { festival, awardTitle, year, _id } = award;

  return (
    <div className="flex items-center justify-between gap-6 border-y border-secondary py-4">
      <p className="text-xl">
        {awardTitle && (
          <>
            <span className="font-bold">{awardTitle}</span>
            <span>, {festival}</span>
          </>
        )}
        {!awardTitle && <span>{festival}</span>}
        {year && `, (${year})`}
      </p>
      <div className="flex items-center gap-6">
        <Link
          href={`/dashboard/awards/${_id}`}
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          Edit
        </Link>
        <DeleteAward id={_id} />
      </div>
    </div>
  );
}

function DeleteAward({ id }: { id: string }) {
  const { pending } = useFormStatus();

  return (
    <form action={(formData: FormData) => deleteAward(formData, id)}>
      <button
        className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        disabled={pending}
      >
        {pending ? <ArrowPathIcon className="h-4 animate-spin" /> : "Delete"}
      </button>
    </form>
  );
}

export default DashboardAwardItem;
