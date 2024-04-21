import { app, BrowserWindow, ipcMain } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import path from 'path';
import { createWindow } from '../utils/createBrowserWindow.js';
import createTray from '../utils/tray.js';
import { createPopMenu } from '../utils/contextmenu.js';

let mainWindow = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  // 实时调整窗口尺寸
  ipcMain.on('resize', (e,w,h) => {
    // console.log('---- resize ----:', w, h);
    const nowWin = BrowserWindow.fromWebContents(e.sender);
    nowWin.setBounds({
      width: w,
      height: h
    }, true);
  });

  // 实时窗口拖拽
  ipcMain.on('drag', (e,x,y) => {
    // console.log('---- drag ----:', x, y);
    const nowWin = BrowserWindow.fromWebContents(e.sender);
    const [posx,posy] = nowWin.getPosition();
    nowWin.setPosition(posx　+ x, posy + y);
  });

  // 打开新窗口 - 指定路由
  ipcMain.on('open', (e, hash, title) => {
    createWindow({
      width: 750,
      height: 560,
      title,
      icon: path.join(__dirname, '../../resources/logo32.ico')
    }, hash, true);
  });

  // 关闭窗口
  ipcMain.on('close', (e) => {
    const nowWin = BrowserWindow.fromWebContents(e.sender);
    nowWin.close();
  });

  // 右键菜单
  ipcMain.on('show-context-menu', (e, type, isTop) => {
    createPopMenu(e, type, isTop);
  });

  // 置顶
  ipcMain.on('setTop', (e, type) => {
    // console.log('---- setTop ----:', type, JSON.stringify(e));
    mainWindow.setAlwaysOnTop(type);
  });

  mainWindow = createWindow({
    width: 1000,
    height: 560,
    transparent: true,
    frame: false,
  }, 'clock', true);

  // 修改拖盘图标
  createTray();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow({
        width: 1000,
        height: 560,
        transparent: true,
        frame: false,
      })
    }
    // 苹果隐藏任务栏图标
    app.dock.hide();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
