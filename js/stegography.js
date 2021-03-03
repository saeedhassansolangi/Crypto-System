const path = require('path');

// ENCRYPTION
const button = document.querySelector('button#encryptionForImage');
const fileForEncryption = document.querySelector('#selectImageForEncryption');
const inputSecretMessage = document.querySelector(
  'textarea#forImageEncryption'
);
const sourceImage = document.querySelector('.sourceImage');
const sourceImageCanvas = sourceImage.getContext('2d');
const sourceText = document.querySelector('.sourceText');
const sourceTextCanvas = sourceText.getContext('2d');

let defaultValueForSecretMessage = 'Hello World!';
let fileName;

const handleEncryption = function (e) {
  fileName = e.target.files[0];
  // console.dir(fileForEncryption);
  const { base: filePath, ext: fileExtension } = path.parse(
    fileForEncryption.value
  );

  if (!inputSecretMessage.value) {
    inputSecretMessage.value = defaultValueForSecretMessage;
  }

  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    const img = new Image();
    img.onload = function (e) {
      // we are setting up the canvas width and height as the width and height of the image
      // width and heigh will be apply to the "canvas" itself but other properties will be applied to its getContext('2d')
      sourceImage.width = img.width;
      sourceImage.height = img.height;
      sourceText.width = img.width;
      sourceText.height = img.height;

      // setting font for the Text that will be encrypted
      sourceImageCanvas.font = '40px Arial';

      // setting the text for image
      let messageText;
      if (inputSecretMessage.value) {
        messageText = inputSecretMessage.value;
      } else {
        messageText = defaultValueForSecretMessage;
      }

      sourceTextCanvas.fillText(messageText, 10, 50);
      sourceImageCanvas.drawImage(img, 0, 0);

      // getting the data from the image and text
      var imgData = sourceImageCanvas.getImageData(
        0,
        0,
        sourceImage.width,
        sourceImage.height
      );

      // console.log('IMAGE DATA', imgData);
      var textData = sourceTextCanvas.getImageData(
        0,
        0,
        sourceImage.width,
        sourceImage.height
      );
      // console.log('TEXT DATA', textData);
      console.log(textData.data.length);
      let pixelsInMsg = 0;
      let pixelsOutMsg = 0;

      for (var i = 0; i < textData.data.length; i += 4) {
        if (textData.data[i + 3] !== 0) {
          if (imgData.data[i + 1] % 10 == 7) {
            //do nothing, we're good
          } else if (imgData.data[i + 1] > 247) {
            imgData.data[i + 1] = 247;
          } else {
            while (imgData.data[i + 1] % 10 != 7) {
              imgData.data[i + 1]++;
            }
          }
          pixelsInMsg++;
        } else {
          if (imgData.data[i + 1] % 10 == 7) {
            imgData.data[i + 1]--;
          }
          pixelsOutMsg++;
        }
      }
      console.log('pixels within Secret Text Message borders: ' + pixelsInMsg);
      console.log('pixels outside of message borders: ' + pixelsOutMsg);
      sourceImageCanvas.putImageData(imgData, 0, 0);
    };
    img.src = e.target.result;
  };

  fileReader.readAsDataURL(e.target.files[0]);
};

fileForEncryption.addEventListener('change', handleEncryption, false);

// showing the fileName on the screen
document.querySelector('#saveImage').addEventListener('click', function () {
  const { name: baseName, ext: extension } = path.parse(fileName.name);
  const imgUrl = sourceImage.toDataURL();
  var base64Data = imgUrl.replace(/^data:image\/png;base64,/, '');
  const filePath = `${
    process.env.HOME
  }/Desktop/${baseName}${Date.now()}${extension}`;
  document.querySelector('#filename').innerHTML = `<div>
  <h6>File Saved At : </h6>
  <h6 style="background-color:#03dac699; padding: 10px">${filePath}</h6>
  </div>`;

  require('fs').writeFile(filePath, base64Data, 'base64', function (err) {
    console.log(err);
  });
});

// //handle decoding
var decodeCanvas = document.getElementById('imageCanvas2');
var dctx = decodeCanvas.getContext('2d');
var imageLoader2 = document.getElementById('selectImageForDecryption');
imageLoader2.addEventListener('change', handleImage2, false);

function handleImage2(e) {
  console.log('handle image 2');
  var reader2 = new FileReader();
  reader2.onload = function (event) {
    console.log('reader2 loaded');
    var img2 = new Image();
    img2.onload = function () {
      console.log('img2 loaded');
      decodeCanvas.width = img2.width;
      decodeCanvas.height = img2.height;
      dctx.drawImage(img2, 0, 0);
      var decodeData = dctx.getImageData(
        0,
        0,
        decodeCanvas.width,
        decodeCanvas.height
      );

      for (var i = 0; i < decodeData.data.length; i += 4) {
        if (decodeData.data[i + 1] % 10 == 7) {
          decodeData.data[i] = 0;
          decodeData.data[i + 1] = 0;
          decodeData.data[i + 2] = 0;
          // changing only alpha value of the RGBA
          decodeData.data[i + 3] = 255;
        } else {
          decodeData.data[i + 3] = 0;
        }
      }
      dctx.putImageData(decodeData, 0, 0);
      decodeCanvas.style.background = 'white';
    };
    img2.src = event.target.result;
  };
  reader2.readAsDataURL(e.target.files[0]);
}
