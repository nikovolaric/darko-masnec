"use client";

import { addAward } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

const input =
  "h-fit rounded-md border border-gray-300 px-4 py-1 drop-shadow-md";

function AddAwardForm() {
  return (
    <form className="flex flex-col gap-8" action={addAward}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Award title (if award)"
          name="awardTitle"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Year"
          name="year"
          required
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Festival"
          name="festival"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Festival location"
          name="location"
          required
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Type of festival"
          name="type"
          required
          autoComplete="off"
          className={input}
        />
      </div>
      <div className="self-end">
        <Button />
      </div>
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

export default AddAwardForm;
