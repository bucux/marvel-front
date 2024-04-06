
import { useEffect, useRef } from 'react'
import './css/signup.css'
import { useStoreBool } from '../../stores/storeBool'
import { postAxios } from '../../libs/axios';
import { useStoreStr } from '../../stores/storeStr';

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
      if(data) { 
        setStr('token', data.token)
        setBool('isSignupOpened', false)
      } 
      else {titre.current!.textContent = "Inscription invalide"}
    }else{
      titre.current!.textContent = "Tous les champs sont requis"
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
      <p ref={titre}>S'inscrire</p>
      <input placeholder="Nom d'utilisateur" ref={username} onKeyDown={touche}/>
      <input placeholder='Adresse email' ref={email} onKeyDown={touche}/>
      <input placeholder='Mot de passe' ref={password} onKeyDown={touche}/>
      <div className='signup-cont1' ref={newsletter}>
        <input type="checkbox" />
        <p>S'inscrire à notre newletter</p>
      </div>
      <p id="disclamer">En m'inscrivant, je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité Vinted. Je confirme avoir au moins 18 ans.</p>
      <button onClick={submit}>S'inscrire</button>
      <p onClick={openLogin}>Tu as déjà un compte ? Connecte-toi !</p>
    </div>
  )
}

