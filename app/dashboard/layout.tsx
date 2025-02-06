import { ReactNode } from "react";
import { checkForCookies } from "../_config/checkCookies";

async function Layout({ children }: { children: ReactNode }) {
  await checkForCookies();
  return <>{children}</>;
}

export default Layout;
