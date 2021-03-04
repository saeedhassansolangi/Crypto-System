// crypto module provides the cryptographic functionality  that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
const crypto = require('crypto');

// openssl list -cipher-algorithms (run on the terminal)

//The algorithm is dependent on OpenSSL, examples are 'aes192', etc. On recent OpenSSL releases, openssl list -cipher-algorithms (openssl list-cipher-algorithms for older versions of OpenSSL) will display the available cipher algorithms.
const algorithm = 'aes-256-ctr';
// const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

// const secretKey = 'iamasecretkeyfortheaes256ctraaaa';
// const iv = crypto.randomBytes(16, (err, buf) => {
//   if (err) throw err;

//   console.log(
//     `${buf.length} bytes or ${
//       buf.length * 2
//     } bits of random data: ${buf.toString('hex')}`
//   );
//   return buf;
// });

const iv = crypto.randomBytes(16);

//console.log('iv', iv.toString('hex'));
// console.log('iv here', iv.toString('hex'));

const encryptText = function (texts, secretKey) {
  try {
    // encrypt content
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    // The cipher.update() method can be called multiple times with new data until cipher.final() is called. Calling cipher.update() after cipher.final() will result in an error being thrown.

    const encrypted = Buffer.concat([cipher.update(texts), cipher.final()]);
    const hash = encrypted.toString('hex');
    // console.log(hash);
    return hash;
  } catch (error) {
    console.log('ERROR While Encryption', error.message);
  }
};

// decrypt content
const dcryptHash = function (encryptedText, key) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);
    return decrpyted.toString();
  } catch (error) {
    console.log('ERROR While Decryption', error.message);
  }
};

module.exports = {
  encryptText,
  dcryptHash,
};
