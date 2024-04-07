

import './css/button3.css'
import { useStoreStr } from '../../stores/storeStr'
import { useStoreBool } from '../../stores/storeBool'

export default function Button3() {

  const setStr = useStoreStr(state=>state.setStr)
  const setBool = useStoreBool(state=>state.setBool)
  const isLoginOpened = useStoreBool(state=>state.isLoginOpened)
  const isLogoutOpened = useStoreBool(state=>state.isLogoutOpened)
  const isSignupOpened = useStoreBool(state=>state.isSignupOpened)
  const token = useStoreStr(state=>state.token)

  const clic = () => {  // ouvre la modale de login ou logout selon que l'user est déjà connecté ou pas
    if(!isLoginOpened && !isLogoutOpened && !isSignupOpened){
      if(token){ setBool('isLogoutOpened', true) }
      else{setBool('isLoginOpened', true)}      
    }
  }
  const mouseEnter = () => { setStr('pageHover', 'login') }
  const mouseLeave = () => { setStr('pageHover', '') }

  return (
  <div className='button3-cont0' onClick={clic} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    <img src={`imgs/ico_favorites.png`} alt={'logo login'} />
    <img className={isLoginOpened || isLogoutOpened || isSignupOpened ? '' : 'none'} src={`imgs/red_favorites.png`} alt={'logo login'} />
  </div>
  )
}
