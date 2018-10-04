const electron = require('electron')
const { app, BrowserWindow, ipcMain, dialog, session } = electron;
const path = require('path');
const url = require('url');

let win, winSession;

const createWindow = () => {

  const {width, height} = electron.screen.getPrimaryDisplay().size;
  win = new BrowserWindow({width, height, resizable: false});
  winSession = win.webContents.session

  winSession.cookies.get({name: 'cookie'}, (error, cookies) => {
    console.log(cookies)
    if (cookies[0]) {
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        hash: '/',
        slashes: true
      }));
    }  else win.loadURL(url.format({
      pathname: path.resolve(__dirname, 'login.html'),
      protocol: 'file:',
      slashes: true
    }));
  })

  // if (process.env.NODE_ENV === 'development') win.loadURL('http://localhost:8080')

  // win.webContents.openDevTools() 
  
  win.on('closed', () => {
    win = null
  });
}

ipcMain.on('login', () => {
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'login.html'),
    protocol: 'file:',
    hash: '/',
    slashes: true
  }));
})

ipcMain.on('guest', (event, args) => {
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    hash: '/',
    slashes: true
  }));
  console.log('Guest Logged In', args)
  event.sender.send('guestLoggedIn', args)
})

ipcMain.on('authorized', (event, args) => {
  console.log('before if state');
  if (args) {
    // console.log('user loggedin b4 loadURL', args);
    win.webContents.on('dom-ready', () => {
      // Send Message
      console.log('inside did finishload');
      event.sender.send('userLoggedIn', args);
    })
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      hash: '/',
      slashes: true
    }));
    winSession.cookies.set({url: 'https://myapp.com', name: 'cookie', value: 'cookie_value', domain: 'myapp.com', expirationDate: 999999999999}, (error) => console.log(error))
    win.webContents.send('userLoggedIn', args);
  }
})

ipcMain.on('logout', () => {
  winSession.cookies.remove('https://myapp.com', 'cookie', (error) => console.log(error))
})

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