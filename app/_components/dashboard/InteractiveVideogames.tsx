import Link from "next/link";
import DashboardProjectItem from "../dashboardItems/DashboardProjectItem";
import { getAllProjects } from "@/app/_lib/projectsApi";

async function InteractiveVideogames() {
  const data = await getAllProjects("interactive/videogame");

  const { projects } = data;

  if (!data.results)
    return (
      <div>
        <div className="flex h-dvh flex-col">
          <h2 className="py-10 text-center text-2xl">Interactive/videogames</h2>
          <h2 className="py-10 text-left text-xl uppercase">
            There are no videogames in your database
          </h2>
          <Link
            href="/dashboard/interactive-videogames/add"
            className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
          >
            + Add project
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
        <h2 className="py-10 text-center text-2xl">Interactive/videogames</h2>
        {projects.map(
          (project: {
            title: string;
            year?: number;
            _id: string;
            mainImage: string;
            imgs: string[];
          }) => (
            <DashboardProjectItem key={project._id} project={project} />
          ),
        )}

        <Link
          href="/dashboard/interactive-videogames/add"
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          + Add project
        </Link>
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="mt-4 rounded-md border-2 px-2 py-1 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
          >
            &larr; Dashboard
          </Link>
          {/* <LogOutBtn /> */}
        </div>
      </div>
    </div>
  );
}

export default InteractiveVideogames;
