import { getOneAward } from "@/app/_lib/awardsApi";
import Link from "next/link";
import EditAwardForm from "../editForms/EditAwardForm";

async function FetchOneAward({ id }: { id: string }) {
  const { award } = await getOneAward(id);

  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Edit</h3>
      <EditAwardForm award={award} />
      <Link
        href="/dashboard/awards"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default FetchOneAward;
