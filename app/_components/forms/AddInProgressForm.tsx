"use client";

import { createWorkInProgress, signS3Image } from "@/app/_lib/actions";
import { ChangeEvent, useState } from "react";
import { useFormStatus } from "react-dom";

const input =
  "h-fit rounded-md border border-gray-300 px-4 py-1 drop-shadow-md";

function AddInProgressForm() {
  const [imgsFiles, setImgsFiles] = useState<File[] | undefined>(undefined);
  const [error, setError] = useState<string>("");

  function handleMultipleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImgsFiles([...e.target.files]);
    }
  }

  async function handleAction(formData: FormData) {
    try {
      if (imgsFiles) {
        imgsFiles.forEach(async (file) => {
          const result = await signS3Image(file.name);
          const { url } = result.success;

          await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });
        });
      }

      const data = await createWorkInProgress(formData);

      if (data) {
        setError(data);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex flex-col gap-8" action={handleAction}>
      <div className="grid grid-cols-2 gap-4">
        <textarea
          placeholder="Description"
          name="description"
          className={input}
          required
        />
        <div />
        <input
          type="file"
          id="otherFiles"
          multiple
          hidden
          accept="image/*"
          onChange={handleMultipleChange}
        />
        <label
          htmlFor="otherFiles"
          className="h-fit w-fit cursor-pointer rounded-md border border-gray-300 bg-secondary px-4 py-1 text-neutral drop-shadow-md transition-colors duration-300 hover:bg-primary"
        >
          {imgsFiles
            ? `${imgsFiles.length} imges waiting to be uploaded`
            : "Upload images"}
        </label>
        {imgsFiles &&
          imgsFiles.map((img: { name: string }, i: number) => (
            <input
              key={(i + 1) * 10}
              name="imgs"
              defaultValue={img.name}
              hidden
            />
          ))}
      </div>
      {error && <div className="font-bold text-red-500">{error}</div>}
      {imgsFiles && (
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

export default AddInProgressForm;
