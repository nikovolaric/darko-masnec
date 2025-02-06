import AnimatedFilms from "@/app/_components/dashboard/AnimatedFilms";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animated Films",
};

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatedFilms />
    </Suspense>
  );
}

export default Page;
