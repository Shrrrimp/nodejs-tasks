const encryptFn = (shift, str) => {
  if (!str) return;

  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const otherCharacters = '-=~"\'#$%&*^:<>?/!{(|)}.1234567890, ';
  let res = '';

  let shiftedAlpabet = alphabet.slice(shift);
  shiftedAlpabet += alphabet.slice(0, shift);
  shiftedAlpabet += otherCharacters;
  alphabet += otherCharacters;

  for (let i = 0; i < str.length; ++i) {
    const index = alphabet.indexOf(str[i]);
    res += shiftedAlpabet[index];
  }

  return res;
};

const decryptFn = (shift, str) => {
  return encryptFn(-shift, str);
};

module.exports = {
  encrypt: encryptFn,
  decrypt: decryptFn
};
