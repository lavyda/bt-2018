import React from 'react'
import { NavLink } from 'react-router-dom'
import './HeaderNavigation.css'

const HeaderNavigation = () => (
    <nav className='header-nav'>
        <NavLink exact to="/" activeClassName='is-active'>Results</NavLink>
        <NavLink exact to="/history" activeClassName='is-active'>History</NavLink>
        <NavLink exact to="/about" activeClassName='is-active'>About</NavLink>
    </nav>
)

export default HeaderNavigation