"use client";

import { deleteExhibition } from "@/app/_lib/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function DashboardExhibitionItem({
  exhibition,
}: {
  exhibition: { exhibitionName: string; duration: string; _id: string };
}) {
  const { exhibitionName, duration, _id } = exhibition;

  return (
    <div className="flex items-center justify-between gap-6 border-y border-secondary py-4">
      <p className="text-xl">
        <span className="font-bold">{exhibitionName}, </span>
        {duration}
      </p>
      <div className="flex items-center gap-6">
        <Link
          href={`/dashboard/exhibitions/${_id}`}
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          Edit
        </Link>
        <DeleteExhibition id={_id} />
      </div>
    </div>
  );
}

function DeleteExhibition({ id }: { id: string }) {
  const { pending } = useFormStatus();

  return (
    <form action={(formData: FormData) => deleteExhibition(formData, id)}>
      <button
        className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        disabled={pending}
      >
        {pending ? <ArrowPathIcon className="h-4 animate-spin" /> : "Delete"}
      </button>
    </form>
  );
}

export default DashboardExhibitionItem;
