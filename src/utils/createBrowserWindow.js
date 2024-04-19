import { BrowserWindow } from 'electron';
import { is } from '@electron-toolkit/utils';
import { join } from 'path';

export function createWindow(options, hash = 'normal', isDevTool = false) {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    // alwaysOnTop: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    ...options
  });

  // mainWindow.setIgnoreMouseEvents(true);
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    if (isDevTool) {
      mainWindow.webContents.openDevTools();
    }
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // console.log('---- ELECTRON_RENDERER_URL ----:', process.env['ELECTRON_RENDERER_URL']);
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/' + hash)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash
    })
  }

  return mainWindow;
}