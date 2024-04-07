
import { useEffect, useRef } from 'react'
import './css/signup.css'
import { useStoreBool } from '../../stores/storeBool'
import { postAxios } from '../../libs/axios';
import { useStoreStr } from '../../stores/storeStr';
import cookie from "js-cookie";
import { Gstr } from '../../libs/global';

export default function Signup() {

  const cont0 = useRef<HTMLDivElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const newsletter = useRef<HTMLInputElement>(null);
  const titre = useRef<HTMLParagraphElement>(null);
  const setBool = useStoreBool(state=>state.setBool)
  const setStr = useStoreStr(state=>state.setStr)

  const openLogin = () => { // ouvre la modale login et ferme la modale signup
    setBool('isLoginOpened', true)
    setBool('isSignupOpened', false)
  }

  const submit = async () => {
    if(username.current!.value && email.current!.value && password.current!.value){
      const body = {
        "username" : username.current!.value,
        "email" : email.current!.value,
        "password" : password.current!.value,
        "newsletter" : newsletter.current!.value,
      }
      const data = await postAxios('user/signup', body)
      if(data) { // inscription réussie
        setStr('token', data.token)
        setStr('username', data.username)
        setBool('isSignupOpened', false)
        Gstr.token = data.token // version non réactive de token, accessible depuis les librairies hors composant
        cookie.set("token", data.token); // provisoire : il faudra synchroniser l'expiration avec celle du backend
        // cookie.set("token", data.token, { expires: 1 / 24 }); // expiration du cookie 1 heures (1/24 de jour)
      } 
      else {titre.current!.textContent = "Invalid credential"}
    }else{
      titre.current!.textContent = "INCOMPLETE !"
    }
  }

  const touche = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') { submit() }
  }

  useEffect(()=>{

    const closeSignup = (e: MouseEvent) => {
      if (cont0.current && !cont0.current.contains(e.target as Node)) { // clic hors de la modale
        setBool('isSignupOpened', false);
      }
    }

    const timer = setTimeout(()=>{document.addEventListener('click', closeSignup)}, 100) // attend 1/10 de seconde avant de listener le clic hors de la modale, sinon elle se fermerait au clic d'ouverture
    
    return () => { 
      clearTimeout(timer)
      document.removeEventListener('click', closeSignup) 
    }

  }, [])

  return (
    <div className='signup-cont0' ref={cont0}>
      <p ref={titre}>SIGNUP</p>
      <input placeholder="Code name" ref={username} onKeyDown={touche}/>
      <input placeholder='Email' ref={email} onKeyDown={touche}/>
      <input placeholder='Password' ref={password} onKeyDown={touche}/>
      <div className='signup-cont1' ref={newsletter}>
        <input type="checkbox" />
        <p>SHIELD agent</p>
      </div>
      <p id="disclamer">PEGI 13</p>
      <button onClick={submit}><img src="imgs/red_login.png" alt="logo login" /></button>
      <p onClick={openLogin}>SIGNIN ?</p>
    </div>
  )
}

