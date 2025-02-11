"use client";
import { deleteWorkInProgress, signS3ImageToDelete } from "@/app/_lib/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";

function DashboardInProgressItem({
  project,
}: {
  project: {
    description: string;
    _id: string;
    imgs: string[];
  };
}) {
  const pathname = usePathname();
  const { description, _id, imgs } = project;

  return (
    <div className="flex items-center justify-between border-b border-primary py-4">
      <p className="text-xl">
        <span className="font-bold">{description}</span>
      </p>
      <div className="flex items-center gap-6">
        <Link
          href={`${pathname}/${_id}`}
          className="mx-auto mt-4 rounded-md bg-primary px-2 py-1 text-neutral transition-colors duration-300 hover:bg-secondary hover:text-white"
        >
          Edit
        </Link>
        <DeleteProject id={_id} imgs={imgs} />
      </div>
    </div>
  );
}

function DeleteProject({ id, imgs }: { id: string; imgs: string[] }) {
  const { pending } = useFormStatus();

  async function handleAction(formData: FormData) {
    if (imgs.length > 0) {
      imgs.forEach(async (img) => {
        const imgResult = await signS3ImageToDelete(img);
        if (imgResult.success) {
          const { url } = imgResult.success;
          await fetch(url, { method: "DELETE" });
        }
      });
    }

    await deleteWorkInProgress(formData, id);
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

export default DashboardInProgressItem;
