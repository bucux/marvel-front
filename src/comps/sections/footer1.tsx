
import { useStoreNum } from '../../stores/storeNum'
import Slider1 from '../sliders/slider1'
import './css/footer1.css'

export default function Footer1() {

  const count = useStoreNum(state=>state.count)

  return (
    <div className='footer1-cont0'>
      <Slider1 max={Math.floor(count/100) + (count % 100 > 0 ? 1 : 0)}/>
    </div>
  )
}
