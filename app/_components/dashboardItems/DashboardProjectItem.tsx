"use client";
import { deleteProject, signS3ImageToDelete } from "@/app/_lib/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";

function DashboardProjectItem({
  project,
}: {
  project: {
    title: string;
    year?: number;
    _id: string;
    mainImage: string;
    imgs: string[];
  };
}) {
  const pathname = usePathname();
  const { title, year, _id, mainImage, imgs } = project;

  return (
    <div className="flex items-center justify-between border-b border-primary py-4">
      <p className="text-xl">
        <span className="font-bold">{title}</span>
        {year && `, (${year})`}
      </p>
      <div className="flex items-center gap-6">
        <Link
          href={`${pathname}/${_id}`}
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          Edit
        </Link>
        <DeleteProject id={_id} mainImage={mainImage} imgs={imgs} />
      </div>
    </div>
  );
}

function DeleteProject({
  id,
  mainImage,
  imgs,
}: {
  id: string;
  mainImage: string;
  imgs: string[];
}) {
  const { pending } = useFormStatus();

  async function handleAction(formData: FormData) {
    const result = await signS3ImageToDelete(mainImage);

    if (result.success) {
      const { url } = result.success;
      await fetch(url, { method: "DELETE" });
    }

    if (imgs.length > 0) {
      imgs.forEach(async (img) => {
        const imgResult = await signS3ImageToDelete(img);
        if (imgResult.success) {
          const { url } = imgResult.success;
          await fetch(url, { method: "DELETE" });
        }
      });
    }

    await deleteProject(formData, id);
  }

  return (
    <form action={handleAction}>
      <button
        className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        disabled={pending}
      >
        {pending ? <ArrowPathIcon className="h-4 animate-spin" /> : "Delete"}
      </button>
    </form>
  );
}

export default DashboardProjectItem;
