import cardDataEn from '$gameFiles/card-data.json';
import cardDataEs from '$gameFiles/card-data-es.json';
import assistancesEn from '$gameFiles/assistances.json';
import assistancesEs from '$gameFiles/assistances-es.json';
import migrantDataEn from '$gameFiles/migrant-data.json';
import migrantDataEs from '$gameFiles/migrant-data-es.json';
import jobsEn from '$gameFiles/jobs.json';
import jobsEs from '$gameFiles/jobs-es.json';

import { Languages } from '$types';

/**
 * Loads the layout data for the game aspect of the website.
 *
 * Loads the game files given the language setting to be used throughout the
 * game (e.g. `card-data.json` vs. `card-data-es.json`).
 */
export async function load({ parent }) {
  const { language } = await parent();

  let cardData, assistances, migrantData, jobsData;
  if (language === Languages.ENGLISH) {
    cardData = cardDataEn;
    assistances = assistancesEn;
    migrantData = migrantDataEn;
    jobsData = jobsEn;
  } else {
    cardData = cardDataEs;
    assistances = assistancesEs;
    migrantData = migrantDataEs;
    jobsData = jobsEs;
  }

  return { language, cardData, assistances, migrantData, jobsData };
}
