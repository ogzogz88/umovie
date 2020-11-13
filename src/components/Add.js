import React, { useState } from 'react';
import { ResultCard } from './ResultCard';



export const Add = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const fetchMovie = async (URL) => {
        await fetch(URL)
            .then(data => data.json())
            .then(movies => {
                if (!movies.errors) {
                    setMovies(movies.results);
                } else setMovies([]);
            });
        console.log('Movie data :' + movies);
    }
    const onChange = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setQuery(val);
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&query=${query}&page=1&include_adult=false`;
        fetchMovie(URL);
    }

    return (
        <div className='add-page'>
            <div className='container'>
                <div className='add-content'>
                    <div className='input-wrapper'>
                        <input
                            type='text' placeholder='Search for a movie.'
                            value={query}
                            onChange={onChange}
                        />
                        <button className='btn btn-clear'
                            onClick={() => { setQuery('') }}
                        >CLEAR</button>
                    </div>
                </div>
            </div>

            {/* the && operator actually returns the value of one of the specified operands, so if this operator is used with non-Boolean values, 
            it will return a non-Boolean value. */}
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
        </div>
    )
}
