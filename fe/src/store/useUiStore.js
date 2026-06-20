import { create } from "zustand";

const useUiStore = create((set) => ({
  selectedTaskId: null,
  filter: "all",

  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  setFilter: (newFilter) => set({ filter: newFilter }),
}));

export default useUiStore;
