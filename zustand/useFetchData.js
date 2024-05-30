import { create } from "zustand";

export const useFetchData = create((set) => ({
  fetch: false,
  data: {},
  setFetch: () => set((state) => ({ fetch: !state.fetch })),
  setData: (val) => set(() => ({ data: val })),
}));
