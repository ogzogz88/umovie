import React, { useState } from 'react';
import { PersonMovieRenderer } from './PersonMovieRenderer';

export const ResultCardPerson = ({ person }) => {
    const [personData, setPersonData] = useState([]);
    const isDirector = person.known_for_department === 'Directing';
    const isActor = person.known_for_department === 'Acting';


    const fetchData = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(items => {
                if (!items.errors) {
                    isDirector ? setterFunc(items.crew) : isActor ? setterFunc(items.cast) : setterFunc([]);
                } else setterFunc([]);

            });
        //console.log('person data:' + personData);
    }
    const handleClickMovie = (e, id) => {
        e.preventDefault();
        //console.log('person id: ' + id);
        const URL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
        fetchData(URL, setPersonData);

    }
    const handleClickMovieReset = (e) => {
        e.preventDefault();
        setPersonData([]);
    }

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
                        <button
                            className="btn btn-add"
                            onClick={(e) => handleClickMovie(e, person.id)}
                        >
                            Movies
                        </button>
                        <button
                            className='btn btn-remove'
                            onClick={(e) => handleClickMovieReset(e)}
                        >
                            Collapse
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            {(personData.length > 0) && (
                <PersonMovieRenderer personData={personData} isActor={isActor} isDirector={isDirector} />
            )

            }
        </>

    );
}