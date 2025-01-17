/**
 * Sanitizes the given string - trimming leading and trailing whitespace
 * @function sanitizeString
 * @param {string} input - The input string to be sanitized.
 * @returns {string} the sanitized string.
 */

function sanitizeString(input) {
  if (input) {
    // trimming leading and trailing whitespace
    let sanitized = input.trim();

    return sanitized;
  }
  return input;
}

module.exports = sanitizeString;
