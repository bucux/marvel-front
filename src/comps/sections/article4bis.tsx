


import { useNavigate } from 'react-router-dom'
import { Tcomic } from '../../libs/types'
import './css/article4bis.css'
import { useStoreObj } from '../../stores/storeObj'
import { useStoreBool } from '../../stores/storeBool'

export default function Article4bis({comic} : {comic : Tcomic}) { // sert dans le composant Characters

  const navigate = useNavigate()
  const setObj = useStoreObj(state=>state.setObj)
  const setBool = useStoreBool(state=>state.setBool)

  const clic = () => { navigate('/character') }

  const hover = () => {
    setObj('comic', comic)
    setBool('isHeader2', false)
  }

  return (
    <p className='article4-cont0' onClick={clic} onMouseEnter={hover}>{comic.title.toLocaleUpperCase()}</p>
  )

}