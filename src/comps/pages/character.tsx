

import './css/character.css'
import { useStoreObj } from '../../stores/storeObj'
import { useEffect } from 'react'
import { useStoreStr } from '../../stores/storeStr'

export default function Character() {

  const character = useStoreObj(state=>state.character)
  const setStr = useStoreStr(state => state.setStr)

  useEffect(()=>{
    setStr('page', 'hero')
  }, [])

  if(character){
    return (
      <main className='character-cont0'>
        <p>{character.name}</p>
        <p>{character.description}</p>
        <p>{character.__v}</p>
        <p>{character._id}</p>
        <p>{character.thumbnail.extention}</p>
        <div>
          {character.comics.map((comicId, index)=><p key={index}>{comicId}</p>)}
        </div>
        <img src={character.thumbnail.path + '/portrait_xlarge.jpg'} alt={'image du character' + character.name} />
      </main>
    )
  } else {return null}
}
