import { getAllProjects } from "@/app/_lib/projectsApi";
import ProjectItem from "./ProjectItem";

interface iProject {
  title: string;
  originalTitle?: string;
  description: string;
  subtitle?: string;
  category: string;
  mainImage: string;
  imgs: string[];
  sound?: string;
  music?: string;
  animation?: string;
  aspectRatio?: string;
  compositing?: string;
  director?: string;
  duration?: string;
  editing?: string;
  link?: string;
  producer?: string;
  scriptwriters?: string;
  technique?: string;
  year?: string;
  _id: string;
}

async function InteractiveVideogame() {
  const { projects } = await getAllProjects("interactive/videogame");

  return (
    <div className="mt-24 flex flex-col gap-20 lg:mt-40 lg:gap-52">
      {projects.map((project: iProject, i: number) => (
        <ProjectItem key={project._id} project={project} i={i} />
      ))}
    </div>
  );
}

export default InteractiveVideogame;
