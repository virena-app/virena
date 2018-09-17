const {app, BrowserWindow} = require('electron');

let win;

const createWindow = () => {
  win = new BrowserWindow({width: 800, height: 600});

  if (process.env.NODE_ENV === 'development') win.loadURL('http://localhost:8080')
  else win.loadFile('index.html')

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