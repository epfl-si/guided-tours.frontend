import { useTranslation } from 'react-i18next';
import RegistrationForm from '@/components/parts/RegistrationForm.tsx';
import { useParams, Link } from 'react-router';
import type {UserType} from "@/lib/types.tsx";
import type {State} from "@epfl-si/react-appauth";
import { fetchVisitTitle } from '@/lib/api';

export default function Registration({ user: _user, oidc: _oidc }: { user: UserType, oidc: State }) {
  const { t } = useTranslation();
  const { idVisit } = useParams<{ idVisit: string }>();
  // TODO: to retrieve the title of the visite from the backend with the idVisit
//   const visitTitle = await fetchVisitTitle(
//     import.meta.env.GUIDED_TOURS_REACT_APP_BACKEND_ENDPOINT_URL,
//     oidc.accessToken,
//     idVisit
//   );

  if (!idVisit) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{idVisit}</h1>
      <RegistrationForm oidc={_oidc} user={_user} idVisit={idVisit} />
    </div>
  );
}
