import { Languages } from '$types';

/**
 * Load function for the root layout.
 * Loads the language setting from the cookie.
 */
export async function load({ cookies }) {
  const languageCookie = cookies.get('language');

  let language = Languages.SPANISH;
  if (!languageCookie) {
    console.log('No language set! Defaulting to spanish...');
  } else {
    console.log('Retrieved language from cookie:', languageCookie);
    language = languageCookie;
  }

  return { language };
}
