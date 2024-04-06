

import { useNavigate } from 'react-router-dom'
import { Tcomic } from '../../libs/types'
import './css/article3.css'
import { useStoreObj } from '../../stores/storeObj'
import { useEffect, useState } from 'react'
import { getAxios } from '../../libs/axios'
import { useStoreBool } from '../../stores/storeBool'

export default function Article3({idComic} : {idComic : string}) { // sert dans Header2

  const navigate = useNavigate()
  const setObj = useStoreObj(state=>state.setObj)
  const setBool = useStoreBool(state=>state.setBool)
  const [comic, setComic] = useState<Tcomic | null>(null)

  const clic = () => { navigate('/comic')}
  
  const mouseEnter = () => { 
    setObj('comic', comic)
    setBool('isHeader2', true)
  }

  const mouseLeave = () => { setObj('comic', null)}

  useEffect(()=>{
    
    const fetchComic = async () => {
      const suffixe = 'comic/' + idComic 
      const datas = await getAxios(suffixe)
      if(datas){ setComic(datas)}
    }

    fetchComic() 

  }, [])

  if(comic){
    return (
      <div className='article3-cont0' onClick={clic} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <img src={comic.thumbnail.path + '/portrait_xlarge.jpg'} alt={'image du comic' + comic.title} />
      </div>
    )
  } else {return null}
}