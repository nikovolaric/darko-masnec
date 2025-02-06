"use client";

import { useFormStatus } from "react-dom";
import { useState } from "react";
import { login } from "@/app/_lib/actions";
import { EyeIcon } from "@heroicons/react/24/outline";

function LoginForm() {
  const [err, setErr] = useState("");
  const [isShown, setIsShown] = useState(false);

  async function clientAction(formData: FormData) {
    const result: { error?: string } = await login(formData);

    if (result?.error) {
      setErr(result.error);
    }
  }

  return (
    <form
      className="mx-auto flex h-dvh max-w-7xl flex-col gap-6 pt-20"
      action={clientAction}
    >
      <h2 className="font-raj text-2xl font-bold text-primary">Vpiši se!</h2>
      <div className="flex w-1/3 flex-col gap-1">
        <label>Username:</label>
        <input
          type="text"
          className="h-8 rounded-md px-3"
          name="username"
          required
          autoComplete="off"
        />
      </div>
      <div className="flex w-1/3 flex-col gap-1">
        <label>Geslo:</label>
        <div className="relative w-full">
          <input
            type={isShown ? "text" : "password"}
            className="h-8 w-full rounded-md px-3"
            name="password"
            required
            autoComplete="off"
          />
          <EyeIcon
            className="absolute right-2 top-1 h-6 hover:cursor-pointer"
            onClick={() => setIsShown((isShown) => !isShown)}
          />
        </div>
      </div>
      {err && <p className="font-bold text-red-400">{err}</p>}
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="hover:bg-accent w-28 rounded-lg bg-primary py-1 text-lg text-neutral transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400"
      disabled={pending}
    >
      {!pending ? "Vpiši se" : "..."}
    </button>
  );
}

export default LoginForm;
