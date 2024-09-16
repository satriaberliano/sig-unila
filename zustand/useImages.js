import { create } from "zustand";

export const useImages = create((set) => ({
  image: false,
  imageUpload: null,
  imageUrl: null,
  images: {},
  setImage: () => set((state) => ({ image: !state.image })),
  setImageUpload: (val) => set(() => ({ imageUpload: val })),
  setImageUrl: (val) => set(() => ({ imageUrl: val })),
  setImages: (val) => set(() => ({ images: val })),
}));
