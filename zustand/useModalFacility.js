import { create } from "zustand";

export const useModalFacility = create((set) => ({
  facility: false,
  isEdit: false,
  data: {},
  setFacility: () => set((state) => ({ facility: !state.facility })),
  setIsEdit: () => set((state) => ({ isEdit: !state.isEdit })),
  setData: (val) => set(() => ({ data: val })),
}));
