export const formatNumber = (number, separator = ' ') => {
  return String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1' + separator);
}