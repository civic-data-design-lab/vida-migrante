import { Languages } from '$types';
import { DESCRIPTION } from '$lib/utils/seo.js';

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

  const seoProps = {
    metadescription: DESCRIPTION[language],
    ogLanguage: language,
    pageTitle: null,
    slug: '',
  };

  return { language, seoProps };
}
