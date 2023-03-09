/**
 * Simple module containing helper functions that can be used throughout the
 * project.
 *
 * Try to keep these functions fairly generic and avoid imports from other
 * project files.
 */

/**
 * Converts the number to the number with the ordinal suffix.
 *
 * @param {number} n - The provided number
 * @returns {string} - The number prepended to the ordinal suffix
 */
export function convertToOrdinal(n) {
  const ones = n % 10,
    tens = n % 100;
  if (ones == 1 && tens != 11) {
    return n + 'st';
  }
  if (ones == 2 && tens != 12) {
    return n + 'nd';
  }
  if (ones == 3 && tens != 13) {
    return n + 'rd';
  }
  return n + 'th';
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
 * NOTE: Keys in the updates object MUST exist in the original object and must
 *    be in the same nested structure. Mutates the original object.
 *
 * @param {object} originalObject
 * @param {object} updatesObject
 */
export const applyUpdates = (originalObject, updatesObject) => {
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
    } else {
      originalObject[key] = update;
    }
  }
};
