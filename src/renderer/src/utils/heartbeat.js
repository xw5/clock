// 全局定时器类
class HeartBeat {
  constructor() {
    this.timer = null;
    this.runBack = [];
  }

  // 添加心跳运行方法
  add(fn) {
    this.runBack.push(fn);
    return this.runBack.length - 1;
  }

  // 移除心跳运行方法
  remove(index) {
    this.runBack.splice(index, 1);
  }

  // 启动心跳
  start() {
    this.timer = setInterval(() => {
      this.runBack.forEach((fn) => fn && fn());
      console.log('---- HeartBeat ----:心跳监听的程序', this.runBack.legnth);
    }, 1000);
  }

  // 停止心跳
  stop() {
    clearInterval(this.timer);
  }
}

export default new HeartBeat();