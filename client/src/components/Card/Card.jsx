import React from 'react'
import style from '../Card/Card.module.css'

function Card({name, id,  weight ,temperaments, image}) {
  
  
    

  return (
    <div  className={style.single_dog}>
        <div  key={id}>
          <h1>{name}</h1>
          </div>
          <div className={style.img_container}>
          <img src={`${image}`} alt={`imagen de: ${name}`} className={style.img} width='350px' height='250px'/>
          </div>
          <div className={style.weight}>
          <h3>Weight:</h3>
          <ul key={id}>
            <li>Min: {weight[0]} KG</li>
            <li>Max: {weight[1]} KG</li>
          </ul>
          </div>
          <h2>Temperaments:</h2>
          
            {
          typeof temperaments !== 'string' ? temperaments.map((temp, i) => {return(<h3 key={i}>{temp}</h3>)}) : <h3>No temperaments</h3>
          }

    </div>
  )
        }     
        

export default Card
