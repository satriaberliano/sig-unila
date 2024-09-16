import { create } from "zustand";

export const useImages = create((set) => ({
  image: false,

  dataImages: {},
  imageUpload: null,
  imageUrl: null,
  setImage: () => set((state) => ({ image: !state.image })),

  setDataImages: (val) => set(() => ({ dataImages: val })),
  setImageUpload: (val) => set(() => ({ imageUpload: val })),
  setImageUrl: (val) => set(() => ({ imageUrl: val })),
}));
