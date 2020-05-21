/* eslint-disable no-console */
import * as readline from 'readline';
import isValidFnr from './isValidFnr';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Give me your fødselsnummer to validate: ', (answer) => {
  try {
    console.log(`The given fødselsnummer ${answer} is ${isValidFnr(answer) ? 'valid' : 'invalid'}`);
  } catch (e) {
    console.error(e);
  }

  rl.close();
});
