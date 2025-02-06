import { getAllExhibitions } from "@/app/_lib/awardsApi";
import ExhibitionListItem from "./ExhibitionListItem";

async function ExhibitionList() {
  const { exhibitions } = await getAllExhibitions("solo");

  return (
    <div className="flex flex-col gap-8 lg:mx-auto lg:w-5/6">
      <h5 className="text-xl font-semibold tracking-more lg:text-2xl">
        Exhibitions list:
      </h5>
      <div className="flex flex-col gap-4 lg:gap-5">
        {exhibitions.map(
          (el: {
            exhibitionName: string;
            location: string;
            duration: string;
            groupSolo?: string;
            _id: string;
          }) => (
            <ExhibitionListItem exhibition={el} key={el._id} />
          ),
        )}
      </div>
    </div>
  );
}

export default ExhibitionList;
