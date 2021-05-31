const electron = require('electron');
const { ipcRenderer } = electron;

// FOr Encrpting Texts
const plainTextArea = document.querySelector('#plainText');
const encryptButtton = document.querySelector('#encryptButton');
const cipherTextArea = document.querySelector('#cipherText');
const inputElementForPlain = document.querySelector('#forPlainText');
const keyForEncryption = document.querySelector('#encryptSelectBox');

encryptButtton.addEventListener('click', (e) => {
  const plainTextValue = plainTextArea.value;
  const inputEL = inputElementForPlain.value;
  const keySize = keyForEncryption.value;

  if (inputEL === '') {
    alert('Please Provide the Secret Key');
    return;
  }

  if (keySize === '128' && inputEL.length !== 16) {
    alert('Length of Secret Key must be 16 for 128 bits key size');
    return;
  }

  if (keySize === '192' && inputEL.length !== 24) {
    alert('Length of Secret key must be 24 for 192 bits key size');
    return;
  }

  if (keySize === '256' && inputEL.length !== 32) {
    alert('Length of Secret Key must be 32 for 256 bits key size');
    return;
  }

  ipcRenderer.send('secretKey', inputEL);

  // sending the plain text to the server
  ipcRenderer.send('plainText', { plainTextValue, keySize });

  // receiving the encryption and showing that inside the textarea
  ipcRenderer.on('encryptedText', (e, value) => {
    cipherTextArea.value = value;
  });
});

// For Dcryption
const cipherTextAreaForD = document.querySelector('#cipherTextForD');
const dcryptButtton = document.querySelector('#dcryptButton');
const plainTextAreaForD = document.querySelector('#plainTextForD');
const keyForDecryption = document.querySelector('#decryptSelectBox');

// decrypt encryption message
const message = document.querySelector('.decryptInputMessage');
const encryptInputMessage = document.querySelector('.encryptInputMessage');

dcryptButtton.addEventListener('click', (e) => {
  const secretMessage = document.querySelector('#forCipherTextInput');

  const keySize = keyForDecryption.value;
  const inputEL = secretMessage.value;
  const cipherText = cipherTextAreaForD.value;

  console.log({ keySize, inputEL, cipherText });

  if (inputEL === '') {
    alert('Please Provide the Secret Key');
    return;
  }

  if (keySize === '128' && inputEL.length !== 16) {
    alert('Length of Secret Key must be 16 for 128 bits key size');
    return;
  }

  if (keySize === '192' && inputEL.length !== 24) {
    alert('Length of Secret key must be 24 for 192 bits key size');
    return;
  }

  if (keySize === '256' && inputEL.length !== 32) {
    alert('Length of Secret Key must be 32 for 256 bits key size');
    return;
  }

  ipcRenderer.send('secretKey', inputEL);

  ipcRenderer.send('cipherText', { cipherText, keySize });

  ipcRenderer.on('plainTextForD', (e, value) => {
    plainTextAreaForD.value = value;
  });
});

// Showing and Hiding the Text of Symmetric Encryption
const eyeIcon = document.querySelector('.eye-toggle');

eyeIcon.onclick = function (e) {
  const input = document.querySelector('#forPlainText');

  if (input.getAttribute('type') === 'password') {
    input.setAttribute('type', 'text');
  } else {
    input.setAttribute('type', 'password');
  }

  const i = document.querySelector('#if');

  if (i.getAttribute('class') === 'svg-inline--fa fa-eye fa-w-18 fa-fw') {
    i.setAttribute('class', 'svg-inline--fa-eye fa-eye-slash');
  } else {
    i.setAttribute('class', 'svg-inline--fa fa-eye fa-w-18 fa-fw');
  }
};

// Showing and Hiding the Text of Symmetric Encryption

const eyeIconForCipher = document.querySelector('.eye-toggle-forCipher');

eyeIconForCipher.addEventListener('click', (e) => {
  const input = document.querySelector('#forCipherTextInput');
  if (input.getAttribute('type') === 'password') {
    input.setAttribute('type', 'text');
  } else {
    input.setAttribute('type', 'password');
  }

  const i = document.querySelector('#forCipherEye');

  if (i.getAttribute('class') === 'svg-inline--fa fa-eye fa-w-18 fa-fw') {
    i.setAttribute('class', 'svg-inline--fa-eye fa-eye-slash');
  } else {
    i.setAttribute('class', 'svg-inline--fa fa-eye fa-w-18 fa-fw');
  }
});
