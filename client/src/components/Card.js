import React from "react";
import {Link} from 'react-router-dom'
import 'materialize-css'

export const Card = ({user}) => (
      <div className="card">
        <div className="card-image">
          <img src={user.avatar_url} alt={user.login} className=""/>
            <span className="card-title">{user.login}</span>
        </div>
        <div className="card-action">
          {/*<Link to={`/profile/${user.login}`} className="" >Open</Link>*/}
          <Link to={'/profile/' + user.login} className="" >Open</Link>
        </div>
      </div>
)
