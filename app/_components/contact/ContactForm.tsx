"use client";

import { sendMail } from "@/app/_lib/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function ContactForm() {
  const [message, setMessage] = useState("");

  async function handleAction(formData: FormData) {
    const result = await sendMail(formData);
    if (result.includes("Ok")) {
      setMessage("Mail sent successfully");
    } else {
      setMessage("Something went wrong. Try again later");
    }
  }

  return (
    <div className="flex flex-col gap-5 tracking-more lg:mx-auto lg:w-1/2 lg:gap-9">
      <h3 className="text-xl lg:text-2xl">Contact me</h3>
      <form className="flex flex-col gap-4" action={handleAction}>
        <input
          type="text"
          placeholder="Name:*"
          required
          autoComplete="off"
          name="name"
          className="rounded-sm border border-secondary bg-[#DDDEDF] px-4 py-0.5 text-lg"
        />
        <input
          type="text"
          placeholder="Email:*"
          required
          autoComplete="off"
          name="mail"
          className="rounded-sm border border-secondary bg-[#DDDEDF] px-4 py-0.5 text-lg"
        />
        <textarea
          placeholder="Message:*"
          required
          autoComplete="off"
          name="message"
          className="h-80 rounded-sm border border-secondary bg-[#DDDEDF] px-4 py-0.5 text-lg"
        />
        <p>Our privacy policy applies.</p>
        {message && <p>{message}</p>}
        <div className="self-end">
          <Button />
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded-md bg-secondary px-5 py-0.5 text-neutral transition-colors duration-300 hover:bg-primary disabled:cursor-not-allowed disabled:bg-gray-500"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

export default ContactForm;
