


import { useNavigate } from 'react-router-dom'
import { Tcharacter } from '../../libs/types'
import './css/article4.css'
import { useStoreObj } from '../../stores/storeObj'
import { useStoreBool } from '../../stores/storeBool'

export default function Article4({character} : {character : Tcharacter}) { // sert dans le composant Characters

  const navigate = useNavigate()
  const setObj = useStoreObj(state=>state.setObj)
  const setBool = useStoreBool(state=>state.setBool)

  const clic = () => { navigate('/character') }

  const hover = () => {
    setObj('character', character)
    setBool('isHeader2', false)
  }

  return (
    <p className='article4-cont0' onClick={clic} onMouseEnter={hover}>{character.name.toLocaleUpperCase()}</p>
  )

}