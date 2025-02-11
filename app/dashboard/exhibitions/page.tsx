import Exhibitions from "@/app/_components/dashboard/Exhibitions";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Exhibitions list",
};

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Exhibitions />
    </Suspense>
  );
}

export default Page;
