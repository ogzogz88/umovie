import React, { useState, useEffect } from 'react';
import { ResultCard } from './ResultCard';



export const Add = () => {
    const [query, setQuery] = useState('');
    const [queryPerson, setQueryPerson] = useState('');
    const [movies, setMovies] = useState([]);
    const [bestMovies, setBestMovies] = useState([]);

    //fetching data only for the componentDidMount, so we used empty array [], as the second argument
    useEffect(() => {
        const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&page=1`;
        fetchMovie(URL, setBestMovies);

    }, []);


    const fetchMovie = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(movies => {
                if (!movies.errors) {
                    setterFunc(movies.results);
                } else setterFunc([]);
            });
        console.log('Movie data :' + movies);
    }
    const onChangeMovie = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setQuery(val);
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&query=${query}&page=1&include_adult=false`;
        fetchMovie(URL, setMovies);
    }

    // const onChangePerson = (e) => {
    //     e.preventDefault();
    //     const val = e.target.value;
    //     setQuery(val);
    //     const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&query=${queryPerson}&page=1&include_adult=false`;
    //     fetchMovie(URL, setQueryPerson);
    // }



    return (
        <div className='add-page'>
            <div className='container'>
                <div className='add-content'>
                    <div className='input-wrapper'>
                        <input
                            type='text' placeholder='Search for a movie.'
                            value={query}
                            onChange={onChangeMovie}
                        />
                        <button className='btn btn-clear'
                            onClick={() => { setQuery('') }}
                        ><i className="fas fa-trash-alt"></i> </button>
                    </div>
                </div>
                {/* <div className='add-content'>
                    <div className='input-wrapper'>
                        <input
                            type='text' placeholder='Search for a director, actor, actress.'
                            value={queryPerson}
                        onChange={onChangePerson}
                        />
                        <button className='btn btn-clear'
                            onClick={() => { setQueryPerson('') }}
                        ><i className="fas fa-trash-alt"></i> </button>
                    </div>
                </div> */}
            </div>

            {/* the && operator actually returns the value of one of the specified operands, so if this operator is used with non-Boolean values, 
            it will return a non-Boolean value. */}

            {/* returning movies based on search input */}
            { (query !== '' && movies.length > 0) && (
                <div className="container movie-container">
                    <ul className="results">
                        {
                            movies.map(movie => (
                                <li key={movie.id}>
                                    <ResultCard movie={movie} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}

            {/*returning recommended movies, if search input in empty*/}
            {
                query === '' && (
                    <div className="container movie-container">
                        <div className='filled-list'>
                            <h1>Recommended movies!</h1>
                        </div>

                        <ul className="results">
                            {
                                bestMovies.map(movie => (
                                    <li key={movie.id}>
                                        <ResultCard movie={movie} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
            {/* {
                (query === '' && queryPerson !== '' && movies.length === 0) && (
                    <div className="container movie-container">
                        <div className='filled-list'>
                            <h1>Director and artists information</h1>
                        </div>

                        <ul className="results">
                            {
                                bestMovies.map(movie => (
                                    <li key={movie.id}>
                                        <ResultCard movie={movie} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                )
            } */}
        </div>
    )
}
