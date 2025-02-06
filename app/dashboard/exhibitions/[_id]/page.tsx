import { Suspense } from "react";
import type { Metadata } from "next";
import FetchOneExhibition from "@/app/_components/forms/fetchComponents/FetchOneExhibition";

export const metadata: Metadata = {
  title: "Edit exhibition",
};

async function Page({ params }: { params: { _id: string } }) {
  const { _id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchOneExhibition id={_id} />
    </Suspense>
  );
}

export default Page;
