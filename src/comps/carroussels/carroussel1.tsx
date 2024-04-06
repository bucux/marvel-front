
import { Timage } from '../../libs/types';
import './css/carroussel1.css'
import React, { useState } from 'react';

const Carrousel1 = ({ images } : { images : Timage[]}) => {
  const [index, setIndex] = useState(0);

  const change = (event : React.ChangeEvent<HTMLInputElement>) => {
    setIndex(parseInt(event.target.value, 10));
  };

  return (
    <div className='carroussel1-cont0'>
      <img src={images[index].secure_url} alt="Image du carrousel"/>
      <p>{`${index + 1} / ${images.length}`}</p>
      <input
        type="range"
        min="0"
        max={images.length - 1}
        value={index}
        onChange={change}
      />
    </div>
  );
};

export default Carrousel1;
