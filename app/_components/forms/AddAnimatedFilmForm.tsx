"use client";

import { createProject, signS3Image } from "@/app/_lib/actions";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

const input =
  "h-fit rounded-md border border-gray-300 px-4 py-1 drop-shadow-md";

function AddAnimatedFilmForm() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [imgsFiles, setImgsFiles] = useState<File[] | undefined>(undefined);

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

  function handleMultipleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImgsFiles([...e.target.files]);
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

      await createProject(formData, "animated film");
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
        />
        <input
          type="text"
          placeholder="Year"
          name="year"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Original title"
          name="originalTitle"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Director"
          name="director"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Scriptwriters"
          name="scriptwriters"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Animation"
          name="animation"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Music"
          name="music"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Sound"
          name="sound"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Editing"
          name="editing"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Compositing"
          name="compositing"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Producer"
          name="producer"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Duration"
          name="duration"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Aspect ratio"
          name="aspectRatio"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Technique"
          name="technique"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Link"
          name="link"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Distribution link"
          name="distributionLink"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Voice acting"
          name="voiceActing"
          autoComplete="off"
          className={input}
        />
        <textarea
          placeholder="Description"
          name="description"
          className={input}
          required
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
          <input type="text" name="mainImage" defaultValue={file.name} hidden />
        )}
        <label
          htmlFor="mainFile"
          className={`bg-secondary text-neutral ${file ? "" : "hover:bg-primary"} h-fit w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-1 drop-shadow-md transition-colors duration-300`}
        >
          {file ? (
            <div className="flex items-center gap-8">
              <Image
                src={fileUrl}
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
            "Upload main image"
          )}
        </label>
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
            : "Upload other images"}
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
      {file && (
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

export default AddAnimatedFilmForm;
