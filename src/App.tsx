import {useEffect, useState} from 'react'
import {StateEnum, useOpenIDConnectContext} from "@epfl-si/react-appauth";
import {Layout} from "@/components/layout/Layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import type {UserType} from "@/lib/types.tsx";
import Page from "@/components/pages/Page.tsx";
import {fetchConnectedUser} from './lib/api';
import Registration from './components/pages/registration';
import Admin from './components/pages/admin';
import { RequireAdmin } from './components/auth/RequireAdmin';

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
      const data = await fetchConnectedUser(
        import.meta.env.GUIDED_TOURS_REACT_APP_BACKEND_ENDPOINT_URL,
        oidc.accessToken
      );
      setConnectedUser({
        firstName: data.firstName,
        lastName: data.lastName,
        groups: data.groups,
        username: data.gaspar,
        isAdmin: true,
        isGuide: true
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
