// 实现窗口拖拽
export default class Drag {
  constructor(elemet) {
    this.pageX = 0;
    this.pageY = 0;
    this.mouseDownBind = null;
    this.mouseMoveBind = null;
    this.mouseUpBind = null;
    this.elemet = elemet;
    this.init();
  }

  init() {
    this.mouseDownBind = this.mouseDown.bind(this);
    this.elemet.addEventListener('mousedown', this.mouseDownBind, false);
  }

  mouseDown(e) {
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    this.mouseMoveBind = this.mouseMove.bind(this);
    this.mouseUpBind = this.mouseUp.bind(this);
    this.elemet.addEventListener('mousemove', this.mouseMoveBind, false);
    this.elemet.addEventListener('mouseup', this.mouseUpBind, false);

  }

  mouseMove(e) {
    const diffX = e.pageX - this.pageX;
    const diffY = e.pageY - this.pageY;
    window.electron.ipcRenderer.send('drag', diffX, diffY);
  }

  mouseUp() {
    this.elemet.removeEventListener('mousemove', this.mouseMoveBind, false);
    this.elemet.removeEventListener('mouseup', this.mouseUpBind, false);
  }

}