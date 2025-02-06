import Paintings from "@/app/_components/dashboard/Paintings";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paintings",
};

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Paintings />
    </Suspense>
  );
}

export default Page;
