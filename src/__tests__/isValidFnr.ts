import isValidFnr, { isDnumber } from '../isValidFnr';
import { validDnrs, validFnrs } from './fixtures/listOfValidFnr.json';

describe('isValidFnr', () => {
  it('Should be defined', () => {
    expect(isValidFnr).toBeDefined();
  });

  it('Should have exactly 11 ciphers as input', () => {
    expect(() => isValidFnr('1234455670')).toThrowError('Fødselsnummer should only have 11 ciphers');
    expect(() => isValidFnr('   12344556701    ')).not.toThrowError('Fødselsnummer should only have 11 ciphers');
  });

  it('Should return a boolean', () => {
    expect(typeof isValidFnr('02072627175')).toBe('boolean');
  });

  it('Should return truthy for valid fnr', () => {
    expect(validFnrs.every(isValidFnr)).toBe(true);
  });

  it('Should return truthy for valid dnr', () => {
    expect(validDnrs.every(isValidFnr)).toBe(true);
  });
});

describe('isDNumber', () => {
  it('Should return true if the fnr provided is Dnumber', () => {
    expect(isDnumber(validDnrs[0])).toBe(true);
  });
});
