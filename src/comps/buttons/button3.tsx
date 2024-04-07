

import './css/button3.css'
import { useStoreStr } from '../../stores/storeStr'
import { useEffect, useState } from 'react'
import { useStoreTable } from '../../stores/storeTable'
import { getAxios } from '../../libs/axios'
import { useStoreBool } from '../../stores/storeBool'

export default function Button3({idCharacter} : {idCharacter : string}) {

  const setStr = useStoreStr(state=>state.setStr)
  const setTab = useStoreTable(state=>state.setTable)
  const setBool = useStoreBool(state=>state.setBool)
  const idHeros = useStoreTable(state=>state.idHeros)
  const [isFav, setIsFav] = useState(false)
  const token = useStoreStr(state=>state.token)

  const fetchFav = async () => {
    const suffixe = 'fav/hero/' + idCharacter 
    const datas = await getAxios(suffixe)
    if(datas){ setTab('idHeros', datas)}
  }

  const clic = () => { 
    if(token) { fetchFav() }// si l'user est connecté
    else { setBool('isLoginOpened', true)}  // sinon l'inviter à se loguer
  }

  const mouseEnter = () => { setStr('pageHover', 'login') }
  const mouseLeave = () => { setStr('pageHover', '') }

  useEffect(()=>{
    setIsFav(idHeros.indexOf(idCharacter) > -1)
  }, [idHeros, idCharacter])

  return (
    <div className='button3-cont0' onClick={clic} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <img src={`imgs/ico_favorites.png`} alt={'logo login'} />
      {isFav ?
        <img src={`imgs/red_favorites.png`} alt={'logo login'} />
        : null
      }
    </div>
  )
}
