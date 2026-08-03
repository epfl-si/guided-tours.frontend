import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";
import { Outlet } from "react-router";
import type { UserType } from "@/types/user";
import type { State } from "@epfl-si/react-appauth";

export const Layout = ({ user, oidc }: { user: UserType, oidc: State }) => {

  return (
    <main className="flex flex-col h-screen">
      <Header user={user} onLogin={() => oidc.login()}
              onLogout={() => oidc.logout()}/>
      <div className="p-4 sm:p-8 w-full 2xl:max-w-[90%] 3xl:max-w-[80%] mx-auto flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
