import WorkInProgres from "@/app/_components/dashboard/WorkInProgres";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "In progress",
};

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkInProgres />
    </Suspense>
  );
}

export default Page;
