import AddBioForm from "@/app/_components/forms/AddBioForm";
import EditBioForm from "@/app/_components/forms/editForms/EditBioForm";
import { getBio } from "@/app/_lib/bioApi";
import Link from "next/link";

export async function generateMetadata() {
  const { bios } = await getBio();

  if (bios.length === 0) {
    return { title: "Add bio data" };
  }

  return { title: "Edit bio data" };
}

export const dynamic = "force-dynamic";

async function Page() {
  const { bios } = await getBio();

  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">
        {bios.length === 0 ? "Add" : "Edit"} bio data
      </h3>
      {bios.length === 0 && <AddBioForm />}
      {bios.length > 0 && <EditBioForm bio={bios[0]} />}
      <Link
        href="/dashboard"
        className="mt-10 w-fit rounded-md border bg-primary px-4 py-1 text-neutral drop-shadow-lg transition-colors duration-300 hover:bg-secondary"
      >
        &larr; Back
      </Link>
    </div>
  );
}

export default Page;
