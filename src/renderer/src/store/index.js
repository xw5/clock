import { create } from "zustand";

const useGlobalStore = create((set) => ({
  // 时钟大小px
  size: 100,
  changeSize: (val) => set((state) => ({ bears: val })),

  // 下面文字滚播间隔s
  tipsDelay: 3,
  changeTipsDelay: (val) => set((state) => ({ tipsDelay: val })),

  // 数字时钟文字颜色
  timeColor: '#ffffff',
  changeTimeColor: (val) => set((state) => ({ timeColor: val })),
}));

export default useGlobalStore;