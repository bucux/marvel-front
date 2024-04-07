
import { useEffect, useRef } from 'react'
import './css/logout.css'
import { useStoreBool } from '../../stores/storeBool'
import { useStoreStr } from '../../stores/storeStr';
import cookie from "js-cookie";
import { Gstr } from '../../libs/global';
import { useStoreTable } from '../../stores/storeTable';

export default function Logout() {

  const cont0 = useRef<HTMLDivElement>(null);
  const titre = useRef<HTMLParagraphElement>(null);
  const setBool = useStoreBool(state=>state.setBool)
  const setStr = useStoreStr(state=>state.setStr)
  const setTable = useStoreTable(state=>state.setTable)

  const clic = () => { // deconnexion
    setStr('token', '')
    setStr('username', '')
    setTable('idHeros', [])
    setTable('idComics', [])
    setBool('isLoginOpened', false)
    Gstr.token = ''
    cookie.remove("token"); 
    setBool('isLogoutOpened', false)
  }

  useEffect(()=>{

    const closeLogout = (e: MouseEvent) => {
      if (cont0.current && !cont0.current.contains(e.target as Node)) { // clic hors de la modale
        setBool('isLoginOpened', false);
      }
    }

    const timer = setTimeout(()=>{document.addEventListener('click', closeLogout)}, 100) // attend 1/10 de seconde avant de listener le clic hors de la modale, sinon elle se fermerait au clic d'ouverture
    
    return () => { 
      clearTimeout(timer)
      document.removeEventListener('click', closeLogout) 
    }

  }, [])

  return (
    <div className='logout-cont0' onClick={clic} ref={cont0}>
      <p ref={titre}>VANISH ?</p>
      <p>click me, if you can !</p>
    </div>
  )
}
