

import { nbAdventures } from '../../libs/funcs'
import { useStoreBool } from '../../stores/storeBool'
import { useStoreObj } from '../../stores/storeObj'
import Article3 from './article3'
import './css/header2.css'

export default function Header2() {

  const character = useStoreObj(state=>state.character)
  const comic = useStoreObj(state=>state.comic)
  const isHeader2 = useStoreBool(state=>state.isHeader2)

  if(character){
    return (
      <div className='header2-cont0'>
        <div className='header2-cont1'>
          {character.comics.map((idComic, index)=>
            <Article3 key={index} idComic={idComic}/>
          )}
        </div>
        <div className='header2-cont2'>
          <p>{nbAdventures(character.comics.length)}</p>
          <p>{character.name.toUpperCase()}</p>
          <p className={isHeader2 ? '' : 'mini'}>{isHeader2 ? comic?.title : character.description}</p>
        </div>
      </div>
    )
  } else {return null}
}
