import path from 'node:path';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      // File aliases
      $types: path.resolve('./src/lib/utils/types.js'),
      $gameData: path.resolve('./src/lib/stores/gameData.js'),

      // Folder aliases
      $components: path.resolve('./src/lib/components'),
      $utils: path.resolve('./src/lib/utils'),
      $gameFiles: path.resolve('./src/lib/assets/game-files'),
      $images: path.resolve('./src/lib/assets/images'),
    },
  },
};

export default config;
