import React, { useState, useEffect, useContext } from 'react';
import { ResultCard } from './ResultCard';
import { ResultCardPerson } from './ResultCardPerson';
import { GlobalContext } from '../context/GlobalState';




export const Add = () => {
    const { addPeople, person, removePeople } = useContext(GlobalContext);
    const [query, setQuery] = useState('');
    const [queryPerson, setQueryPerson] = useState('');
    const [movies, setMovies] = useState([]);
    const [people, setPeople] = useState(person);
    const [bestMovies, setBestMovies] = useState([]);

    //fetching data only for the componentDidMount, so we used empty array [], as the second argument
    useEffect(() => {
        const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&page=1`;
        if (person.length === 0) {
            fetchData(URL, setBestMovies);
        }

    }, []);

    const fetchData = async (URL, setterFunc) => {
        await fetch(URL)
            .then(data => data.json())
            .then(items => {
                if (!items.errors) {
                    setterFunc(items.results);
                    if (setterFunc == setPeople) {
                        addPeople(items.results);
                    }
                } else setterFunc([]);
            });
    }

    const onChangeMovie = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setQuery(val);
        //used val instead of query. query gets the correct value BUT, the URL variable is not uptodate with it.
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&query=${val}&page=1&include_adult=false`;
        fetchData(URL, setMovies);
    }

    const onChangePerson = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setQueryPerson(val);
        //used val instead of queryPerson. queryPerson gets the correct value BUT, the URL variable is not uptodate with it.
        const URL = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&query=${val}&page=1&include_adult=false`;
        fetchData(URL, setPeople);
        setBestMovies([]);
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

            {/* return movies based on search input */}
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

            {/*return recommended movies, if search input in empty*/}
            {
                (query === '' && queryPerson === '' && bestMovies.length > 0) && (
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
            {/*return artists or director if query exists*/}
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
            {/*return artists or director from existing query*/}
            {
                (query === '' && queryPerson === '' && people !== null) && (
                    <div className="container movie-container">
                        <div className='filled-list'>
                            <h1>Director and artists information</h1>
                        </div>

                        <ul className="results">
                            {
                                person.map(person => (
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
