import { useTranslation } from 'react-i18next';

export default function Page() {
    const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
    </div>
  );
}   