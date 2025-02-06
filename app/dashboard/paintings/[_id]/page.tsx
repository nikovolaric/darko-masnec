import FetchOneProjectToEdit from "@/app/_components/forms/fetchComponents/FetchOneProjectToEdit";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit Painting",
};

async function Page({ params }: { params: { _id: string } }) {
  const { _id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchOneProjectToEdit id={_id} />
    </Suspense>
  );
}

export default Page;
