/**
 * Simple module containing helper functions that can be used throughout the
 * project.
 *
 * Try to keep these functions fairly generic and avoid imports from other
 * project files.
 */

/**
 * Gets the number's ordinal suffix.
 *
 * Example: `getOrdinalSuffix(3) -> "rd"`
 *
 * @param {number} n - The provided number
 * @returns {string} The ordinal suffix
 */
export function getOrdinalSuffix(n) {
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
    } else if (typeof update === 'string' && update.startsWith('!')) {
      const setValue = parseInt(update.substring(1));
      originalObject[key] = setValue;
    } else {
      originalObject[key] = update;
    }
  }
};

/**
 * Sums the values in the provided object (applies `+` operator).
 *
 * @param {object | undefined} obj - The object, values must be addable.
 * @return {any} The added values, or undefined if the object is undefined.
 */
export const sumValues = (obj) => {
  if (!obj) {
    return;
  }
  return Object.values(obj).reduce((a, b) => a + b, 0);
};
