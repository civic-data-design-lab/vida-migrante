/**
 * Simple module containing helper functions that can be used throughout the
 * project.
 *
 * Try to keep these functions fairly generic and avoid imports from other
 * project files.
 */

import { Languages } from './types';

/**
 * Gets the number's ordinal suffix.
 *
 * Example: `getOrdinalSuffix(3) -> "rd"`
 *
 * Note: Supports only numbers 1-4 in Spanish. Assumes masculine (cuarto ->
 *  'to', segundo -> 'do')
 *
 *
 * @param {number} n - The provided number
 * @param {object} [config] - Optional configuration object
 * @param {string} config.language - The language to get the suffix in (en/es)
 * @returns {string} The ordinal suffix
 */
export function getOrdinalSuffix(n, config) {
  if (config && config.language === Languages.SPANISH) {
    if (n <= 0 || n > 4) {
      console.warn('only supports numbers between 1-4');
      return '';
    }
    switch (n) {
      case 1:
      case 3:
        return 'er';
      case 2:
        return 'do';
      case 4:
        return 'to';
    }
  }

  const ones = n % 10,
    tens = n % 100;
  if (ones == 1 && tens != 11) {
    return 'st';
  }
  if (ones == 2 && tens != 12) {
    return 'nd';
  }
  if (ones == 3 && tens != 13) {
    return 'rd';
  }
  return 'th';
}

/**
 * Safely parses a JSON string.
 *
 * @param {string} json - The JSON string to parse
 * @param {any} defaultOnError - The default value to return if there is an
 *    error during parsing.
 */
export function parseJSONSafe(json, defaultOnError) {
  try {
    const res = JSON.parse(json);
    return res;
  } catch (e) {
    console.warn('Could not parse JSON, returning the default:', e);
    return defaultOnError;
  }
}

/**
 * Deep copies an object.
 *
 * @param {object} obj - The object to deep copy
 * @return {object} The copied object
 */
export function deepCopy(obj) {
  return structuredClone(obj);
}

/**
 * Applies the updates from the updates object to the original object.
 *
 * Applies updates as deltas; for example, an original object with `{k: 5}`
 * getting applied with update `{k: 10}` becomes `{k: 15}` (`5+10`). For lists,
 * the update list is concatenated to the original list. Any other types are
 * replaced entirely.
 *
 * NOTE: Keys in the updates object MUST exist in the original object and must
 *    be in the same nested structure. Mutates the original object.
 *
 * NOTE: To set a specific numeric value instead of providing a delta, use a
 *    string prefixed by `"!"`. For example, to reset a numeric value to 0, use
 *    `{"value": "!0"}` in the updates object. Currently only supports integers.
 *
 * @param {object} originalObject
 * @param {object} updatesObject
 */
export function applyUpdates(originalObject, updatesObject) {
  for (let key in updatesObject) {
    const update = updatesObject[key];
    if (Array.isArray(update)) {
      // Concatenate the new array to the old array
      originalObject[key] = originalObject[key].concat(update);
    } else if (typeof update === 'number') {
      // Add the delta to the original value
      originalObject[key] += update;
    } else if (typeof update === 'object') {
      // Recurse for nested values
      applyUpdates(originalObject[key], update);
    } else if (typeof update === 'string' && update.startsWith('!')) {
      const setValue = parseInt(update.substring(1));
      originalObject[key] = setValue;
    } else {
      originalObject[key] = update;
    }
  }
}

/**
 * Sums the values in the provided object (applies `+` operator).
 *
 * @param {object | undefined} obj - The object, values must be addable.
 * @return {any} The added values, or undefined if the object is undefined.
 */
export function sumValues(obj) {
  if (!obj) {
    return;
  }
  return Object.values(obj).reduce((a, b) => a + b, 0);
}

/**
 * Gets whether or not an entity is food secure.
 *
 * @param {number} totalExpenses - Total household expenses
 * @param {number} householdSize - Household size
 * @param {string} copingLevel - The coping level (see `$types.CopingLevels`)
 * @returns {boolean} True if the given data results in a status of "food
 *  secure", false otherwise.
 */
export function isFoodSecure(totalExpenses, householdSize, copingLevel) {
  const perCapitaExpense = totalExpenses / householdSize;
  let ecmen = 1;
  if (perCapitaExpense < 188) {
    ecmen = 4;
  }
  const copingStrategy = !copingLevel ? 1 : 2;
  const meanCopingECMEN = (ecmen + copingStrategy) / 2;
  const CARI_ECMEN = Math.floor(Math.round((meanCopingECMEN + 2) / 2));

  if (CARI_ECMEN === 1 || CARI_ECMEN === 2) return true;
  return false;
}

/**
 * Creates a promise that resolves after a certain delay.
 *
 * @param {number} durationMs - Amount of time to delay
 * @returns {Promise} A promise that completes after the given duration
 */
export function delay(durationMs) {
  console.debug(`Delaying for ${durationMs} ms`);
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}
