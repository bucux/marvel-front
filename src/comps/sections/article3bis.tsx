

import { useNavigate } from 'react-router-dom'
import { Tcharacter } from '../../libs/types'
import './css/article3bis.css'
import { useStoreObj } from '../../stores/storeObj'
import { useEffect, useState } from 'react'
import { getAxios } from '../../libs/axios'

export default function Article3bis({idCharacter} : {idCharacter : string}) { 

  const navigate = useNavigate()
  const setObj = useStoreObj(state=>state.setObj)
  const [character, setCharacter] = useState<Tcharacter | null>(null)

  const clic = () => { navigate('/character')}
  
  const mouseEnter = () => { 
    setObj('character', character)
  }

  const mouseLeave = () => { setObj('comic', null)}

  useEffect(()=>{
    
    const fetchCharacter = async () => {
      const suffixe = 'character/' + idCharacter 
      const datas = await getAxios(suffixe)
      if(datas){ setCharacter(datas)}
    }

    if(idCharacter){fetchCharacter() }

  }, [])

  if(character){
    return (
      <div className='article3-cont0' onClick={clic} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <img src={character.thumbnail.path + '/portrait_xlarge.jpg'} alt={'image du character' + character.name} />
      </div>
    )
  } else {return null}
}