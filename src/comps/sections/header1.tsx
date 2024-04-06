

import './css/header1.css'
import { useStoreStr } from '../../stores/storeStr'
import Button1 from '../buttons/button1'
import { useStoreNum } from '../../stores/storeNum'
import React, { useEffect, useRef } from 'react'
import Slider1 from '../sliders/slider1'

export default function Header1() {

  const page = useStoreStr(state=>state.page)
  const pageHover = useStoreStr(state=>state.pageHover)
  const count = useStoreNum(state=>state.count)
  const setStr = useStoreStr(state=>state.setStr)
  const inputSearch = useRef<HTMLInputElement>(null)

  const change = (e : React.ChangeEvent<HTMLInputElement>) => {
    setStr('searchString', e.target.value)
  }

  useEffect(()=>{ // annuler la recherche en cas de changement de page
    if(inputSearch.current){
      inputSearch.current.value = ''
    }
    setStr('searchString', '')
  }, [page])

  return (
    <div className='header1-cont0'>
      <div className='header1-cont1'>
        <div className='header1-cont11'>
          <p className={pageHover ? 'white' : ''}>{pageHover ? pageHover.toUpperCase() : page.toUpperCase()}</p>
          <p className={page==='characters' || page==='comics' ? '' : 'hidden'}>{count}</p>
        </div>
        <div className='header1-cont12'>
          <input onChange={change} placeholder={'Choose a ' + page.toLowerCase().slice(0, page.length-1)} ref={inputSearch}/>
          <Slider1 max={Math.floor(count/100) + (count % 100 > 0 ? 1 : 0)}/>
        </div>
      </div>
      <div className='header1-cont2'>
        <img src='imgs/marvel_logo.png' alt="logo marvel" />
      </div>
      <div className='header1-cont3'>
        <Button1 name={'characters'}/>
        <Button1 name={'comics'}/>
        <Button1 name={'favorites'}/>
        <Button1 name={'login'}/>
      </div>
    </div>
  )
}
