/* eslint-disable max-len */
// Algorithm based upon this: https://no.wikipedia.org/wiki/F%C3%B8dselsnummer
import checkValidFødselsdato from './util/date';

function calculateControlCiphers([d1, d2, m1, m2, å1, å2, i1, i2, i3]: number[]) {
  const getControlCipher = (controlCipherBase: number) => {
    const controlCipher = controlCipherBase % 11 === 0 ? 0 : 11 - (controlCipherBase % 11);
    return controlCipher;
  };
  const K1_BASE_CALCULATION = (3 * d1 + 7 * d2 + 6 * m1 + 1 * m2 + 8 * å1 + 9 * å2 + 4 * i1 + 5 * i2 + 2 * i3);
  const k1 = getControlCipher(K1_BASE_CALCULATION);
  const K2_BASE_CALCULATION = (5 * d1 + 4 * d2 + 3 * m1 + 2 * m2 + 7 * å1 + 6 * å2 + 5 * i1 + 4 * i2 + 3 * i3 + 2 * k1);
  const k2 = getControlCipher(K2_BASE_CALCULATION);
  return { k1, k2 };
}

export function generateControlCiphers(baseFnr: string): number {
  if (typeof baseFnr !== 'string') {
    throw new Error('Input must be a string');
  }

  if (baseFnr.trim().length !== 9) {
    throw new Error('baseFnr should only be 9 ciphers');
  }

  const base = baseFnr.trim().split('').map((num) => parseInt(num, 10));
  const { k1, k2 } = calculateControlCiphers(base);
  return k1 > 9 || k2 > 9 ? -1 : parseInt(`${k1}${k2}`, 10);
}

export const isDnumber = (fnr: string): boolean => fnr.slice(0, 1) >= '4';

export default function isValidFnr(fnr: string): boolean {
  if (typeof fnr !== 'string') {
    throw new Error('Input must be a string');
  }

  if (fnr.trim().length !== 11) {
    throw new Error('Fødselsnummer should only have 11 ciphers');
  }
  const fnrToCheck = fnr.trim();
  checkValidFødselsdato(fnrToCheck, isDnumber(fnrToCheck));
  const controlCiphersToCheck = parseInt(fnrToCheck.slice(9), 10);
  const baseFnr = fnrToCheck.slice(0, 9);
  const generatedControlCiphers = generateControlCiphers(baseFnr);
  return generatedControlCiphers < 0 ? false : controlCiphersToCheck === generatedControlCiphers;
}
