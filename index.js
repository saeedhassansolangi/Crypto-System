const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const contextMenu = require('electron-context-menu');

const { encryptText, dcryptHash } = require('./js/symmetricEncryption');

// Add an item to the context menu that appears only when you right click on an image
contextMenu({
  prepend: (params, browserWindow) => [
    {
      label: 'Rainbow',
      // Only show it when right-clicking images
      visible: params.mediaType === 'image',
    },
    {
      role: 'copy',
    },
    {
      role: 'cut',
    },
    {
      role: 'selectAll',
    },
  ],
});

let mainWindow;

app.on('ready', () => {
  console.log('App is ready');

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    resizable: true,
    icon: path.join(__dirname, "assets", "png", 'Database-Encryption-icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Loading the HTML FILE
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // this "closed" event will be fired when user close the main Window
  mainWindow.on('closed', () => {
    console.log('main Window is closed');
  });

  let key;
  // Encrypting
  ipcMain.on('plainText', (event, { plainTextValue, keySize }) => {
    const encryptedText = encryptText(plainTextValue, keySize, key);
    mainWindow.webContents.send('encryptedText', encryptedText);
  });

  // Dcrypting
  ipcMain.on('cipherText', (e, { cipherText, keySize }) => {
    const plainText = dcryptHash(cipherText, keySize, key);
    mainWindow.webContents.send('plainTextForD', plainText);
  });

  // receving the secretKey
  ipcMain.on('secretKey', (e, secretKey) => {
    key = secretKey;
  });
});
