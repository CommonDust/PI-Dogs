import React from 'react'
import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

function LandingPage() {
  return (
    <div className={style.all}>
          <div>
            <h1>Henry Dogs</h1>
          </div>
          <div>
            <p>¡Learn, search and create your own dog here!</p>
          </div>
          <Link to='/home'>
        <button className={style.btn}>Go Home</button>
        </Link>
    </div>
  )
}

export default LandingPage
