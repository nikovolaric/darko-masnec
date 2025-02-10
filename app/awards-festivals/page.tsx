import { Suspense } from "react";
import Header from "../_components/Header";
import type { Metadata } from "next";
import AwardsList from "../_components/awards/AwardsList";
import FestivalsList from "../_components/awards/FestivalsList";
import Spinner from "../_components/Spinner";

export const metadata: Metadata = {
  title: "Awards & Festivals",
};

function Page() {
  return (
    <>
      <Header />
      <main className="mt-12 flex flex-col gap-16 lg:mt-24 lg:gap-36">
        <Suspense fallback={<Spinner />}>
          <AwardsList />
          <FestivalsList />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
