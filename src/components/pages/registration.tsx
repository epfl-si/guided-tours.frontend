import RegistrationForm from '@/components/parts/RegistrationForm';
import { useParams } from 'react-router';
import type {PlaceInformationType, UserType} from "@/lib/types.tsx";
import type {State} from "@epfl-si/react-appauth";
import { useState,useEffect } from 'react';


export default function Registration({ user: _user, oidc:_oidc }: { user: UserType, oidc: State }) {
  const { placeId: placeIdString } = useParams<{ placeId: string }>();
  const [visitInformation, setVisitInformation] = useState<PlaceInformationType|null>(null);
 

  // TODO: to retrieve the title of the visite from the backend with the idVisit
  useEffect(() => {
    if (!placeIdString) return;

    const fetchVisit = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.GUIDED_TOURS_REACT_APP_BACKEND_ENDPOINT_URL}/api/${placeIdString}/details`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch visit details");
        }

        const data: PlaceInformationType = await response.json();
        setVisitInformation(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVisit();
  }, [placeIdString]);

  if (!placeIdString || !visitInformation) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{visitInformation?.title.EN}
      </h1>
      <RegistrationForm  information={visitInformation} />
    </div>
  );
}
