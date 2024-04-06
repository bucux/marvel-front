

import { useEffect } from 'react'
import { useStoreStr } from '../../stores/storeStr'
import './css/favorites.css'

export default function Favorites() {

  const setStr = useStoreStr(state => state.setStr)

  useEffect(()=>{

    setStr('page', 'favorites')
  }, [])

  return (
    <main className='favorites-cont0'>
      favorites
    </main>
  )
}
