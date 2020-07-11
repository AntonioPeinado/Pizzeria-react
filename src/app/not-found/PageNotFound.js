import React from 'react';
import ghost from './ghost.svg'
import './pageNotFound.css'

export default function PageNotFound(){

    return(
      <div className="not-found">
        <h1 className="not-found__title">4
          <span className="not-found__animation">
            <img src={ghost} alt="" className='not-found__image'></img>
          </span>4
        </h1>
        <h3 className="not-found__subtitle">Error: 404 page not found</h3>
        <p className="not-found__body">Sorry, the page you're looking for cannot be accessed</p>
      </div>
    )
  }