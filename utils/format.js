export function formatHash(hash) {
  return hash.substr(0, 4) + "..." + hash.substr(-4, 4);
}
