import { getAllAwards } from "@/app/_lib/awardsApi";
import Link from "next/link";
import DashboardAwardItem from "../dashboardItems/DashboardAwardItem";

async function Awards() {
  const data = await getAllAwards();

  const { awards } = data;

  if (!data.results)
    return (
      <div>
        <div className="flex h-dvh flex-col">
          <h2 className="py-10 text-center text-2xl">
            My awards and festivals
          </h2>
          <h2 className="py-10 text-left text-xl uppercase">
            There are no awards or festivals in your database
          </h2>
          <Link
            href="/dashboard/awards/add"
            className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
          >
            + Add award or festival
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
        <h2 className="py-10 text-center text-2xl">My awards and festivals</h2>
        {awards.map(
          (award: {
            awardTitle: string;
            year?: number;
            _id: string;
            festival: string;
          }) => (
            <DashboardAwardItem key={award._id} award={award} />
          ),
        )}
        <Link
          href="/dashboard/awards/add"
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          + Add award or festival
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

export default Awards;
