

import './css/character.css'
import { useStoreObj } from '../../stores/storeObj'
import { useEffect } from 'react'
import { useStoreStr } from '../../stores/storeStr'
import Article3 from '../sections/article3'

export default function Character() {

  const character = useStoreObj(state=>state.character)
  const setStr = useStoreStr(state => state.setStr)

  useEffect(()=>{
    setStr('page', 'hero')
  }, [])

  if(character){
    return (
      <main className='character-cont0'>
        <div className='character-cont1'>
          <div className='character-cont11'>
            <p>{character.name}</p>
            <p>{character.description}</p>
            <img src={character.thumbnail.path + '/portrait_uncanny.jpg'} alt={'image du character' + character.name} />
          </div>
          <p>...in his thrilling adventures :</p>
          <div className='character-cont12'>
            {character.comics.map((idComic, index)=><Article3 key={index} idComic={idComic}/>)}
          </div>
        </div>
        <div className='character-cont2'>
          <p>MINIMUM SYNDICAL PAS FRANCHEMENT LE TEMPS DE FIGNOLER - MERCI D'AVOIR LU</p>
        </div>
      </main>
    )
  } else {return null}
}
