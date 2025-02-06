import Exhibitions from "@/app/_components/dashboard/Exhibitions";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Exhibitions />
    </Suspense>
  );
}

export default Page;
