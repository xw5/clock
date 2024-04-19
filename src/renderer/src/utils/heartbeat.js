// 全局定时器类
class HeartBeat {
  constructor() {
    this.timer = null;
    this.runBack = {};
    this.isRuning = false;
  }

  // 添加心跳运行方法
  add(key, fn) {
    this.runBack[key] = fn;
  }

  // 移除心跳运行方法
  remove(key) {
    this.runBack[key] = null;
  }

  // 启动心跳
  start() {
    if (this.isRuning) {
      return;
    }
    this.isRuning = true;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      Object.keys(this.runBack).forEach((key) => this.runBack[key] && this.runBack[key]());
      console.log('---- HeartBeat ----:心跳监听的程序', this.runBack);
    }, 1000);
  }

  // 停止心跳
  stop() {
    clearInterval(this.timer);
    this.isRuning = false;
  }
}

export default new HeartBeat();