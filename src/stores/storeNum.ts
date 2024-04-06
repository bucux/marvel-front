

import { create } from 'zustand'

type TnumStates = { // ce type ne sert qu'ici, et n'a pas besoin d'être exporté
  count: number; // le nombre de comics dans la page comics ou bien le nombre de characters dans la page characters
  slider1 : number; // la position du curseur du Slider1
}

type TnumFuncs = {
  incNum: (nom: keyof TnumStates) => void; // incrémentation
  setNum: (nom: keyof TnumStates, val: number) => void;
}

const etatOrigine: TnumStates = {
  count: 0,
  slider1: 1, // page 1 par défaut
}

export const useStoreNum = create<TnumStates & TnumFuncs>((set) => ({
  ...etatOrigine,
  incNum: (nom) => set((state) => ({ ...state, [nom] : state[nom]  + 1 })),
  setNum: (nom, val) => set((state) => ({ ...state, [nom] : val })),
}))
