
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type tTableStates = {
  idHeros: string[] // liste des id des héros favoris
  idComics: string[] // liste des id des comics favoris
};

type TobjFuncs = {
  setTable: <K extends keyof tTableStates>(nom: K, val: tTableStates[K]) => void; // Force la cohérence entre le nom de l'objet et son type
};

const etatOrigine: tTableStates = {
  idHeros: [],
  idComics: []
};

export const useStoreTable = create<tTableStates & TobjFuncs>()(
  immer((set) => ({
    ...etatOrigine,
    setTable: (nom, val) => set((state : tTableStates) => { state[nom] = val }),
  }
)));