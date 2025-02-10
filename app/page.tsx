import { Suspense } from "react";
import Header from "./_components/Header";
import Spinner from "./_components/Spinner";
import HomeBanner from "./_components/HomeBanner";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mt-16 lg:mt-20">
        <Suspense fallback={<Spinner />}>
          <HomeBanner />
        </Suspense>
      </main>
    </>
  );
}
