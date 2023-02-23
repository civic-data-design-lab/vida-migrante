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
