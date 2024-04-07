

import './css/header1.css'
import { useStoreStr } from '../../stores/storeStr'
import Button1 from '../buttons/button1'
import { useStoreNum } from '../../stores/storeNum'
import React, { useEffect, useRef, useState } from 'react'
import Slider1 from '../sliders/slider1'
import Button2 from '../buttons/button2'
import { useStoreBool } from '../../stores/storeBool'

export default function Header1() {

  const page = useStoreStr(state=>state.page)
  const pageHover = useStoreStr(state=>state.pageHover)
  const count = useStoreNum(state=>state.count)
  const setStr = useStoreStr(state=>state.setStr)
  const inputSearch = useRef<HTMLInputElement>(null)
  const isLoginOpened = useStoreBool(state=>state.isLoginOpened)
  const isLogoutOpened = useStoreBool(state=>state.isLogoutOpened)
  const isSignupOpened = useStoreBool(state=>state.isSignupOpened)
  const [labelPage, setLabelPage] = useState('characters')
  const username = useStoreStr(state=>state.username)

  const change = (e : React.ChangeEvent<HTMLInputElement>) => {
    setStr('searchString', e.target.value)
  }

  useEffect(()=>{ // annuler la recherche en cas de changement de page
    if(inputSearch.current){
      inputSearch.current.value = ''
    }
    setStr('searchString', '')
  }, [page])

  useEffect(()=>{
    let label = ''
    if(pageHover){label = pageHover}
    else if(isLoginOpened || isLogoutOpened || isSignupOpened){
      if(isLoginOpened){label = 'login'}
      if(isLogoutOpened){label = 'logout'}
      if(isSignupOpened){label = 'signup'}
    }else{label = page}
    setLabelPage(label.toLocaleUpperCase())
  }, [page, pageHover, isLoginOpened, isLogoutOpened, isSignupOpened])

  return (
    <div className='header1-cont0'>
      <div className='header1-cont1'>
        <div className='header1-cont11'>
          <p className={pageHover ? 'white' : ''}>{labelPage}</p>
          <p className={page==='characters' || page==='comics' ? '' : 'hidden'}>{count}</p>
        </div>
        <div className={`header1-cont12 ${page === 'characters' || page === 'comics' ? '' : 'hidden'}`}>
          <input onChange={change} placeholder={'Choose a ' + page.toLowerCase().slice(0, page.length-1)} ref={inputSearch}/>
          <Slider1 max={Math.floor(count/100) + (count % 100 > 0 ? 1 : 0)}/>
        </div>
      </div>
      <div className='header1-cont2'>
        {username 
          ? 
          <div className='header1-cont21'>
            <p>INTRODUCING THE AMAZING</p>
            <p>{username.toUpperCase()}</p>
          </div>
          : 
          <img src='imgs/marvel_logo.png' alt="logo marvel" />
        }        
      </div>
      <div className='header1-cont3'>
        <Button1 name={'characters'}/>
        <Button1 name={'comics'}/>
        <Button1 name={'favorites'}/>
        <Button2/>
      </div>
    </div>
  )
}
