

import { useEffect } from 'react'
import './css/favorites.css'
import { useStoreStr } from '../../stores/storeStr'
import { useNavigate } from 'react-router-dom'
import { useStoreBool } from '../../stores/storeBool'
import { useStoreTable } from '../../stores/storeTable'
import Article3bis from '../sections/article3bis'
import Article3 from '../sections/article3'

export default function Favorites() {

  const navigate = useNavigate()
  const setStr = useStoreStr(state => state.setStr)
  const setBool = useStoreBool(state => state.setBool)
  const token = useStoreStr(state=>state.token)
  const page = useStoreStr(state=>state.page)
  const idHeros = useStoreTable(state=>state.idHeros)
  const idComics = useStoreTable(state=>state.idComics)


  useEffect(()=>{
    if(!token){ // si non connecté, retourner sur la page précédente et afficher la modale de login
      navigate('/' + page)
      setBool('isLoginOpened', true)
    } else {setStr('page', 'favorites')}    
  }, [])

  if(token){
    return (
      <main className='favorite-cont0'>
        <div className='favorite-cont1'>
          {idHeros.map(id=><Article3bis key={id} idCharacter={id}/>)}
        </div>
        <div className='favorite-cont2'>
          {idComics.map(id=><Article3 key={id} idComic={id}/>)}
        </div>
      </main>
    )
  } else return null
}