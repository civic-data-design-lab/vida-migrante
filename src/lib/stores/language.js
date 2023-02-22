import { writable } from 'svelte/store';

function createLanguage() {
  const { subscribe, set, update } = writable('en');

  const toggleLanguage = () => {
    update((language) => (language === 'en' ? 'es' : 'en'));
  };

  return {
    subscribe,
    set,
    update,
    toggleLanguage,
  };
}

export const Language = createLanguage();
