

import { useEffect } from 'react'
import './css/favorites.css'
import { useStoreStr } from '../../stores/storeStr'
import { useNavigate } from 'react-router-dom'
import { useStoreBool } from '../../stores/storeBool'

export default function Favorites() {

  const navigate = useNavigate()
  const setStr = useStoreStr(state => state.setStr)
  const setBool = useStoreBool(state => state.setBool)
  const token = useStoreStr(state=>state.token)
  const page = useStoreStr(state=>state.page)

  useEffect(()=>{
    if(!token){ // si non connecté, retourner sur la page précédente et afficher la modale de login
      navigate('/' + page)
      setBool('isLoginOpened', true)
    } else {setStr('page', 'favorites')}    
  }, [])

  if(token){
    return (
      <main className='favorite-cont0'>
        favorites
      </main>
    )
  } else return null
}