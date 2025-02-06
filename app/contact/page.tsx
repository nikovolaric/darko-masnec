import type { Metadata } from "next";
import Header from "../_components/Header";
import ContactForm from "../_components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

function Page() {
  return (
    <>
      <Header />
      <main className="mt-16 lg:mt-32">
        <ContactForm />
      </main>
    </>
  );
}

export default Page;
