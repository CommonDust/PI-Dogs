import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams } from 'react-router-dom'
import { detailDog } from '../../redux/actions'

import style from './Details.module.css'

function Details() {

    
    const dispatch = useDispatch()
    const {id} = useParams()
    const details = useSelector((state) => state.details)

    useEffect(() => {
        dispatch(detailDog(id))
    },[dispatch, id])

    let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;

    if (details[0]) { 
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) {
            temperamentDog = [...details[0].temperaments]
        }

        if (details[0].temperaments[0].name) {
            temperamentDog = details[0].temperaments.map(temp => temp.name)
        }
    };

  return (
    <div className={style.main_container}>
      
        <Link to='/home'>
          <button className={style.home_button}>Back</button>
        </Link>

        <div className={style.container}>
        <h1>{nameDog}</h1>
        </div>
        <div className={style.img_container}>
        <img src={imageDog} alt={`Imagen de ${nameDog}`}/>
        </div>
        <div>
        <h3>{`Height: ${heightDog && heightDog[0]} CM - ${heightDog && heightDog[1]} CM`}</h3>
        <h3>{`Weight: ${weightDog && weightDog[0]} KG - ${weightDog && weightDog[1]} KG`}</h3>
        </div>
        <div>
        <h3>Life span: {lifeSpanDog}</h3>
        </div>
        <div>
        <h3>Temperaments: 
            <ul>
            {
          typeof temperamentDog !== 'string' ? temperamentDog.map((temp, i) => {return(<li key={i}>{temp}</li>)}) : <h3>No temperaments</h3>
          }
            </ul>
            </h3>
            </div>
    </div>
  )
}

export default Details
