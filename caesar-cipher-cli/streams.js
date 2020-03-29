const fs = require('fs');
const path = require('path');
const validation = require('./validation');
const encrypting = require('./encrypt');

const myReadableFn = input => {
  if (!input) {
    return process.stdin;
  }

  const newInput = validation.checkInputFile(path.join(__dirname, input));

  return fs.createReadStream(path.join(newInput));
};

const myWritableFn = output => {
  if (!output) {
    return process.stdout;
  }

  const newOutput = validation.checkOutputFile(path.join(__dirname, output));

  return fs.createWriteStream(newOutput, {
    flags: 'a'
  });
};

const myTransformFn = (shift, action) => {
  if (action === 'encode') {
    return (chunk, encoding, callback) => {
      const data = encrypting.encrypt(shift, chunk.toString('utf8'));

      callback(null, data);
    };
  }
  return (chunk, encoding, callback) => {
    const data = encrypting.decrypt(shift, chunk.toString('utf8'));

    callback(null, data);
  };
};

module.exports = {
  myWritable: myWritableFn,
  myReadable: myReadableFn,
  myTransform: myTransformFn
};
