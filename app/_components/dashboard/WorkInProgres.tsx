import { getWorkInProgress } from "@/app/_lib/projectsApi";
import Link from "next/link";
import DashboardInProgressItem from "../dashboardItems/DashboarInProgressItem";

async function WorkInProgres() {
  const data = await getWorkInProgress();

  const { projectsInProgress } = data;

  if (!data.results)
    return (
      <div>
        <div className="flex h-dvh flex-col">
          <h2 className="py-10 text-center text-2xl">Work in progress</h2>
          <h2 className="py-10 text-left text-xl uppercase">
            There is no work in progress in your database
          </h2>
          <Link
            href="/dashboard/inprogress/add"
            className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
          >
            + Add work in progress
          </Link>
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="mt-4 rounded-md border-2 px-2 py-1 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              &larr; Dashboard
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex h-dvh flex-col">
        <h2 className="py-10 text-center text-2xl">Work in progress</h2>
        {projectsInProgress.map(
          (project: { description: string; _id: string; imgs: string[] }) => (
            <DashboardInProgressItem key={project._id} project={project} />
          ),
        )}
        <Link
          href="/dashboard/inprogress/add"
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          + Add work in progress
        </Link>
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="mt-4 rounded-md border-2 px-2 py-1 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
          >
            &larr; Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WorkInProgres;
