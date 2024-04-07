
import { useNavigate } from 'react-router-dom'
import { Tcharacter } from '../../libs/types'
import './css/article2.css'
import { useStoreObj } from '../../stores/storeObj'
import { useStoreBool } from '../../stores/storeBool'
import { useEffect, useState } from 'react'
import Button3 from '../buttons/button3'
import { useStoreTable } from '../../stores/storeTable'

export default function Article2({character, addLesser} : {character : Tcharacter, addLesser : (hero : Tcharacter)=>void}) { // sert dans le composant Characters

  const navigate = useNavigate()
  const setObj = useStoreObj(state=>state.setObj)
  const setBool = useStoreBool(state=>state.setBool)
  const [isError, setIsError] = useState(false)
  const [isHeart, setIsHeart] = useState(false) // le coeur s'affiche en permanence si favori, et seulement au survol si non favori
  const [isFav, setIsFav] = useState(false) // si le character est favori
  const idHeros = useStoreTable(state=>state.idHeros)

  const clic = () => { navigate('/character') }

  const hover0 = () => { // affiche le coeur au survol s'il n'était pas encore affiché
    if(!isHeart){setIsHeart(true)}
  }

  const leave0 = () => { // fait disparaitre le coeur après survol seulement si non favoris
    if(!isFav){setIsHeart(false)}
  }

  const hover1 = () => {
    setObj('character', character)
    setBool('isHeader2', false)
  }

  const error2 = () => { // en cas d'accident de chargement de l'image, catégoriser le character dans les héros méconnus
    addLesser(character) 
    setIsError(true)
  }

  useEffect(()=>{ // met à jour isFav en fonction de idHeros
    setIsFav(idHeros.indexOf(character._id) > -1) 
  }, [idHeros])

  useEffect(()=>{ // met à jour isHeart en fonction de isFav
    setIsHeart(isFav) 
  }, [isFav])

  if(!isError){
    return (
      <div className='article2-cont0' onMouseEnter={hover0} onMouseLeave={leave0}>
        <div className='article2-cont1' onClick={clic} onMouseEnter={hover1}>
          <img src={character.thumbnail.path + '/standard_xlarge.jpg'} alt={'image du comic' + character.name} onError={error2}/>
        </div>
        <div className='article2-cont2'>
          <p>{character.name}</p>
        </div>
        {isHeart ?
          <div className='article2-cont3'>
            <Button3 idCharacter={character._id}/>
          </div>
          : null
        }
      </div>
    )
  } else{return null}
}