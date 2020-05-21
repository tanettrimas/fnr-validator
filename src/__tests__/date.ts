import checkValidFødselsdato, { checkIndividualAppendYear } from '../util/date';

describe('checkIndividualAppendYear', () => {
  it('should return proper year', () => {
    const expect18 = '18';
    expect(checkIndividualAppendYear('54', '567')).toBe(expect18);
    expect(checkIndividualAppendYear('98', '710')).toBe(expect18);

    const expect19 = '19';
    expect(checkIndividualAppendYear('30', '100')).toBe(expect19);
    expect(checkIndividualAppendYear('89', '950')).toBe(expect19);

    const expect20 = '20';
    expect(checkIndividualAppendYear('15', '600')).toBe(expect20);
    expect(checkIndividualAppendYear('25', '999')).toBe(expect20);
  });
});


describe('checkValidFødselsdato', () => {
  it('Should throw on invalid dates', () => {
    const invalidDay = '00123150134';
    expect(() => {
      checkValidFødselsdato(invalidDay);
    }).toThrowError('Day should be between 01 and 31');

    const invalidMonth = '01133150134';
    expect(() => {
      checkValidFødselsdato(invalidMonth);
    }).toThrowError('Month should be between 01 and 12');

    const notValidDateFebruary = '30029201345';
    expect(() => {
      checkValidFødselsdato(notValidDateFebruary);
    }).toThrowError('Invalid date');
  });
});
