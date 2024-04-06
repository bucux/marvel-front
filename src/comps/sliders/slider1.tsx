
import { useStoreNum } from '../../stores/storeNum';
import { useStoreStr } from '../../stores/storeStr';
import './css/slider1.css'
import React, { useEffect, useState } from 'react';

const Slider1 = ({ max } : { max : number }) => {

  const setNum = useStoreNum(state=>state.setNum)
  const slider1 = useStoreNum(state=>state.slider1)
  const [value, setValue] = useState(1)
  const page = useStoreStr(state=>state.page)

  const change = (event : React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  }

  const finalChange = () => {setNum('slider1', value)} // fetch uniquement à la position finale du curseur

  useEffect(()=>{ // comme il y a deux sliders (header et footer), on synchronise les affichages
    setValue(slider1)
  }, [slider1])

  useEffect(()=>{ // à chaque changement de page, revenir au début de la pagination
    setNum('slider1', 1)
  }, [page])

  return (
    <div className='slider1-cont0'>
      <input
        type="range"
        min="1"
        max={max} 
        value={value}
        onChange={change}
        onMouseUp={finalChange} 
        onTouchEnd={finalChange}
      />
      <p>{value + '/' + max}</p>
    </div>
  );
};

export default Slider1;
