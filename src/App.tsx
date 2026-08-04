import { useEffect, useState } from 'react'
import { StateEnum, useOpenIDConnectContext } from "@epfl-si/react-appauth";
import { Layout } from "@/components/Layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import type { UserType } from "@/types/user";
import Page from "@/pages/Page.tsx";
import { fetchConnectedUser } from '@/services/auth';
import Registration from '@/pages/registration';
import Admin from '@/pages/admin';
import { RequireAdmin } from '@/auth/RequireAdmin';

export default function App() {
  const oidc = useOpenIDConnectContext();
  const [connectedUser, setConnectedUser] = useState<UserType>({
    firstName: '',
    lastName: '',
    groups: [],
    username: '',
    isAdmin: false,
    isGuide: false,
  });

  useEffect(() => {
    if (oidc.state == StateEnum.LoggedIn) {
      loadFetch();
    }
  }, [oidc.accessToken, oidc.state]);

  const loadFetch = async () => {
    try {
      const data = await fetchConnectedUser();
      setConnectedUser({
        firstName: data.firstName,
        lastName: data.lastName,
        groups: data.groups,
        username: data.gaspar,
        isAdmin: data.isAdmin,
        isGuide: data.isGuide,
      });
    } catch (error) {
      console.log('ConnectedUser Error', error);
      oidc.logout();
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={connectedUser} oidc={oidc} />}>
            <Route path="/" element={<Page />} />
            <Route path="/:placeId/register" element={<Registration user={connectedUser} oidc={oidc} />} />
            <Route path="/:placeId/inscription" element={<Registration user={connectedUser} oidc={oidc} />} />
            <Route element={<RequireAdmin user={connectedUser} />}>
              // All routes that here require authentication
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
