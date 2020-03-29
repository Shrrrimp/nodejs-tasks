## Caesar cipher CLI tool
This CLI tool accept 4 options (short alias and full name):

1. -s, --shift: a shift
2. -i, --input: an input file
3. -o, --output: an output file
4. -a, --action: an action encode/decode

There is a test folder with output and input files for easy check.

Usage example:
`$ node caesar-cipher-cli/index.js -s 1 -a encode -i "test\text.txt" -o "test\output.txt"`
