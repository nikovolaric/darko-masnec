import { getOneExhibition } from "@/app/_lib/awardsApi";
import Link from "next/link";
import EditExhibitionForm from "../editForms/EditExhibitionForm";

async function FetchOneExhibition({ id }: { id: string }) {
  const { exhibition } = await getOneExhibition(id);

  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Edit</h3>
      <EditExhibitionForm exhibition={exhibition} />
      <Link
        href="/dashboard/exhibitions"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default FetchOneExhibition;
