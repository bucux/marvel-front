
import cookie from "js-cookie";
import { useEffect } from "react";
import { useStoreStr } from "../../stores/storeStr";
import { Gstr } from "../../libs/global";
import { getAxios } from "../../libs/axios";

export default function Middle() { // composant invisible, qui se place en middleware pour exécuter des services réactifs

  const setStr = useStoreStr(state=>state.setStr)

  useEffect(()=>{

    const initEnv = () => { // définit les variables d'environnement selon que l'on est en local ou sur le serveur distant
      Gstr.urlServer = import.meta.env[`VITE_url_server_${import.meta.env.MODE}`]
    }

    const handshake =  async () => {
      const token = cookie.get('token')
      if(token){ // si un token est présent dans les cookies, vérifier sa validité auprès du serveur
        Gstr.token = token // version non réactive de token, accessible depuis les librairies hors composant // n'influence pas les states des composants
        const user = await getAxios('user/handshake') // axios ajoutera automatiquement le token dans le bearer
        if(user) { // token vérifié, afficher l'username à l'écran
          setStr('token', token) // officialiser le token dans le state réactif
          setStr('username', user.username)
        } else { // token frelaté, le supprimer de tous les states ainsi que des cookies
          Gstr.token = ''
          cookie.remove('token')
        }
      }
    }

    initEnv()
    handshake()

  }, [])

  return null
}
