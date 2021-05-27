const crypto = require('crypto');

const iv = crypto.randomBytes(16);

const encryptText = function (plainText, keyLength, secretKey) {
  try {
    const algorithm = `aes-${keyLength}-ctr`;
    // encrypt content
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
    const hash = encrypted.toString('hex');
    return hash;
  } catch (error) {
    console.log('Error While Encryption : ', error.message);
  }
};

// decrypt content
const dcryptHash = function (encryptedText, keyLength, key) {
  try {
    const algorithm = `aes-${keyLength}-ctr`;
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);
    return decrpyted.toString();
  } catch (error) {
    console.log('Error While Decryption :', error.message);
  }
};

module.exports = {
  encryptText,
  dcryptHash,
};
