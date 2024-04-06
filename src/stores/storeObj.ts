

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Tcharacter, Tcharacters, Tcomic, Tcomics } from '../libs/types';

export type TobjStates = {
  monObj2: { nom: string; age: number };
  comics: Tcomics | null // les comics de la pagination
  characters: Tcharacters | null // les characters de la pagination
  comic: Tcomic | null // le comic en cours de consultation
  character: Tcharacter | null // le character en cours de consultation
};

type TobjFuncs = {
  setObj: <K extends keyof TobjStates>(nom: K, val: TobjStates[K]) => void;
};

const etatOrigine: TobjStates = {
  comics: null,
  characters: null,
  comic: null, 
  character: null,
  monObj2: { nom: 'macron', age: 48 },
};

export const useStoreObj = create<TobjStates & TobjFuncs>()(
  immer((set) => ({
    ...etatOrigine,
    setObj: (nom, val) => set((state: TobjStates) => { state[nom] = val}),
  }))
);
