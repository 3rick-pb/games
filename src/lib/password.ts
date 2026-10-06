export function generatePassword(length: number, options: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string {
  const pools = [
    options.upper ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "",
    options.lower ? "abcdefghijkmnopqrstuvwxyz" : "",
    options.numbers ? "23456789" : "",
    options.symbols ? "!@#$%*?_-" : ""
  ].filter(Boolean);
  const alphabet = pools.join("");
  if (!alphabet || length < 1) return "";
  const limit = 256 - (256 % alphabet.length);
  let password = "";
  while (password.length < length) {
    const bytes = new Uint8Array(Math.max(32, length - password.length));
    crypto.getRandomValues(bytes);
    for (const byte of bytes) {
      if (byte < limit) password += alphabet[byte % alphabet.length];
      if (password.length === length) break;
    }
  }
  return password;
}
