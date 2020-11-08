import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/Auth.context"
import logoIcon from '../assets/img/logo-owl.png'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper" style={{padding: '0 2rem'}}>
        <a href="/" className="brand-logo">
          <img src={logoIcon} style={{width: 93}} alt='logo'/>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to='/create'>Local</NavLink></li>
          <li><NavLink to='/links'>Github</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
};
