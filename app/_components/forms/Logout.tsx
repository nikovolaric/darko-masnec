"use client";

import { logout } from "@/app/_lib/actions";

function Logout() {
  return (
    <form action={logout} className="mt-20 text-right">
      <button className="rounded bg-primary px-3 py-1.5 uppercase text-neutral transition-colors duration-200 hover:bg-secondary">
        Logout
      </button>
    </form>
  );
}

export default Logout;
