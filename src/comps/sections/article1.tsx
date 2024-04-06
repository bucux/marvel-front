

import { useNavigate } from 'react-router-dom'
import { Tcomic } from '../../libs/types'
import './css/article1.css'
import { useStoreObj } from '../../stores/storeObj'
import { useState } from 'react'

export default function Article1({comic, addLesser} : {comic : Tcomic, addLesser : (comic : Tcomic)=> void}) {

  const navigate = useNavigate()
  const setObj = useStoreObj(state=>state.setObj)
  const [isError, setIsError] = useState(false)

  const clic = () => { navigate('/comic') }

  const hover = () => { setObj('comic', comic) }

  const error2 = () => { // en cas d'accident de chargement de l'image, catégoriser le character dans les héros méconnus
    addLesser(comic) 
    setIsError(true)
  }

  if(!isError){
    return (
      <div className='article1-cont0' onClick={clic} onMouseEnter={hover}>
        <img src={comic.thumbnail.path + '/portrait_xlarge.jpg'} alt={'image du comic' + comic.title} onError={error2}/>
      </div>
    )
  } else{return null}
}
