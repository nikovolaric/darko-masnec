import { Suspense } from "react";
import Header from "../_components/Header";
import Spinner from "../_components/Spinner";
import type { Metadata } from "next";
import WorkInProgress from "../_components/inprogress/WorkInProgress";

export const metadata: Metadata = {
  title: "Work in progress",
};

function Page() {
  return (
    <>
      <Header />
      <main className="mt-12 flex flex-col gap-16 lg:mt-24 lg:gap-36">
        <Suspense fallback={<Spinner />}>
          <WorkInProgress />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
