import { create } from "zustand";

const useGlobalStore = create((set) => ({

  // 时钟款式
  clockStyle: 'normal',
  changeClockType: (val) => set((state) => ({ clockStyle: val })),

  // 窗口置顶
  isTop: false,
  changeIsTop: (val) => set((state) => ({ isTop: val })),

  // 是否显示控制按钮
  isShowBtn: false,
  changeIsShowBtn: (val) => set((state) => ({ isShowBtn: val })),

  // 当前时钟模式
  clockType: 'timer', // timer: 时钟 count: 倒计时
  changeClockType: (val) => set((state) => ({ clockType: val })),

  // 倒计时时间s
  counts: 600,
  chagneCounts: (val) => set((state) => ({ counts: val })),

  // 时钟大小px
  size: 100,
  changeSize: (val) => set((state) => ({ bears: val })),

  // 下面文字滚播间隔s
  tipsDelay: 3,
  changeTipsDelay: (val) => set((state) => ({ tipsDelay: val })),

  // 卡片背景颜色
  cordColor: 'rgba(22, 69, 62, 1)',
  changeCardColor: (val) => set((state) => ({ cordColor: val })),

  // 数字时钟文字颜色
  timeColor: 'rgba(255,255,255,1)',
  changeTimeColor: (val) => set((state) => ({ timeColor: val })),

  // 日期文字颜色
  dataColor: 'rgba(255,255,255,.68)',
  changeDataColor: (val) => set((state) => ({ dataColor: val })),

  // 提示文字颜色
  tipsColor: 'rgba(255,255,255,.46)',
  changeTipsColor: (val) => set((state) => ({ tipsColor: val })),

  // 底部提示文字
  tipss: ['一寸光阴一寸金，寸金难买寸光阴','时光荏苒，岁月如梭，珍惜当下，莫待明日','时间是生命的馈赠，珍惜它，就是对生命最好的尊重','时间就像流水，一旦逝去，便不复返'],
  changeTipss: (val) => set((state) => ({ tipss: val })),
}));

export default useGlobalStore;