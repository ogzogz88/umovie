import React from 'react';
import { Link } from 'react-router-dom';

export const ResultCardPerson = ({ element }) => {
    return (
        <>
            <div className='result-card'>
                <div className="poster-wrapper">
                    {element.profile_path ? (
                        <img src={`https://image.tmdb.org/t/p/w200${element.profile_path}`} alt={`${element.name} poster`} />)
                        : <div className='filler-poster'></div>
                    }
                </div>
                <div className="info">
                    <div className="header">
                        <h3 className="title">{element.name}</h3>
                        <p className="movie-info">Job: {element.known_for_department}</p>
                    </div>
                    <div className="controls">
                        <Link to={`/movies/${element.id}`}>
                            <button className="btn btn-add btn-full-width">Movies</button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}

