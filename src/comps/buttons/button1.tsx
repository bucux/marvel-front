
import { useNavigate } from 'react-router-dom'
import './css/button1.css'
import { useStoreStr } from '../../stores/storeStr'

export default function Button1({name} : {name: string}) {

  const navigate = useNavigate()
  const setStr = useStoreStr(state=>state.setStr)
  const page = useStoreStr(state=>state.page)

  const clic = () => { navigate(`/${name}`)}
  const mouseEnter = () => { setStr('pageHover', name) }
  const mouseLeave = () => { setStr('pageHover', '') }

  return (
  <div className='button1-cont0' onClick={clic} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    <img src={`imgs/ico_${name}.png`} alt={`logo ${name}`} />
    <img className={page === name ? '' : 'none'} src={`imgs/red_${name}.png`} alt={`logo ${name}`} />
  </div>
  )
}
