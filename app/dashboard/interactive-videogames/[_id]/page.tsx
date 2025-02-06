import FetchOneProjectToEdit from "@/app/_components/forms/fetchComponents/FetchOneProjectToEdit";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Interactive/Videogame",
};

async function Page({ params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchOneProjectToEdit id={_id} />
    </Suspense>
  );
}

export default Page;
