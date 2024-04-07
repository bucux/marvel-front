
import { useNavigate } from 'react-router-dom'
import { Tcharacter } from '../../libs/types'
import './css/article2.css'
import { useStoreObj } from '../../stores/storeObj'
import { useStoreBool } from '../../stores/storeBool'
import { useState } from 'react'
import Button3 from '../buttons/button3'

export default function Article2({character, addLesser} : {character : Tcharacter, addLesser : (hero : Tcharacter)=>void}) { // sert dans le composant Characters

  const navigate = useNavigate()
  const setObj = useStoreObj(state=>state.setObj)
  const setBool = useStoreBool(state=>state.setBool)
  const [isError, setIsError] = useState(false)

  const clic = () => { navigate('/character') }

  const hover = () => {
    setObj('character', character)
    setBool('isHeader2', false)
  }

  const error2 = () => { // en cas d'accident de chargement de l'image, catégoriser le character dans les héros méconnus
    addLesser(character) 
    setIsError(true)
  }

  if(!isError){
    return (
      <div className='article2-cont0'>
        <div className='article2-cont1' onClick={clic} onMouseEnter={hover}>
          <img src={character.thumbnail.path + '/standard_xlarge.jpg'} alt={'image du comic' + character.name} onError={error2}/>
        </div>
        <div className='article2-cont2'>
          <p>{character.name}</p>
        </div>
        <div className='article2-cont3'>
          <Button3/>
        </div>
      </div>
    )
  } else{return null}
}