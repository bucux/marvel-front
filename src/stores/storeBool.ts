
import { create } from 'zustand'

export type tBoolStates = { // ce type sert à l'extérieur, pour vérifier si le nom de la variable est une clé de cet objet
  isLoginOpened: boolean;
  isLogoutOpened: boolean;
  isSignupOpened: boolean;
  isSearch: boolean,
  isSort: boolean,
  isHeader2: boolean // si un article de header2 est sélectionné
}

type tBoolFuncs = {
  setBool: (nom: keyof tBoolStates, bool: boolean) => void; // définit la valeur du booléen
  switchBool: (nom: keyof tBoolStates) => void; // inverse la valeur du booléen
}

const etatOrigine: tBoolStates = {
  isLoginOpened: false,
  isLogoutOpened: false,
  isSignupOpened: false,
  isSearch: false,
  isSort: false,
  isHeader2: false,
}

export const useStoreBool = create<tBoolStates & tBoolFuncs>((set) => ({
  ...etatOrigine,
  setBool: (nom, bool) => set((state) => ({ ...state, [nom] : bool })),
  switchBool: (nom) => set((state) => ({ ...state, [nom] : !state[nom] })),
}))
