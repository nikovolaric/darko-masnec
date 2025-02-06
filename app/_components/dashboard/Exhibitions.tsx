import { getAllExhibitions } from "@/app/_lib/awardsApi";
import Link from "next/link";
import DashboardExhibitionItem from "../dashboardItems/DashboardExhibitionItem";

async function Exhibitions() {
  const data = await getAllExhibitions();

  const { exhibitions } = data;

  if (!data.results)
    return (
      <div>
        <div className="flex h-dvh flex-col">
          <h2 className="py-10 text-center text-2xl">Exhibitions list</h2>
          <h2 className="py-10 text-left text-xl uppercase">
            There are no exhibitions in your database
          </h2>
          <Link
            href="/dashboard/exhibitions/add"
            className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
          >
            + Add exhibition
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
        <h2 className="py-10 text-center text-2xl">Exhibitions list</h2>
        {exhibitions.map(
          (exhibition: {
            exhibitionName: string;
            duration: string;
            _id: string;
          }) => (
            <DashboardExhibitionItem
              key={exhibition._id}
              exhibition={exhibition}
            />
          ),
        )}
        <Link
          href="/dashboard/exhibitions/add"
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          + Add exhibition
        </Link>
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="mb-20 mt-4 rounded-md border-2 px-2 py-1 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
          >
            &larr; Dashboard
          </Link>
          {/* <LogOutBtn /> */}
        </div>
      </div>
    </div>
  );
}

export default Exhibitions;
