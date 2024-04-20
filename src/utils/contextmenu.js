import { Menu, BrowserWindow } from 'electron';

// 右键菜单
export const createPopMenu = (e, type) => {
  // console.log('---- createPopMenu ----:', e, type);
  const diffTemplate = type === 'count' ? [{
    label: '重新计时',
    click: () => { 
      BrowserWindow.fromWebContents(e.sender).send('contextAction', 'resetCount');
    }
  },
  {
    label: '显示时间',
    click: () => { 
      BrowserWindow.fromWebContents(e.sender).send('contextAction', 'timer');
    }
  }] : [{
    label: '倒计时',
    click: () => { 
      BrowserWindow.fromWebContents(e.sender).send('contextAction', 'count');
    }
  }];
  const template = [
    ...diffTemplate,
    { 
      label: '退出', 
      role: process.platform !== 'darwin' ? 'quit' : 'close' 
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup({ window: BrowserWindow.fromWebContents(e.sender) })
}