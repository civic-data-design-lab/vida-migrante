import { Languages } from '$types';
import { DESCRIPTION } from '$lib/utils/seo.js';

/**
 * Load function for the root layout.
 * Loads the language setting from the cookie.
 */
export async function load({ cookies }) {
  // Set by `hooks.server.js`
  const language = cookies.get('language');

  const seoProps = {
    metadescription: DESCRIPTION[language],
    ogLanguage: language,
    pageTitle: 'Vida Migrante',
    slug: '/',
  };

  return { language, seoProps };
}
