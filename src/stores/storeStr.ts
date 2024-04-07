

import { create } from 'zustand'

type TstrStates = { // ce type ne sert qu'ici, et n'a pas besoin d'être exporté
  token: string // token de connexion
  username: string // le username certifié par le serveur
  searchString: string
  urlServer: string
  page: string // page en cours
  pageHover : string // bouton de page survolé
}

type TstrFuncs = { // ce type ne sert qu'ici, et n'a pas besoin d'être exporté
  setStr: (nom: keyof TstrStates, val: string) => void;
}

const etatOrigine: TstrStates = {
  token: "",
  username: "",
  searchString: "",
  urlServer: "",
  page: "characters",
  pageHover: "",
}

export const useStoreStr = create<TstrStates & TstrFuncs>((set) => ({
  ...etatOrigine,
  setStr: (nom, val) => set((state) => ({ ...state, [nom] : val })),
}))
