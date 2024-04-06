import { Tcomic } from "./types";


export const mmm = console.log // version courte de console.log, qui permet de ne pas polluer le code, et se nettoyer facilement par un search 'mm'

export const clone = <T>(obj: T): T => { return JSON.parse(JSON.stringify(obj))} // cloner un objet ou un tableau

export const nbAdventures = (nombre : number) =>  {
  const nombresEnLettres = [ 'Zero',
    'One', 'Two', 'Three', 'Four',
    'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
    'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'
  ];

  if (nombre === 0){return 'Trainee superhero'}
  else if(nombre === 1){return 'Unique adventure'}
  else if(nombre <= 20){return (nombresEnLettres[nombre] + ' adventures')}
  else {return 'Veteran superhero'}
}

export const nbComics = (nombre : number) =>  {
  const nombresEnLettres = [ 'zero',
    'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'sighteen', 'nineteen', 'twenty'
  ];

  if(nombre === 1){return 'one comic'}
  else if(nombre <= 20){return (nombresEnLettres[nombre] + ' comics')}
  else {return 'a lot of comics'}
}

export const shorterString = (tab : Tcomic []) => { // retourne la longueur du plus court titre d'un tableau de comics
  const shorter =  tab.reduce((comicRev, comic) => {
    return comic.title.length < comicRev.title.length ? comic : comicRev;
  })
  return shorter.title.length
}

export const longuestStart = (serie : Tcomic[]) : string => { // renvoie la portion de chaine initiale la plus longue commune à tous les string du tableau de comics
  let nom = serie[0].title.slice(0, 5) // on sait déjà que les 5 premères lettres sont communes
  if(serie.length > 1){ 
    for (let i = 5; i < shorterString(serie); i++){  // on arrête la vérification à la fin de la string la plus courte
      const letter = serie[0].title[i] // on prends la lettre i du premier comic de la série
      for (const comic of serie){
        if(comic.title[i] !== letter){ return nom }
      }
      nom += letter
    }
  } else return serie[0].title
  return nom
}