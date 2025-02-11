import { getOneWorkInProgress } from "@/app/_lib/projectsApi";
import Link from "next/link";
import EditInProgressForm from "../editForms/EditInProgressForm";

async function FetchOneInProgress({ id }: { id: string }) {
  const { projectInProgress } = await getOneWorkInProgress(id);

  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Edit</h3>
      <EditInProgressForm project={projectInProgress} />
      <Link
        href="/dashboard/inprogress"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default FetchOneInProgress;
