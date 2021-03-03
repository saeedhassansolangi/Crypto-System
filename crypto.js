const crypto = require('crypto');

// getting list of all algorithem
//console.log(crypto.getCiphers());

const algorithem = 'aes-256-ctr';
// Symmetric encryption is a type of encryption where only one key (a secret key) is used to both encrypt and decrypt electronic information.
const secretKey = 'Iam a Secret Key';

// "createCipher" deprecated and we will get an error like this "node:13952) Warning: Use Cipheriv for counter mode of aes-256-ctr"
const encryptedText = crypto
  .createCipher(algorithem, secretKey)
  .update('Iam a Secret Text ');

console.log(encryptedText.toString('hex'));

const dcryptedText = crypto
  .createDecipher(algorithem, secretKey)
  .update(encryptedText);

console.log(dcryptedText.toString());

// if we use the Different Key for Encryption and Dcryption

const dcryptedText1 = crypto
  .createDecipher(algorithem, 'IAM AN OTHER KEY')
  .update(encryptedText);

console.log('IAM FROM WRONG KEY', dcryptedText1.toString());
