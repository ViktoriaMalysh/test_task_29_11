import { IPerson } from "@/units/interfaces";
import { create } from "zustand";

interface PeopleState {
  people: IPerson[];
  setPeople: (people: IPerson[]) => void;
  clearPeople: () => void;
}

export const usePeopleStore = create<PeopleState>((set) => ({
  people: [],
  setPeople: (people) => set({ people }),
  clearPeople: () => set({ people: [] }),
}));
