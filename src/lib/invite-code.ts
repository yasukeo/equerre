/** No I, O, 0 or 1: nothing a student can misread when copying a code from a phone. */
export const INVITE_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const INVITE_CODE_PATTERN = /^[A-HJ-NP-Z2-9]{8}$/;

type RandomBytes = (size: number) => Uint8Array;

const cryptoRandom: RandomBytes = (size) => crypto.getRandomValues(new Uint8Array(size));

export function generateInviteCode(randomBytes: RandomBytes = cryptoRandom): string {
  // 32 symbols divide 256 evenly, so reducing each byte modulo 32 introduces no bias.
  return Array.from(randomBytes(8), (byte) => INVITE_CODE_ALPHABET.charAt(byte % 32)).join("");
}
