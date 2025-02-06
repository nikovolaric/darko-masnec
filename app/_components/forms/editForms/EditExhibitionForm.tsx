"use client";

import { editExhibition } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

const input =
  "h-fit rounded-md border border-gray-300 px-4 py-1 drop-shadow-md";

function EditExhibitionForm({
  exhibition,
}: {
  exhibition: {
    exhibitionName: string;
    duration: string;
    role?: string;
    groupSolo: string;
    location: string;
    type: string;
    _id: string;
  };
}) {
  const { exhibitionName, duration, role, groupSolo, location, type, _id } =
    exhibition;

  return (
    <form
      className="flex flex-col gap-8"
      action={(formdata: FormData) => editExhibition(formdata, _id)}
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Exhibition name"
          name="exhibitionName"
          autoComplete="off"
          className={input}
          defaultValue={exhibitionName}
        />
        <input
          type="text"
          placeholder="Duration or year"
          name="duration"
          required
          autoComplete="off"
          className={input}
          defaultValue={duration}
        />
        <input
          type="text"
          placeholder="Type of exhibition (group or solo exhibition)-if exhibition"
          name="groupSolo"
          autoComplete="off"
          className={input}
          defaultValue={groupSolo}
        />
        <input
          type="text"
          placeholder="Role - if collaboration,project or workshop"
          name="role"
          autoComplete="off"
          className={input}
          defaultValue={role}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
          autoComplete="off"
          className={input}
          defaultValue={location}
        />
        <select name="type" required className={input} defaultValue={type}>
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

export default EditExhibitionForm;
