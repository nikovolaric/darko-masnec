import AddBannerForm from "@/app/_components/forms/AddBannerForm";
import EditBannerForm from "@/app/_components/forms/editForms/EditBannerForm";
import { getBanner } from "@/app/_lib/projectsApi";
import Link from "next/link";

export async function generateMetadata() {
  const { banners } = await getBanner();

  if (banners.length === 0) {
    return { title: "Add homepage banner" };
  }

  return { title: "Edit homepage banner" };
}

async function Page() {
  const { banners } = await getBanner();

  return (
    <div className="flex flex-col gap-6 pt-20">
      <h3 className="text-xl font-bold">
        {banners.length === 0 ? "Add" : "Edit"} homepage banner
      </h3>
      {banners.length === 0 && <AddBannerForm />}
      {banners && <EditBannerForm banner={banners[0]} />}
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
