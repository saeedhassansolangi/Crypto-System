// spans
const symmetricEncryption = document.querySelector('.symmetricEncryption');
const steganographyEncryption = document.querySelector(
  '.steganographyEncryption'
);
const spanElements = [symmetricEncryption, steganographyEncryption];

// divs
const symmetricEncryptionToggle = document.querySelector(
  '#symmetricEncryptionToggle1'
);

const steganographyEncryptionToggle = document.querySelector(
  '#steganographyEncryptionToggle'
);

const divHideAndShow = [
  symmetricEncryptionToggle,
  steganographyEncryptionToggle,
];

// icons
const showMeForEncryption = document.querySelector('#showMe1');
const showMeForDecryption = document.querySelector('#showMe2');
const iconsShowAndHide = [showMeForEncryption, showMeForDecryption];

for (let i = 0; i < spanElements.length; i++) {
  spanElements[i].addEventListener('click', function (e) {
    if (i === 0) {
      if (divHideAndShow[i].style.display === 'block') {
        divHideAndShow[i].style.display = 'none';
      } else {
        divHideAndShow[i].style.display = 'block';
        divHideAndShow[i + 1].style.display = 'none';
      }
    } else {
      if (divHideAndShow[i].style.display === 'block') {
        divHideAndShow[i].style.display = 'none';
      } else {
        divHideAndShow[i].style.display = 'block';
        divHideAndShow[i - 1].style.display = 'none';
      }
    }
    // if (divHideAndShow[i].style.display === 'block') {
    //   divHideAndShow[i].style.display = 'none';
    // } else {
    //   divHideAndShow[i].style.display = 'block';
    // }

    if (
      iconsShowAndHide[i].getAttribute('class') ===
      'svg-inline--fa fa-arrow-circle-right fa-w-16'
    ) {
      iconsShowAndHide[i].setAttribute('class', 'fas fa-arrow-down');
      console.log('yes');
    } else {
      iconsShowAndHide[i].setAttribute(
        'class',
        'svg-inline--fa fa-arrow-circle-right fa-w-16'
      );
    }
  });
}
