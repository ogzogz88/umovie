import React, { useState, useEffect } from 'react';
import { PersonMovieRenderer } from './PersonMovieRenderer';

export const MovieWithId = ({ match }) => {
    const [personMovies, setPersonMovies] = useState([]);
    const [personName, setPersonName] = useState([{ name: "ogz" }]);
    const fetchMovieData = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(items => {
                if (!items.errors) {
                    const allMovies = [...items.crew, ...items.cast];
                    let filteredAllMovies = [];
                    allMovies.forEach(function (movie) {
                        let i = filteredAllMovies.findIndex(x => x.id === movie.id);
                        if (i <= -1) {
                            filteredAllMovies.push(movie);
                        }
                    });
                    setterFunc(filteredAllMovies);
                } else setterFunc([]);
            });
    };
    const fetchPersonName = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(items => {
                console.log("itemssszz");
                console.log(items);

                if (!items.errors) {
                    setterFunc(items);
                    console.log(personName);
                } else setterFunc("aa");
            });
    };
    const createMovieWithId = (id) => {

        const URL_NAME = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
        fetchPersonName(URL_NAME, setPersonName);
        const URL_MOVIE = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
        fetchMovieData(URL_MOVIE, setPersonMovies);
    };
    useEffect(() => {
        createMovieWithId(match.params.personId);
    }, []);

    return (
        <PersonMovieRenderer personData={personMovies} personName={personName} />
    );
}