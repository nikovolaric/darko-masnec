"use client";

import { editProject, signS3Image } from "@/app/_lib/actions";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

const input =
  "h-fit rounded-md border border-gray-300 px-4 py-1 drop-shadow-md";

function EditPaintingForm({
  project,
}: {
  project: { _id: string; title: string; year: string; mainImage: string };
}) {
  const { _id, title, year, mainImage } = project;

  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string>(mainImage);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const eFile = e.target.files?.[0];
    setFile(eFile);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (eFile) {
      setFileUrl(URL.createObjectURL(eFile));
    }
  }

  function handleClick(e: FormEvent) {
    e.preventDefault();
    setFile(undefined);
    setFileUrl("");
  }

  async function handleAction(formData: FormData) {
    try {
      if (file) {
        const result = await signS3Image(file.name);
        const { url } = result.success;

        await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
      }

      await editProject(formData, "painting", _id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex flex-col gap-8" action={handleAction}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          autoComplete="off"
          className={input}
          defaultValue={title}
        />
        <input
          type="text"
          placeholder="Year"
          name="year"
          autoComplete="off"
          className={input}
          defaultValue={year}
        />
        <input
          type="file"
          id="mainFile"
          hidden
          accept="image/*"
          onChange={handleChange}
        />
        {file && (
          <input type="text" name="mainImage" defaultValue={file.name} hidden />
        )}
        <label
          htmlFor="mainFile"
          className={`bg-secondary text-neutral ${fileUrl ? "" : "hover:bg-primary"} h-fit w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-1 drop-shadow-md transition-colors duration-300`}
        >
          {fileUrl ? (
            <div className="flex items-center gap-8">
              <Image
                src={
                  file
                    ? fileUrl
                    : `https://drmasnec.s3.eu-central-1.amazonaws.com/${fileUrl}`
                }
                alt="file"
                width={100}
                height={150}
                className="h-32 w-auto object-cover"
              />
              <button
                onClick={handleClick}
                className="h-fit w-fit cursor-pointer rounded-md border border-gray-300 bg-secondary px-4 py-1 text-neutral drop-shadow-md transition-colors duration-300 hover:bg-primary"
              >
                Remove
              </button>
            </div>
          ) : (
            "Upload painting"
          )}
        </label>
      </div>
      {fileUrl && (
        <div className="self-end">
          <Button />
        </div>
      )}
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-fit self-end rounded-lg bg-primary px-10 py-1 text-neutral transition-colors duration-150 hover:bg-secondary disabled:cursor-not-allowed disabled:bg-gray-400"
      disabled={pending}
    >
      {pending ? "Posting...." : "Post"}
    </button>
  );
}

export default EditPaintingForm;
