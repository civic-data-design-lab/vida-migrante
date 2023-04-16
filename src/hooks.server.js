export async function handle({ event, resolve }) {
  let language = event.cookies.get('language');
  if (!language) {
    language = 'es';
  }
  console.debug('Transforming page chunk %lang% ->', language);
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', language),
  });
}
