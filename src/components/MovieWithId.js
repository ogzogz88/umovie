import React, { useState, useEffect } from 'react';
import { PersonMovieRenderer } from './PersonMovieRenderer';

export const MovieWithId = ({ match }) => {
    const [personMovies, setPersonMovies] = useState([]);
    const fetchData = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(items => {
                console.log(personMovies);
                if (!items.errors) {
                    const allMovies = [...items.crew, ...items.cast];
                    setterFunc(allMovies);
                } else setterFunc([]);
            });
    }
    const createMovieWithId = (id) => {
        const URL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
        fetchData(URL, setPersonMovies);
    }
    useEffect(() => {
        createMovieWithId(match.params.personId);
    }, []);

    return (
        <PersonMovieRenderer personData={personMovies} />
    );
}