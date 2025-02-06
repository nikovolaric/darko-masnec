import Awards from "@/app/_components/dashboard/Awards";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Awards & festivals",
};

function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Awards />
    </Suspense>
  );
}

export default Page;
