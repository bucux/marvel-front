

// store des variables globales non réactives
// les globales non réactives sont accessibles par les librairies en dehors des composants

// eslint-disable-next-line prefer-const
export let Gstr = {
  token : '', // version non réactive de useStoreStr(state=>state.token)
  urlServer : '' // url du server, autotmatiquement défini en fonction de l'environnement local ou distant
}

