import InteractiveVideogames from "@/app/_components/dashboard/InteractiveVideogames";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive/Videogames",
};

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InteractiveVideogames />
    </Suspense>
  );
}

export default Page;
