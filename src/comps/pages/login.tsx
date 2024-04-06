


import { useEffect, useRef } from 'react'
import './css/login.css'
import { useStoreBool } from '../../stores/storeBool'
import { postAxios } from '../../libs/axios';
import { useStoreStr } from '../../stores/storeStr';
import cookie from "js-cookie";
import { Gstr } from '../../libs/global';


export default function Login() {

  const cont0 = useRef<HTMLDivElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const titre = useRef<HTMLParagraphElement>(null);
  const setBool = useStoreBool(state=>state.setBool)
  const setStr = useStoreStr(state=>state.setStr)
  
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
      const data = await postAxios('user/login', body)
      if(data) { // connexion réussie
        setStr('token', data.token)
        setBool('isLoginOpened', false)
        Gstr.token = data.token // version non réactive de token, accessible depuis les librairies hors composant
        cookie.set("token", data.token); // provisoire : il faudra synchroniser l'expiration avec celle du backend
        // cookie.set("token", data.token, { expires: 1 / 24 }); // expiration du cookie 1 heures (1/24 de jour)
      } 
      else {titre.current!.textContent = "Connexion échouée"}
    }else{
      titre.current!.textContent = "Tous les champs sont requis"
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
      <p ref={titre}>Se connecter</p>
      <input placeholder='Adresse email' ref={email} onKeyDown={touche}/>
      <input placeholder='Mot de passe' ref={password} onKeyDown={touche}/>
      <button onClick={submit}>Se connecter</button>
      <p onClick={openSignup}>Pas encore de compte ? Inscris-toi !</p>
    </div>
  )
}


