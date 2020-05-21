import moment from 'moment';

export function checkIndividualAppendYear(year: string, individual: string): string {
  let appendYear;

  switch (true) {
    case individual <= '999' && individual >= '000':
      switch (true) {
        case (individual >= '500' && individual <= '999') && year <= '39':
          appendYear = '20';
          break;
        case (individual >= '500' && individual <= '749') && year >= '54':
          appendYear = '18';
          break;
        default:
          appendYear = '19';
          break;
      }
      break;
    default:
      break;
  }

  return appendYear;
}

function throwIfInvalidDates(day: string, month: string, isDNumber: boolean = false): boolean {
  if (!(month >= '01' && month <= '12')) {
    throw new Error('Month should be between 01 and 12');
  }

  if (isDNumber && (!(day >= '41' && day <= '71'))) {
    throw new Error('When the fnr is D-number, the day should be between 41 and 71');
  } else if (!isDNumber && !(day >= '01' && day <= '31')) {
    throw new Error('Day should be between 01 and 31');
  }

  return true;
}

export default function checkValidFødselsdato(fnr: string, isDNumber: boolean = false): void {
  const isStrictMode = true;
  const [d1, d2, m1, m2, å1, å2, i1, i2, i3] = fnr.slice(0, 9).split('');
  const [day, month, year, individual] = [`${d1}${d2}`, `${m1}${m2}`, `${å1}${å2}`, `${i1}${i2}${i3}`];
  const appendYear = throwIfInvalidDates(day, month, isDNumber)
  && checkIndividualAppendYear(year, individual);
  const ISODate = `${appendYear}${year}-${month}-${day}`;
  const validDate = !isDNumber ? moment(ISODate, moment.ISO_8601, isStrictMode).isValid() : true;
  if (!validDate) {
    throw new Error('Invalid date');
  }
}
