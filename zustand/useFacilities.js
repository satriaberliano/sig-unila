import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

function isLocalStorageAvailable() {
  try {
    const test = "__localStorageTest1__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export const useFacilities = create(
  persist(
    (set) => ({
      allFacilities: {},
      setAllFacilities: (val) => set(() => ({ allFacilities: val })),
    }),
    {
      name: "all-facility-storage",
      storage: createJSONStorage(() =>
        isLocalStorageAvailable() ? localStorage : sessionStorage
      ),
      partialize: (state) => ({ allFacilities: state.allFacilities }), // hanya menyimpan state data
    }
  )
);
