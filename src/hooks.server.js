import { redirect } from '@sveltejs/kit';
import { Languages } from '$types';

/**
 * Server hooks, run before executing other server functions.
 *
 * Handles setting the language by (in order of precedence):
 * 1. Checking the URL query params (e.g. `...mit.edu?lang=en`)
 * 2. Getting the language from cookies
 * 3. Setting the default language to Spanish
 */
export async function handle({ event, resolve }) {
  const urlLanguage = event.url.searchParams.get('lang');
  const cookieLanguage = event.cookies.get('language');

  let language;

  // Language in the URL query params takes precedent
  if (urlLanguage) {
    // Validate the language
    if (!Object.values(Languages).includes(urlLanguage)) {
      console.error(`Got invalid query param lang=${urlLanguage}; redirecting to /`);
      throw redirect(303, '/');
      return;
    }

    console.log('Setting language cookie to', urlLanguage, 'from query params');
    event.cookies.set('language', urlLanguage);
    language = urlLanguage;
    // Next check if the user stored the language from cookies
  } else if (cookieLanguage) {
    console.log('Retrieved language', cookieLanguage, 'from cookies');
    language = cookieLanguage;
  } else {
    // Default is Spanish
    console.log('No language set, setting cookie to default Spanish');
    language = 'es';
    event.cookies.set('language', language);
  }

  console.debug('Transforming page chunk %lang% ->', language);
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', language),
  });
}
