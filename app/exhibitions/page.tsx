import { Suspense } from "react";
import Header from "../_components/Header";
import ExhibitionList from "../_components/exhibitions/ExhibitionList";
import CollabsList from "../_components/exhibitions/CollabsList";
import { Metadata } from "next";
import Spinner from "../_components/Spinner";

export const metadata: Metadata = {
  title: "Exhibitions list",
};

function Page() {
  return (
    <>
      <Header />
      <main className="mt-12 flex flex-col gap-16 lg:mt-24 lg:gap-36">
        <Suspense fallback={<Spinner />}>
          <ExhibitionList />
          <CollabsList />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
