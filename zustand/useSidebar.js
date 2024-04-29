import { create } from "zustand";

export const useSidebar = create((set) => ({
  open: true,
  setOpen: () => set((state) => ({ open: !state.open })),
  openPublic: false,
  setOpenPublic: () => set((state) => ({ openPublic: !state.openPublic })),
}));
