import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      // File aliases
      '@types': 'src/utils/types.js',
      '@store': 'src/store.js',

      // Folder aliases
      '@components': 'src/components',
      '@utils': 'src/utils',
      '@gamefiles': 'src/game',
    },
  },
};

export default config;
