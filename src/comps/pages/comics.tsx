
import './css/comics.css'

import { useEffect, useState } from "react";
import { getAxios } from '../../libs/axios';
import { useStoreStr } from '../../stores/storeStr';
import { useStoreObj } from '../../stores/storeObj';
import { useStoreNum } from '../../stores/storeNum';
import Footer1 from '../sections/footer1';
import { Tcomic } from '../../libs/types';
import Article4bis from '../sections/article4bis';
import Article1 from '../sections/article1';
import { longuestStart, nbComics } from '../../libs/funcs';
import Header3 from '../sections/header3';

export default function Comics() {

  const setObj = useStoreObj(state => state.setObj)
  const setStr = useStoreStr(state => state.setStr)
  const setNum = useStoreNum(state => state.setNum)
  const searchString = useStoreStr(state=>state.searchString)
  const comics = useStoreObj(state=>state.comics)
  const [series, setSeries] = useState<{nom : string, serie : Tcomic[]}[]>([]) // tableau de séries // une série est elle même un tableau de comics
  const [famous, setFamous] = useState<Tcomic[]>([]) // les books avec image valide
  const [lesserKnown, setLesserKnown] = useState<Tcomic[]>([]) // les books sans image
  const slider1 = useStoreNum(state=>state.slider1)
  
  const addLesser = (comic : Tcomic) => { setLesserKnown([...lesserKnown, comic]) } // ajoute à la liste des comics méconnus ceux qui ont une url d'image, mais dont l'url se révèle erronée au chargement

  const serieInit = () => { // réunit tous les comics consécutifs dont les 5 premières lettres du title sont identiques
    const datas = comics!.results
    const tab : {nom : string, serie : Tcomic[]}[] = [] // tableau de series nommées
    let tab2 : Tcomic[] = [datas[0]] // serie en cours (tableau de comics) // on l'initialise avec le premier comic
    let five = tab2[0].title.slice(0,5) // les 5 première lettres du titre de la série en cours
    for (let i = 1; i < datas.length; i++){ // on itére à partir de l'indice 1
      const newFive = datas[i].title.slice(0,5)
      if(newFive === five){tab2.push(datas[i])} // si 5 premières lettres communes, étoffer la série de ce comic
      else{ // sinon, archiver la série en cours et créer une nouvelle série
        tab.push({nom : longuestStart(tab2), serie : tab2})
        tab2 = [] // réinitialiser le tableau de serie en cours
        tab2.push(datas[i]) // ajouter le comic en cours à la nouvelle série
        five = newFive // mettre à jour la référence five
      }
    }
    console.log(tab)
    setSeries(tab)
  } 

  useEffect(()=>{
    const fetchComics = async () => {
      let suffixe = 'comics?limit=100&skip=' + ((slider1 - 1) * 100) + '&'
      if(searchString){suffixe += ('title=' + searchString + '&')}
      const datas = await getAxios(suffixe)
      if(datas){ setObj('comics', datas)}
    }
    setStr('page', 'comics')
    fetchComics() 
  }, [searchString, slider1])
  
  useEffect(()=>{
    if(comics && comics.count > 0){ 
      setNum('count', comics.count)
      serieInit()
      console.log()
      setFamous(comics.results.filter(comic=>comic.thumbnail.path && !comic.thumbnail.path.includes('not_available')))
      setLesserKnown(comics.results.filter(comic=>comic.thumbnail.path && comic.thumbnail.path.includes('not_available')))
    }
  }, [comics])

  if(series.length > 0){
    return (
      <div className='comics-cont0'>
        <Header3/>
        <div className='comics-cont1'>
          {famous.map((comic : Tcomic) => <Article1 key={comic._id} comic={comic} addLesser={addLesser}/>)}
        </div>
        {lesserKnown.length > 0
         ?
          <div className='comics-cont2'>
            <p className='mini'>{`And also ${nbComics(lesserKnown.length)} without picture :`}</p>
          </div>
          : null
        }
        <div className='comics-cont3'>
          {lesserKnown.map((comic : Tcomic) => <Article4bis key={comic._id} comic={comic}/>)}
        </div>
        <Footer1/>
      </div>
    )
  } else { return null  }
}