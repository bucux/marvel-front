


import './css/character.css'
import { useStoreObj } from '../../stores/storeObj'
import { useEffect } from 'react'
import { useStoreStr } from '../../stores/storeStr'

export default function Comic() {

  const comic = useStoreObj(state=>state.comic)
  const setStr = useStoreStr(state => state.setStr)

  useEffect(()=>{
    setStr('page', 'book')
  }, [])

  if(comic){
    return (
      <main className='comic-cont0'>
        <p>{comic.title}</p>
        <p>{comic.description}</p>
        <p>{comic.__v}</p>
        <p>{comic._id}</p>
        <p>{comic.thumbnail.extention}</p>
        <img src={comic.thumbnail.path + '/portrait_xlarge.jpg'} alt={'image du comic' + comic.title} />
      </main>
    )
  } else {return null}
}