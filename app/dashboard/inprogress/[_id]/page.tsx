import FetchOneInProgress from "@/app/_components/forms/fetchComponents/FetchOneInProgress";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Work In Progress",
};

async function Page({ params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchOneInProgress id={_id} />
    </Suspense>
  );
}

export default Page;
