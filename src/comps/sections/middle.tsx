
import cookie from "js-cookie";
import { useEffect } from "react";
import { useStoreStr } from "../../stores/storeStr";
import { Gstr } from "../../libs/global";

export default function Middle() { // composant invisible, qui se place en middleware pour exécuter des services réactifs

  const setStr = useStoreStr(state=>state.setStr)

  useEffect(()=>{

    const initEnv = () => { // définit les variables d'environnement selon que l'on est en local ou sur le serveur distant
      Gstr.urlServer = import.meta.env[`VITE_url_server_${import.meta.env.MODE}`]
    }

    const handshake =  async () => {
      const token = cookie.get('token')
      if(token){ // si un token est présent dans les cookies, vérifier sa validité auprès du serveur
        // const verified = await postAxios('handshake', {oldToken : token})
        // if(verified) { // token vérifié
        // eslint-disable-next-line
        if(true) { // provisoire : dans l'exercisse, le token est toujours valide
          setStr('token', token)
          Gstr.token = token // version non réactive de token, accessible depuis les librairies hors composant
        } 
      }
    }

    initEnv()
    handshake()

  }, [])

  return null
}
