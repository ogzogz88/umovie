import React from 'react';
import { Link } from 'react-router-dom';

export const ResultCardPerson = ({ person }) => {
    return (
        <>
            <div className='result-card'>
                <div className="poster-wrapper">
                    {person.profile_path ? (
                        <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={`${person.name} poster`} />)
                        : <div className='filler-poster'></div>
                    }
                </div>
                <div className="info">
                    <div className="header">
                        <h3 className="title">{person.name}</h3>
                        <p className="movie-info">Job: {person.known_for_department}</p>
                    </div>
                    <div className="controls">
                        <Link to={`/movies/${person.id}`}>
                            <button className="btn btn-add btn-full-width">Movies</button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}

