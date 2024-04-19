import { create } from "zustand";

const useGlobalStore = create((set) => ({
  size: 100,
  changeSize: (val) => set((state) => ({ bears: val })),
}));

export default useGlobalStore;