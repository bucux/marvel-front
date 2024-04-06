

import { useEffect } from 'react'
import './css/favorite.css'
import { useStoreStr } from '../../stores/storeStr'

export default function Favorite() {

  const setStr = useStoreStr(state => state.setStr)

  useEffect(()=>{

    setStr('page', 'favorite')
  }, [])

  return (
    <main className='favorite-cont0'>
      favorite
    </main>
  )
}
