import {useEffect, useState} from 'react'
import {StateEnum, useOpenIDConnectContext} from "@epfl-si/react-appauth";
import {Layout} from "@/components/layout/Layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {RequireAuth} from "@/components/auth/RequireAuth.tsx";
import type {UserType} from "@/lib/types.tsx";
import Page from "@/components/pages/Page.tsx";
import {fetchConnectedUser} from './lib/api';

export default function App() {
  const oidc = useOpenIDConnectContext();
  const [connectedUser, setConnectedUser] = useState<UserType>({
    groups: [],
    username: '',
    isAdmin: false,
    isReadOnly: false
  });
  // const [connectedUser, setConnectedUser] = useState<UserType>({
  //   groups: ["test"],
  //   username: 'testuser',
  //   isAdmin: true,
  //   isReadOnly: false
  // });

  useEffect(() => {
    if (oidc.state == StateEnum.LoggedIn) {
      loadFetch();
    }
  }, [oidc.accessToken, oidc.state]);

  const loadFetch = async () => {
    const results = await fetchConnectedUser(
      import.meta.env.GUIDED_TOURS_REACT_APP_BACKEND_ENDPOINT_URL,
      oidc.accessToken
    );
    if (results.status === 200 && results.data) {
      console.log('ConnectedUser', results.data);
      setConnectedUser(results.data);
    } else {
      console.log('ConnectedUser Error', results);
      oidc.logout();
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={connectedUser} oidc={oidc} />}>
            <Route path="/" element={<Page />} />
            <Route element={<RequireAuth oidc={oidc} />}>
              // All routes that here require authentication
              <Route path="/backoffice" element={<Page />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
