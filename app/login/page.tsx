import { Metadata } from "next";
import LoginForm from "../_components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export const dynamic = "force-dynamic";

async function Page() {
  return (
    <>
      <div className="bg-neutral">
        <LoginForm />
      </div>
    </>
  );
}

export default Page;
