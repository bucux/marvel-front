

import './css/button3.css'
import { useStoreStr } from '../../stores/storeStr'

export default function Button3({idCharacter} : {idCharacter : string}) {

  const setStr = useStoreStr(state=>state.setStr)

  const clic = () => {  
    console.log(idCharacter)
  }

  const mouseEnter = () => { setStr('pageHover', 'login') }
  const mouseLeave = () => { setStr('pageHover', '') }

  return (
  <div className='button3-cont0' onClick={clic} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    <img src={`imgs/ico_favorites.png`} alt={'logo login'} />
    <img src={`imgs/red_favorites.png`} alt={'logo login'} />
  </div>
  )
}
