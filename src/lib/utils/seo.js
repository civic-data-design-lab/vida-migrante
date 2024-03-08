import { Languages } from './types';
import previewImage from '$images/preview-image.png';
import previewImageSquare from '$images/preview-image-square.jpg';

export const SITE_TITLE = 'Vida Migrante';
export const SITE_URL = 'https://vidamigrante.migration.mit.edu';

export const TWITTER_HANDLE = '@CivicDataDesign';

export const AUTHOR = 'Civic Data Design Lab';

export const DESCRIPTION = {
  [Languages.ENGLISH]: `Vida Migrante: Venezuelan Migrants Inclusion in Ecuador is a research project analyzing the food security, economic conditions, trade-offs and inclusion of recent Venezuelan migrants in Ecuador.`,
  [Languages.SPANISH]: `Vida Migrante: Inclusión de Migrantes Venezolanos en Ecuador es un proyecto de investigación que analiza la seguridad alimentaria, condiciones económicas, ingresos e inclusión de migrantes venezolanos recientes en Ecuador.`,
};

export const PREVIEW_IMAGE = {
  src: previewImage,
  width: 770,
  height: 576,
  alt: 'Image of life event card during the game',
};

export const PREVIEW_IMAGE_SQUARE = {
  src: previewImageSquare,
  width: 828,
  height: 828,
  alt: 'Square image of front page and website title',
};
