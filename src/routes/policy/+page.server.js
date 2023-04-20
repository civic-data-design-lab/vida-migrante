import { Languages } from '$types';

export async function load({ parent }) {
  const { language, seoProps } = await parent();

  const pageSeoProps = {
    ...seoProps,
    pageTitle:
      language === Languages.ENGLISH ? 'Policy Recommendations' : 'Recomendaciones Políticas',
    slug: 'policy',
  };

  return { language, seoProps: pageSeoProps };
}
