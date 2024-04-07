
import { useEffect, useRef } from 'react'
import './css/login.css'
import { useStoreBool } from '../../stores/storeBool'
import { postAxios } from '../../libs/axios';
import { useStoreStr } from '../../stores/storeStr';
import cookie from "js-cookie";
import { Gstr } from '../../libs/global';
import { useStoreTable } from '../../stores/storeTable';

export default function Login() {

  const cont0 = useRef<HTMLDivElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const titre = useRef<HTMLParagraphElement>(null);
  const setBool = useStoreBool(state=>state.setBool)
  const setStr = useStoreStr(state=>state.setStr)
  const setTable = useStoreTable(state=>state.setTable)
  
  const openSignup = () => { // ouvre la modale signup et ferme la modale login
    setBool('isSignupOpened', true)
    setBool('isLoginOpened', false)
  }

  const submit = async () => {
    if(email.current!.value && password.current!.value){
      const body = {
        "email" : email.current!.value,
        "password" : password.current!.value,
      }
      const user = await postAxios('user/login', body)
      if(user) { // connexion réussie
        setStr('token', user.token)
        setStr('username', user.username)
        setTable('idComics', user.idComics)
        setTable('idHeros', user.idHeros)
        setBool('isLoginOpened', false)
        Gstr.token = user.token // version non réactive de token, accessible depuis les librairies hors composant
        cookie.set("token", user.token); // provisoire : il faudra synchroniser l'expiration avec celle du backend
        // cookie.set("token", user.token, { expires: 1 / 24 }); // expiration du cookie 1 heures (1/24 de jour)
      } 
      else {titre.current!.textContent = "Login failed !"}
    }else{
      titre.current!.textContent = "INCOMPLETE !"
    }
  }

  const touche = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') { submit() }
  }

  useEffect(()=>{

    const closeLogin = (e: MouseEvent) => {
      if (cont0.current && !cont0.current.contains(e.target as Node)) { // clic hors de la modale
        setBool('isLoginOpened', false);
      }
    }

    const timer = setTimeout(()=>{document.addEventListener('click', closeLogin)}, 100) // attend 1/10 de seconde avant de listener le clic hors de la modale, sinon elle se fermerait au clic d'ouverture
    
    return () => { 
      clearTimeout(timer)
      document.removeEventListener('click', closeLogin) 
    }

  }, [])

  return (
    <div className='login-cont0' ref={cont0}>
      <p ref={titre}>LOGIN</p>
      <input placeholder='Email' ref={email} onKeyDown={touche}/>
      <input placeholder='Password' ref={password} onKeyDown={touche}/>
      <button onClick={submit}><img src="imgs/red_login.png" alt="logo login" /></button>
      <p onClick={openSignup}>SIGNUP ?</p>
    </div>
  )
}


