const electron = require('electron')
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');

let win;

const createWindow = () => {

  const {width, height} = electron.screen.getPrimaryDisplay().size;

  win = new BrowserWindow({width, height});

  win.webContents.openDevTools() 

  if (process.env.NODE_ENV === 'development') win.loadURL('http://localhost:8080')
  else win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    hash: '/',
    slashes: true
  }));

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) createWindow()
})