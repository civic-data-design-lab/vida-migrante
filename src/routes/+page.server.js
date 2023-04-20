/**
 * Defines the server-side actions of the page.
 */

import { redirect } from '@sveltejs/kit';
import { YEAR } from '$types';

export const actions = {
  /**
   * Handles POST requests to `setLanguage` endpoint
   *
   * Stores the requested language setting as a cookie 🍪
   * Adapted from https://www.youtube.com/watch?v=3GpZkVBjXfE
   */
  setLanguage: async ({ url, cookies }) => {
    const language = url.searchParams.get('language');
    const redirectTo = url.searchParams.get('redirectTo');

    if (language) {
      cookies.set('language', language, {
        path: '/',
        maxAge: YEAR,
      });
    }

    throw redirect(303, redirectTo ?? '/');
  },
};
