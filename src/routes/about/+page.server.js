import { Languages } from '$types';

export async function load({ parent }) {
  const { language, seoProps } = await parent();

  const pageSeoProps = {
    ...seoProps,
    pageTitle: language === Languages.ENGLISH ? 'About' : 'Acerca',
    slug: 'about',
  };

  return { language, seoProps: pageSeoProps };
}
