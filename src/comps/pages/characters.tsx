
import './css/characters.css'

import { useEffect, useState } from "react";
import { getAxios } from '../../libs/axios';
import { useStoreStr } from '../../stores/storeStr';
import { useStoreObj } from '../../stores/storeObj';
import { Tcharacter } from '../../libs/types';
import Article2 from '../sections/article2';
import Header2 from '../sections/header2';
import { useStoreNum } from '../../stores/storeNum';
import Article4 from '../sections/article4';
import Footer1 from '../sections/footer1';

export default function Characters() {

  const setObj = useStoreObj(state => state.setObj)
  const setStr = useStoreStr(state => state.setStr)
  const setNum = useStoreNum(state => state.setNum)
  const searchString = useStoreStr(state=>state.searchString)
  const characters = useStoreObj(state=>state.characters)
  const [famous, setFamous] = useState<Tcharacter[]>([]) // les héros avec image valide
  const [lesserKnown, setLesserKnown] = useState<Tcharacter[]>([]) // les héros sans image
  const slider1 = useStoreNum(state=>state.slider1)
  
  const addLesser = (hero : Tcharacter) => { setLesserKnown([...lesserKnown, hero]) } // ajoute à la liste des héros méconnus ceux qui ont une url d'image, mais dont l'url se révèle erronée au chargement

  useEffect(()=>{
    const fetchCharacters = async () => {
      let suffixe = 'characters?limit=100&skip=' + ((slider1 - 1) * 100) + '&'
      if(searchString){suffixe += ('name=' + searchString + '&')}
      const datas = await getAxios(suffixe)
      if(datas){ setObj('characters', datas)}
    }
    setStr('page', 'characters')
    fetchCharacters() 
  }, [searchString, slider1])
  
  useEffect(()=>{
    if(characters){ 
      setNum('count', characters.count)
      setFamous(characters.results.filter(character=>character.thumbnail.path && !character.thumbnail.path.includes('not_available')))
      setLesserKnown(characters.results.filter(character=>character.thumbnail.path && character.thumbnail.path.includes('not_available')))
    }
  }, [characters])

  if(characters){
    return (
      <div className='characters-cont0'>
        <Header2/>
        <div className='characters-cont1'>
          {famous.map((character : Tcharacter) => <Article2 key={character._id} character={character} addLesser={addLesser}/>)}
        </div>
        {lesserKnown.length > 0
         ?
          <div className='characters-cont2'>
            <p className='mini'>{`(${famous.length} whith picture)`}</p>
            <p>AND ALSO...</p>
            <p>LESSER KNOWN SUPER-HEROS :</p>
            <p className='mini'>{`(${lesserKnown.length} without picture)`}</p>
          </div>
          : null
        }
        <div className='characters-cont3'>
          {lesserKnown.map((character : Tcharacter) => <Article4 key={character._id} character={character}/>)}
        </div>
        <Footer1/>
      </div>
    )
  } else { return null  }
}
