import { redirect } from 'next/navigation';
import { i18n } from '../i18n-config';

export default function Home() {
  // Redirect to the default locale
  redirect(`/${i18n.defaultLocale}`);
  return null;
}
