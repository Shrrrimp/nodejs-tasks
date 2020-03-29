const fs = require('fs');

const checkShiftFn = shift => {
  if (!parseInt(shift, 10)) {
    process.stderr.write('error: the shift should be a number!');
    process.exit(1);
  }

  return parseInt(shift, 10) % 26;
};

const checkActionFn = action => {
  if (action !== 'encode' && action !== 'decode') {
    process.stderr.write('error: the action should be encode or decode!');
    process.exit(1);
  }

  return action;
};

const checkInputFileFn = file => {
  fs.access(file, fs.constants.F_OK, err => {
    if (err) {
      process.stderr.write(`error: the file ${file} does not exist!`);
      process.exit(1);
    }
  });

  fs.access(file, fs.constants.R_OK, err => {
    if (err) {
      process.stderr.write(`error: the file ${file} is not readable!`);
      process.exit(1);
    }
  });

  return file;
};

const checkOutputFileFn = file => {
  checkInputFileFn(file);

  fs.access(file, fs.constants.W_OK, err => {
    if (err) {
      process.stderr.write(`error: the file ${file} is not writable!`);
      process.exit(1);
    }
  });

  return file;
};

module.exports = {
  checkShift: checkShiftFn,
  checkAction: checkActionFn,
  checkInputFile: checkInputFileFn,
  checkOutputFile: checkOutputFileFn
};
