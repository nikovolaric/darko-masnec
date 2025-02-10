import { getAllProjects } from "@/app/_lib/projectsApi";
import PaintingItem from "./PaintingItem";

async function Paintings() {
  const { projects } = await getAllProjects("painting");
  const images = projects.map(
    (project: { mainImage: string }) => project.mainImage,
  );

  return (
    <div className="mt-24 lg:mt-40 lg:grid lg:grid-cols-5 lg:gap-5">
      {projects.map(
        (project: { title: string; _id: string; mainImage: string }) => (
          <PaintingItem key={project._id} project={project} images={images} />
        ),
      )}
    </div>
  );
}

export default Paintings;
