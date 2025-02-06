"use client";

import { addExhibition } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

const input =
  "h-fit rounded-md border border-gray-300 px-4 py-1 drop-shadow-md";

function AddExhibitionForm() {
  return (
    <form className="flex flex-col gap-8" action={addExhibition}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Exhibition name"
          name="exhibitionName"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Duration or year"
          name="duration"
          required
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Type of exhibition (group or solo exhibition)-if exhibition"
          name="groupSolo"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Role - if collaboration,project or workshop"
          name="role"
          autoComplete="off"
          className={input}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
          autoComplete="off"
          className={input}
        />
        <select name="type" required className={input}>
          <option value="solo">Exhibition</option>
          <option value="collab">Collaborations, project, workshops</option>
        </select>
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

export default AddExhibitionForm;
