import React from 'react'
import {Link} from 'react-router-dom'
import SearchBar from "./searchBar";

const Header = () => (
    <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className='container'>
            <Link className='navbar-brand' to='/'>Home</Link>
            <Link className='navbar-brand' to='/'>About Us</Link>
            <Link className='navbar-brand' to='/'>Contact Us</Link>
            <SearchBar/>
            <button>Search</button>
            <Link className='navbar-brand' to='/'>Login</Link>
            <Link className='navbar-brand' to='/'>Register</Link>
        </div>
    </nav>
)

export default Header
