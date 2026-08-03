import {createRoot} from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import {LocalStorageBackend, OIDCContext} from "@epfl-si/react-appauth";
import '@/lib/i18n';

const store = new LocalStorageBackend();
createRoot(document.getElementById('root')!).render(
  <OIDCContext
    authServerUrl={import.meta.env.GUIDED_TOURS_REACT_APP_AUTH_SERVER_URL ?? ''}
    client={{
      clientId: import.meta.env.GUIDED_TOURS_OIDC_CLIENT_ID ?? '',
      scope: import.meta.env.GUIDED_TOURS_OIDC_SCOPE,
      redirectUri: import.meta.env.GUIDED_TOURS_REACT_APP_HOMEPAGE_URL
    }}
    storage={store}
    refreshStorage={window.localStorage}
    onLogout={() => window.location.href=import.meta.env.GUIDED_TOURS_REACT_APP_HOMEPAGE_URL ?? ''}
  >
    <App />
  </OIDCContext>
)
