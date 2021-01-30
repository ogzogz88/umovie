import React, { useState, useEffect } from 'react';
import { ResultCard } from './ResultCard';
import { ResultCardPerson } from './ResultCardPerson';



export const Add = () => {
    const [query, setQuery] = useState('');
    const [queryPerson, setQueryPerson] = useState('');
    const [movies, setMovies] = useState([]);
    const [people, setPeople] = useState([]);
    const [bestMovies, setBestMovies] = useState([]);

    //fetching data only for the componentDidMount, so we used empty array [], as the second argument
    useEffect(() => {
        const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&page=1`;
        fetchData(URL, setBestMovies);

    }, []);


    const fetchData = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(items => {
                if (!items.errors) {
                    setterFunc(items.results);
                } else setterFunc([]);
            });
    }

    const onChangeMovie = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setQuery(val);
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&query=${query}&page=1&include_adult=false`;
        fetchData(URL, setMovies);
    }

    const onChangePerson = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setQueryPerson(val);
        const URL = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&query=${queryPerson}&page=1&include_adult=false`;
        fetchData(URL, setPeople);
        console.log(people);
    }



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
                <div className='add-content'>
                    <div className='input-wrapper'>
                        <input
                            type='text' placeholder='Search for a director or artist.'
                            value={queryPerson}
                            onChange={onChangePerson}
                        />
                        <button className='btn btn-clear'
                            onClick={() => { setQueryPerson('') }}
                        ><i className="fas fa-trash-alt"></i> </button>
                    </div>
                </div>
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
                (query === '' && queryPerson === '') && (
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
            {
                (query === '' && queryPerson !== '') && (
                    <div className="container movie-container">
                        <div className='filled-list'>
                            <h1>Director and artists information</h1>
                        </div>

                        <ul className="results">
                            {
                                people.map(person => (
                                    <li key={person.id}>
                                        <ResultCardPerson person={person} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                )
            }
        </div>
    )
}
