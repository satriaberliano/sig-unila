import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

function isLocalStorageAvailable() {
  try {
    const test = "__localStorageTest__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export const useModalFacility = create(
  persist(
    (set) => ({
      facility: false,
      isEdit: false,
      data: {},
      setFacility: () => set((state) => ({ facility: !state.facility })),
      setIsEdit: () => set((state) => ({ isEdit: !state.isEdit })),
      setData: (val) => set(() => ({ data: val })),
    }),
    {
      name: "facility-storage",
      storage: createJSONStorage(() =>
        isLocalStorageAvailable() ? localStorage : sessionStorage
      ),
      // getStorage: () =>
      //   isLocalStorageAvailable() ? localStorage : sessionStorage,
      partialize: (state) => ({ data: state.data }), // hanya menyimpan state data
    }
  )
);
