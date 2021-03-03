const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const contextMenu = require('electron-context-menu');

const { encryptText, dcryptHash } = require('./js/symmetricEncryption');

// Add an item to the context menu that appears only when you click on an image
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
  ],
});

let mainWindow;

app.on('ready', () => {
  console.log('App is ready');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'Database-Encryption-icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Loading the HTML FILE
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    console.log('main Window is closed');
  });

  let key;
  // Encrypting
  ipcMain.on('plainText', (event, value) => {
    const encryptedText = encryptText(value, key);
    mainWindow.webContents.send('encryptedText', encryptedText);
  });

  // Dcrypting
  ipcMain.on('cipherText', (e, value) => {
    const plainText = dcryptHash(value, key);
    mainWindow.webContents.send('plainTextForD', plainText);
  });

  // receving the secretKey
  ipcMain.on('secretKey', (e, secretKey) => {
    key = secretKey;
  });
});
