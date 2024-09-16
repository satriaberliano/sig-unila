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

export const useFetchData = create(
  persist(
    (set) => ({
      fetch: false,
      facility: {},
      setFetch: () => set((state) => ({ fetch: !state.fetch })),
      setFacility: (val) => set(() => ({ facility: val })),
    }),
    {
      name: "detail-facility-storage",
      storage: createJSONStorage(() =>
        isLocalStorageAvailable() ? localStorage : sessionStorage
      ),
      partialize: (state) => ({ facility: state.facility }), // hanya menyimpan state data
    }
  )
);
