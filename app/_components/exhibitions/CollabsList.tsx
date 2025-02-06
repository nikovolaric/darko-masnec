import { getAllExhibitions } from "@/app/_lib/awardsApi";
import CollabListItem from "./CollabListItem";

async function CollabsList() {
  const { exhibitions } = await getAllExhibitions("collab");

  return (
    <div className="flex flex-col gap-8 lg:mx-auto lg:w-5/6">
      <h5 className="text-xl font-semibold tracking-more lg:text-2xl">
        Collaborations, project, workshops::
      </h5>
      <div className="flex flex-col gap-4 lg:gap-5">
        {exhibitions.map(
          (el: {
            exhibitionName: string;
            location: string;
            duration: string;
            role?: string;
            _id: string;
          }) => (
            <CollabListItem exhibition={el} key={el._id} />
          ),
        )}
      </div>
    </div>
  );
}

export default CollabsList;
