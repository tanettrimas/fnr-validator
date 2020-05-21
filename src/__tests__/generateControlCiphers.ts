import { generateControlCiphers } from '../isValidFnr';

describe('generateControlCiphers', () => {
  it('Should be defined', () => {
    expect(generateControlCiphers).toBeDefined();
  });

  it('Should have exactly 9 ciphers as input', () => {
    expect(() => generateControlCiphers('1234455670')).toThrowError('baseFnr should only be 9 ciphers');
    expect(() => generateControlCiphers('123445567')).not.toThrow();
  });

  it('Should return a number', () => {
    expect(typeof generateControlCiphers('123445567')).toBe('number');
  });

  it('Should return valid control ciphers for a valid fnr', () => {
    const baseFnr = '010437286';
    const actual = 75;
    expect(generateControlCiphers(baseFnr)).toBe(actual);
  });
});
