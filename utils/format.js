export function formatHash(hash, length = 8) {
  return hash.substr(0, length) + "..." + hash.substr(-length, length);
}

export function formatNumber(number, minFractionDigits = 2) {
  return number.toLocaleString(
    undefined, // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: minFractionDigits }
  );
}
