

import { useEffect, useState } from 'react'
import { Tcomic } from '../../libs/types'
import './css/serie1.css'
import Article1 from './article1'
import { nbComics } from '../../libs/funcs'
import Article4bis from './article4bis'
import { useStoreNum } from '../../stores/storeNum'

export default function Serie1({serieDatas} : {serieDatas : {nom : string, serie : Tcomic[]}}) {

  const [famous, setFamous] = useState<Tcomic[]>([]) // les books avec image valide
  const [lesserKnown, setLesserKnown] = useState<Tcomic[]>([]) // les books sans image
  const setNum = useStoreNum (state=>state.setNum)

  const addLesser = (comic : Tcomic) => { setLesserKnown([...lesserKnown, comic]) } // ajoute à la liste des comics méconnus ceux qui ont une url d'image, mais dont l'url se révèle erronée au chargement

  const mouseEnter = () => {setNum('serieCount', serieDatas.serie.length)}

  useEffect(()=>{
    setFamous(serieDatas.serie.filter(comic=>comic.thumbnail.path && !comic.thumbnail.path.includes('not_available')))
    setLesserKnown(serieDatas.serie.filter(comic=>comic.thumbnail.path && comic.thumbnail.path.includes('not_available')))
  }, [serieDatas])

  return (
    <div className='serie1-cont0' onMouseEnter={mouseEnter}>
      <div className='serie1-cont1'>
        <h1>{serieDatas.nom}</h1>
      </div>
      <div className='serie1-cont2'>
        {famous.map((comic : Tcomic) => <Article1 key={comic._id} comic={comic} addLesser={addLesser}/>)}
      </div>
      {lesserKnown.length > 0
        ?
        <div className='serie1-cont3'>
          <p className='mini'>{`And also ${nbComics(lesserKnown.length)} without picture :`}</p>
        </div>
        : null
      }
      {lesserKnown.length > 0
        ?
        <div className='serie1-cont4'>
          {lesserKnown.map((comic : Tcomic) => <Article4bis key={comic._id} comic={comic}/>)}
        </div>
        : null
      }
    </div>
  )
}
