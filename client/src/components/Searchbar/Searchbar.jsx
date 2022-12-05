import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import {nameDog} from '../../redux/actions'
import style from './Searchbar.module.css'

function Searchbar() {
  
    
    const [searchDog, setSearchDog] = useState("")
    const dispatch = useDispatch()
    
    const handleInput = (e) => {
        setSearchDog(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(nameDog(searchDog))
    }

    return (
    <div className={style.searchbar_container}>
      <input type='text' onChange={ handleInput } placeholder='Search your race dog' className={style.input} />
      <input type='submit' value='Submit' onClick={ handleSubmit } className={style.submit}/>
    </div>
  )
}

export default Searchbar
