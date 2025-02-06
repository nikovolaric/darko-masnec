import Header from "../_components/Header";
import AnimatedFilms from "../_components/projects/AnimatedFilms";
import InstallationVideo from "../_components/projects/InstallationVideo";
import InteractiveVideogame from "../_components/projects/InteractiveVideogame";
import ProjectsText from "../_components/projects/ProjectsText";
import SubMenu from "../_components/projects/SubMenu";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{
    videogame?: boolean;
    video?: boolean;
    painting?: boolean;
  }>;
}) {
  const params = await searchParams;
  if (!params?.videogame && !params?.video && !params?.painting) {
    return { title: "Animated film" };
  }
  if (params?.videogame) {
    return { title: "Interactive/videogame" };
  }
  if (params?.video) {
    return { title: "Installation/video" };
  }
  if (params?.painting) {
    return { title: "Paintings" };
  }
}

async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    videogame?: boolean;
    video?: boolean;
    painting?: boolean;
  }>;
}) {
  const params = await searchParams;
  return (
    <>
      <Header />
      <main className="mt-12 lg:mt-24">
        <div className="flex flex-col gap-16 lg:gap-24">
          <ProjectsText />
          <SubMenu />
        </div>
        {!params.videogame && !params.video && !params.painting && (
          <AnimatedFilms />
        )}
        {params.videogame && <InteractiveVideogame />}
        {params.video && <InstallationVideo />}
      </main>
    </>
  );
}

export default Page;
