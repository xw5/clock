import { create } from "zustand";
import persist from '@renderer/utils/persist.js';
import { clockConfig } from "@renderer/utils/defaultConfig";

const {
  clockStyle,
  isTop,
  isShowBtn,
  clockType,
  counts,
  size,
  tipsDelay,
  cardColor,
  timeColor,
  dataColor,
  tipsColor,
  tipss
} = clockConfig;
const useGlobalStore = create(persist({
  key: 'globalStorage', // 用于区分不同的 Store
}, (set) => ({

  // 时钟款式
  clockStyle,
  changeClockStyle: (val) => set((state) => ({ clockStyle: val })),

  // 窗口置顶
  isTop,
  changeIsTop: (val) => set((state) => ({ isTop: val })),

  // 是否显示控制按钮
  isShowBtn,
  changeIsShowBtn: (val) => set((state) => ({ isShowBtn: val })),

  // 当前时钟模式
  clockType, // timer: 时钟 count: 倒计时
  changeClockType: (val) => set((state) => ({ clockType: val })),

  // 倒计时时间s
  counts,
  chagneCounts: (val) => set((state) => ({ counts: val })),

  // 时钟大小px
  size,
  changeSize: (val) => set((state) => ({ size: val })),

  // 下面文字滚播间隔s
  tipsDelay,
  changeTipsDelay: (val) => set((state) => ({ tipsDelay: val })),

  // 卡片背景颜色
  cardColor,
  changeCardColor: (val) => set((state) => ({ cardColor: val })),

  // 数字时钟文字颜色
  timeColor,
  changeTimeColor: (val) => set((state) => ({ timeColor: val })),

  // 日期文字颜色
  dataColor,
  changeDataColor: (val) => set((state) => ({ dataColor: val })),

  // 提示文字颜色
  tipsColor,
  changeTipsColor: (val) => set((state) => ({ tipsColor: val })),

  // 底部提示文字
  tipss,
  changeTipss: (val) => set((state) => ({ tipss: val })),
})));

export default useGlobalStore;