import { getWorkInProgress } from "@/app/_lib/projectsApi";
import WorkInProgressItem from "./WorkInProgressItem";

async function WorkInProgress() {
  const data = await getWorkInProgress();

  const { projectsInProgress } = data;

  if (!data.results)
    return (
      <p className="h-[40dvh] text-center text-xl font-bold">
        New projects in progress comming soon!
      </p>
    );

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {projectsInProgress.map(
        (project: { description: string; imgs: string[]; _id: string }) => (
          <WorkInProgressItem key={project._id} project={project} />
        ),
      )}
    </div>
  );
}

export default WorkInProgress;
