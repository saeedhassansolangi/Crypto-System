const electron = require('electron');

const { ipcRenderer } = electron;

// FOr Encrption
const plainTextArea = document.querySelector('#plainText');
const encryptButtton = document.querySelector('#encryptButton');
const cipherTextArea = document.querySelector('#cipherText');

encryptButtton.addEventListener('click', (e) => {
  encryptInputMessage.innerText = '';
  const plainTextValue = plainTextArea.value;
  ipcRenderer.send('plainText', plainTextValue);
  ipcRenderer.on('encryptedText', (e, value) => {
    cipherTextArea.value = value;
  });
});

// For Dcryption
const cipherTextAreaForD = document.querySelector('#cipherTextForD');
const dcryptButtton = document.querySelector('#dcryptButton');
const plainTextAreaForD = document.querySelector('#plainTextForD');

// decrypt encryption message
const message = document.querySelector('.decryptInputMessage');
const encryptInputMessage = document.querySelector('.encryptInputMessage');

dcryptButtton.addEventListener('click', (e) => {
  const secretMessage = document.querySelector('#forCipherTextInput');

  if (!secretMessage.value) {
    // console.log('Please Provide Secret Key');
    message.innerText = 'Please Provide Secret Key';
    return;
  }

  message.innerText = '';

  ipcRenderer.send('cipherText', cipherTextAreaForD.value);
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

// Checking the Lenght of the Inputs
const inputForCipher = document.querySelector('#forCipherTextInput');

inputForCipher.addEventListener('input', function (e) {
  message.innerText = '';

  const inputValue = this.value;
  if (inputValue.length < 32) {
    this.style.border = '2px solid red';
    message.innerText = `Secret Key Must be 16 Bytes and you are ${
      32 - inputValue.length
    } bits left`;
  } else {
    this.style.border = '2px solid green';
    message.innerText = `Everything is Okay`;
    message.style.color = 'green';
    ipcRenderer.send('secretKey', inputValue);
  }
});

// Checking the Lenght of the Inputs
const inputForPlainText = document.querySelector('#forPlainText');

inputForPlainText.addEventListener('input', function (e) {
  const inputValue = this.value;

  if (inputValue.length < 32) {
    this.style.border = '2px solid red';
    encryptInputMessage.innerText = `Secret Must be 16 Bytes and you are ${
      32 - inputValue.length
    } bits left`;
  } else {
    this.style.border = '2px solid green';
    encryptInputMessage.innerText = `Everything is Okay`;
    encryptInputMessage.style.color = 'green';
    ipcRenderer.send('secretKey', inputValue);
  }
});
