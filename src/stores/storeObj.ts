

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Tcharacter, Tcharacters, Tcomic, Tcomics, Tuser } from '../libs/types';

export type TobjStates = {
  comics: Tcomics | null // les comics de la pagination
  characters: Tcharacters | null // les characters de la pagination
  comic: Tcomic | null // le comic en cours de consultation
  character: Tcharacter | null // le character en cours de consultation
  user: Tuser | null // les données complète de l'user, sans les secrets (hash et salt)
};

type TobjFuncs = {
  setObj: <K extends keyof TobjStates>(nom: K, val: TobjStates[K]) => void;
};

const etatOrigine: TobjStates = {
  comics: null,
  characters: null,
  comic: null, 
  character: null,
  user: null
};

export const useStoreObj = create<TobjStates & TobjFuncs>()(
  immer((set) => ({
    ...etatOrigine,
    setObj: (nom, val) => set((state: TobjStates) => { state[nom] = val}),
  }))
);
