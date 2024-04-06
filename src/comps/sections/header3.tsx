

import { useStoreNum } from '../../stores/storeNum'
import { useStoreObj } from '../../stores/storeObj'
import './css/header3.css'

export default function Header3() {

  const comic = useStoreObj(state=>state.comic)
  const serieCount = useStoreNum(state=>state.serieCount)

  if(comic){
    return (
      <div className='header3-cont0'>
        <p>{`Serie of ${serieCount} books`}</p>
        <p>{comic.title.toUpperCase()}</p>
        <p className={'mini'}>{comic.description}</p>
      </div>
    )
  } else {return null}
}
