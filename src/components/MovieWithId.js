import React, { useState, useEffect } from 'react';
import { PersonMovieRenderer } from './PersonMovieRenderer';

export const MovieWithId = ({ match }) => {
    const [personData, setPersonData] = useState([]);
    const fetchData = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(items => {
                console.log("items");
                console.log(items);
                if (!items.errors) {
                    const allMovies = [...items.crew, ...items.cast];
                    setterFunc(allMovies);
                } else setterFunc([]);
            });
    }
    const createMovieWithId = (id) => {
        const URL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
        fetchData(URL, setPersonData);
    }
    useEffect(() => {
        createMovieWithId(match.params.personId);
    }, []);

    return (
        <PersonMovieRenderer personData={personData} />
    );
}