import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import DarkModeToggleSet from "./DarkModeToggleSet";


const Header = () => {

    return (
        <header>
            <div className='container'>
                <div className='inner-content'>

                    <div className='brand'>
                        <Link to='/'>UMovie</Link>
                    </div>
                    <ul className="nav-links">
                        <li>
                            <NavLink to='/watchList' >WatchList</NavLink>
                        </li>
                        <li>
                            <NavLink to='/watched' >Watched</NavLink>
                        </li>
                        <li>
                            <Link to='/' className='btn'> Add</Link>
                        </li>
                        <li className="darkmode-button">
                            <DarkModeToggleSet />
                        </li>
                    </ul>

                </div>
            </div>
        </header>
    )
}

export default Header;
