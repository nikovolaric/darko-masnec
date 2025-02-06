import InteractiveVideo from "@/app/_components/dashboard/InteractiveVideo";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation/Video",
};

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InteractiveVideo />
    </Suspense>
  );
}

export default Page;
