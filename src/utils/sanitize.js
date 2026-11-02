export function sanitizeInput(input, maxLength = 60) {
  if (typeof input !== 'string') return '';

  return input
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function isValidArticle(input) {
  if (!input || typeof input !== 'string') return false;
  const sanitized = sanitizeInput(input);
  return sanitized.length > 0 && sanitized.length <= 60;
}
