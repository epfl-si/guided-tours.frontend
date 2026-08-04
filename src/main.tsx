import {createRoot} from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import {LocalStorageBackend, OIDCContext} from "@epfl-si/react-appauth";
import '@/lib/i18n';

const store = new LocalStorageBackend();
createRoot(document.getElementById('root')!).render(
  <OIDCContext
    authServerUrl={import.meta.env.GUIDED_TOURS_ENTRA_SERVER_URL ?? ''}
    client={{
      clientId: import.meta.env.GUIDED_TOURS_ENTRA_CLIENT_ID ?? '',
      scope: import.meta.env.GUIDED_TOURS_ENTRA_SCOPE,
      redirectUri: import.meta.env.GUIDED_TOURS_URL
    }}
    storage={store}
    refreshStorage={window.localStorage}
    onLogout={() => window.location.href=import.meta.env.GUIDED_TOURS_URL ?? ''}
  >
    <App />
  </OIDCContext>
)
