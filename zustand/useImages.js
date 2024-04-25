import { create } from "zustand";

export const useImages = create((set) => ({
  imageUpload: null,
  imageUrl: null,
  setImageUpload: (val) => set(() => ({ imageUpload: val })),
  setImageUrl: (val) => set(() => ({ imageUrl: val })),
}));
