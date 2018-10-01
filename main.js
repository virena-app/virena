const electron = require('electron')
// const express = require('express');
// const expressApp = express();
// expressApp.listen(3000, () => console.log('Listening on 3000'))
const { app, BrowserWindow, ipcMain, dialog } = electron;
const path = require('path');
const url = require('url');

let win;

const createWindow = () => {

  const {width, height} = electron.screen.getPrimaryDisplay().size;
  win = new BrowserWindow({width, height});

  if (process.env.NODE_ENV === 'development') win.loadURL('http://localhost:8080')
  else win.loadURL(url.format({
    pathname: path.resolve(__dirname, 'login.html'),
    protocol: 'file:',
    slashes: true
  }));

  // if (process.env.NODE_ENV === 'development') win.loadURL('http://localhost:8080')
  // else win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   hash: '/',
  //   slashes: true
  // }));

  win.webContents.openDevTools() 

  ipcMain.on('authorized', (event, args) => {
    if (args) {
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        hash: '/',
        slashes: true
      }));
    }
  })

  win.on('closed', () => {
    win = null
  });
}

ipcMain.on('selectFileDirectory' , (event) => {
  const dir = dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
  })
  event.sender.send('selectedDir', dir[0]);
})

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) createWindow()
})