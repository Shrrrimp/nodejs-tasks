const program = require('commander');
const validation = require('./validation');
const streams = require('./streams');

const { Transform } = require('stream');
const { pipeline } = require('stream');

program.storeOptionsAsProperties(false);
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {}
});

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .requiredOption('-a, --action <type>', 'encode or decode');
program.parse(process.argv);

const myShift = validation.checkShift(program.opts().shift);
const myAction = validation.checkAction(program.opts().action);

pipeline(
  streams.myReadable(program.opts().input),
  new Transform({
    writableObjectMode: true,
    transform: streams.myTransform(myShift, myAction)
  }),
  streams.myWritable(program.opts().output),
  err => {
    if (err) {
      process.stderr.write(err.message);
      process.exit(1);
    } else {
      console.log('The process was completed successfully!');
      process.exit(1);
    }
  }
);
