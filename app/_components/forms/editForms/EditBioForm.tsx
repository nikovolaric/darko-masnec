"use client";

import {
  editBio,
  signS3Image,
  signS3ImageToDelete,
  temporaryDeleteBioImage,
} from "@/app/_lib/actions";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

const input = "h-64 rounded-md border border-gray-300 px-4 py-1 drop-shadow-md";

function EditBioForm({
  bio,
}: {
  bio: { upperText: string; lowerText: string; image: string; _id: string };
}) {
  const { upperText, lowerText, image, _id } = bio;

  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string>(image);
  const [error, setError] = useState<string>("");

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

  async function handleClick(e: FormEvent) {
    e.preventDefault();
    setFile(undefined);
    setFileUrl("");

    if (fileUrl === image) {
      const deleteResult = await signS3ImageToDelete(image);
      if (deleteResult.success) {
        const { url: deleteUrl } = deleteResult.success;
        await fetch(deleteUrl, { method: "DELETE" });
        await temporaryDeleteBioImage(_id);
      } else {
        console.error("Failed to get delete URL");
        setError("An error occurred. Please try again later.");
      }
    }
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

      const data = await editBio(formData, _id);

      if (data) {
        setError(data);
        return;
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  }

  return (
    <form className="flex flex-col gap-8" action={handleAction}>
      <div className="grid grid-cols-2 gap-4">
        <textarea
          placeholder="Upper bio text"
          name="upperText"
          autoComplete="off"
          className={input}
          defaultValue={upperText}
        />
        <div />
        <textarea
          placeholder="Lower bio text"
          name="lowerText"
          autoComplete="off"
          className={input}
          defaultValue={lowerText}
        />
        <div />
        <input
          type="file"
          id="mainFile"
          hidden
          accept="image/*"
          onChange={handleChange}
        />
        {file && (
          <input type="text" name="image" defaultValue={file.name} hidden />
        )}
        <label
          htmlFor="mainFile"
          className={`bg-secondary text-neutral ${file ? "" : "hover:bg-primary"} h-fit w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-1 drop-shadow-md transition-colors duration-300`}
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
            "Upload bio image"
          )}
        </label>
      </div>
      {error && <div className="font-bold text-red-500">{error}</div>}
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

export default EditBioForm;
