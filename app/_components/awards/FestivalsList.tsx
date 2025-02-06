import { getAllAwards } from "@/app/_lib/awardsApi";
import AwardsListItem from "./AwardsListItem";

async function FestivalsList() {
  const { awards } = await getAllAwards();

  return (
    <div className="flex flex-col gap-8 lg:mx-auto lg:w-5/6">
      <h5 className="text-xl font-semibold tracking-more lg:text-2xl">
        Festivals:
      </h5>
      <div className="flex flex-col gap-4 lg:gap-5">
        {awards.map(
          (el: {
            year: number;
            awardTitle?: string;
            festival?: string;
            location: string;
            type?: string;
            _id: string;
          }) => (
            <AwardsListItem award={el} key={el._id} festivals />
          ),
        )}
      </div>
    </div>
  );
}

export default FestivalsList;
