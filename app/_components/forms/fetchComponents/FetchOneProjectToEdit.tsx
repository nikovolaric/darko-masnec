import Link from "next/link";
import EditAnimatedFilmForm from "../editForms/EditAnimatedFilmForm";
import { getOneProject } from "@/app/_lib/projectsApi";
import EditInterActiveVideogameForm from "../editForms/EditiInteractiveVideogameForm";
import EditInterActiveVideoForm from "../editForms/EditInteractiveVideoForm";
import EditPaintingForm from "../editForms/EditPaintingForm";

async function FetchOneProjectToEdit({ id }: { id: string }) {
  const { project } = await getOneProject(id);

  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">Edit</h3>
      {project.category === "animated film" && (
        <EditAnimatedFilmForm project={project} />
      )}
      {project.category === "interactive/videogame" && (
        <EditInterActiveVideogameForm project={project} />
      )}
      {project.category === "installations/video" && (
        <EditInterActiveVideoForm project={project} />
      )}
      {project.category === "painting" && (
        <EditPaintingForm project={project} />
      )}
      <Link
        href={
          project.category === "animated film"
            ? "/dashboard/animatedfilms"
            : project.category === "interactive/videogame"
              ? "/dashboard/interactive-videogames"
              : project.category === "installations/video"
                ? "/dashboard/installation-video"
                : "/dashboard/paintings"
        }
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default FetchOneProjectToEdit;
