import React from 'react'
import Logo from '../assets/tmdb-logo.svg';

const Footer = () => {
    return (

        <footer>
            <div className='footer-wrapper'>
                <h5 className='footer-text'>powered by </h5>
                <a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer'>
                    <img src={Logo} alt='The Movie Database' />
                </a>
            </div>
        </footer>

    )
}

export default Footer;