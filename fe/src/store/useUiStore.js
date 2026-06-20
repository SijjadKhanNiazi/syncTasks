import { create } from "zustand";

const useUiStore = create((set) => ({
  selecttaskId: null,
  filter: "all",

  setSelectTaskId: (id) =>
    set({
      selecttaskId: id,
    }),
  setFilter: (newfilter) =>
    set({
      filter: newfilter,
    }),
}));

export default useUiStore;
