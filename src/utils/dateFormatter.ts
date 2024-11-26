/**
 * Formats a Date object using the following format: MM/dd/yyyy
 * @example dateFormatter.format(new Date()) => 01/01/2024
 */
export const dateFormatter = Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
