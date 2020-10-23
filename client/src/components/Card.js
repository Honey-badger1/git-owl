import React from "react";
import {Link} from 'react-router-dom'
import 'materialize-css'

export const Card = () => (
      <div className="card">
        <div className="card-image">
          <img src="https://picsum.photos/500" alt={''} className=""/>
            <span className="card-title">Card Title</span>
        </div>
        <div className="card-action">
          <Link to={'/profile/'} className="" >Open</Link>
        </div>
      </div>
)
