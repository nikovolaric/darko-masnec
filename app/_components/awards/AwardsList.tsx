import { getAllAwards } from "@/app/_lib/awardsApi";
import AwardsListItem from "./AwardsListItem";

async function AwardsList() {
  const { awards } = await getAllAwards(true);

  return (
    <div className="flex flex-col gap-8 lg:mx-auto lg:w-5/6">
      <h5 className="text-xl font-semibold tracking-more lg:text-2xl">
        Awards:
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
            institute?: string;
          }) => (
            <AwardsListItem award={el} key={el._id} />
          ),
        )}
      </div>
    </div>
  );
}

export default AwardsList;
