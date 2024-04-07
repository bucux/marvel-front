


import './css/comic.css'
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
        <div className='comic-cont1'>
          <p>{comic.title}</p>
          <p>{comic.description}</p>
          <img src={comic.thumbnail.path + '/portrait_uncanny.jpg'} alt={'image du comic' + comic.title} />
          <p>{'THE HEROS IN THAT BOOK ARE SO...'.toUpperCase()}</p>
          <div className='comic-cont11'>
            <p>{'Spectacular'.toUpperCase()}</p>
            <p>{'Mighty'.toUpperCase()}</p>
            <p>{'Invincible'.toUpperCase()}</p>
            <p>{'Heroic'.toUpperCase()}</p>
            <p>{'Legendary'.toUpperCase()}</p>
            <p>{'Formidable'.toUpperCase()}</p>
            <p>{'Incredible'.toUpperCase()}</p>
            <p>{'Fantastic'.toUpperCase()}</p>
            <p>{'Intrepid'.toUpperCase()}</p>
            <p>{'Valiant'.toUpperCase()}</p>
            <p>{'Unstoppable'.toUpperCase()}</p>
            <p>{'Powerful'.toUpperCase()}</p>
            <p>{'Fearless'.toUpperCase()}</p>
            <p>{'Dynamic'.toUpperCase()}</p>
            <p>{'Spectacular'.toUpperCase()}</p>
            <p>{'Spectacular'.toUpperCase()}</p>
          </div>
        </div>
        <div className='comic-cont2'>
          <p>MINIMUM SYNDICAL PAS FRANCHEMENT LE TEMPS DE FIGNOLER - MERCI D'AVOIR LU</p>
        </div>
      </main>
    )
  } else {return null}
}
