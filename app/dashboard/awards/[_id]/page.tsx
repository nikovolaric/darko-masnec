import FetchOneAward from "@/app/_components/forms/fetchComponents/FetchOneAward";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit award/festival",
};

async function Page({ params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchOneAward id={_id} />
    </Suspense>
  );
}

export default Page;
