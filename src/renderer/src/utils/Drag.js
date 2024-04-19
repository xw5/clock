// 实现窗口拖拽
class Drag {
  constructor() {
    this.pageX = 0;
    this.pageY = 0;
    this.mouseDownBind = null;
    this.mouseMoveBind = null;
    this.mouseUpBind = null;
    this.init();
  }

  init() {
    this.mouseDownBind = this.mouseDown.bind(this);
    document.documentElement.addEventListener('mousedown', this.mouseDownBind, false);
  }

  mouseDown(e) {
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    this.mouseMoveBind = this.mouseMove.bind(this);
    this.mouseUpBind = this.mouseUp.bind(this);
    document.documentElement.addEventListener('mousemove', this.mouseMoveBind, false);
    document.documentElement.addEventListener('mouseup', this.mouseUpBind, false);

  }

  mouseMove(e) {
    const diffX = e.pageX - this.pageX;
    const diffY = e.pageY - this.pageY;
    window.electron.ipcRenderer.send('drag', diffX, diffY);
  }

  mouseUp() {
    document.documentElement.removeEventListener('mousemove', this.mouseMoveBind, false);
    document.documentElement.removeEventListener('mouseup', this.mouseUpBind, false);
  }

} 

new Drag();