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

for (let i = 0; i < spanElements.length; i++) {
  spanElements[i].addEventListener('click', function (e) {
    if (divHideAndShow[i].style.display === 'block') {
      divHideAndShow[i].style.display = 'none';
    } else {
      divHideAndShow[i].style.display = 'block';
    }

    // icons
    const showMeForEncryption = document.querySelector('#showMe1');
    const showMeForDecryption = document.querySelector('#showMe2');
    const iconsShowAndHide = [showMeForEncryption, showMeForDecryption];

    if (
      iconsShowAndHide[i].getAttribute('class') ===
      'svg-inline--fa fa-arrow-circle-right fa-w-16'
    ) {
      iconsShowAndHide[i].setAttribute('class', 'fas fa-arrow-down');
    } else {
      iconsShowAndHide[i].setAttribute(
        'class',
        'svg-inline--fa fa-arrow-circle-right fa-w-16'
      );
    }
  });
}

// showme.addEventListener('click', function (e) {
//   if (showAndHide.style.display === 'block') {
//     showAndHide.style.display = 'none';
//   } else {
//     showAndHide.style.display = 'block';
//   }

//   if (
//     showMeTo.getAttribute('class') ===
//     'svg-inline--fa fa-arrow-circle-right fa-w-16'
//   ) {
//     showMeTo.setAttribute('class', 'fas fa-arrow-circle-down');
//   } else {
//     showMeTo.setAttribute(
//       'class',
//       'svg-inline--fa fa-arrow-circle-right fa-w-16'
//     );
//   }
// });
