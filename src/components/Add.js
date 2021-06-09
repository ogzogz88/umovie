import React, { useState, useEffect, useContext } from 'react';
import { ResultCard } from './ResultCard';
import { ResultCardPerson } from './ResultCardPerson';
import { SearchBar } from './SearchBar';
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
        if (person.length === 0) {
            fetchBestMovies();
        }

    }, []);

    const fetchBestMovies = () => {
        const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-EN&page=1`;
        fetchData(URL, setBestMovies);
    }

    const removeAll = () => {
        setQueryPerson('');
        setQuery('');
        removePeople();
    }

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

    const dataToRender = [
        {
            condition: query !== '' && movies.length > 0,
            header: "Movies for you!",
            Component: ResultCard,
            data: movies
        },
        {
            condition: query === '' && queryPerson === '' && bestMovies.length,
            header: "Recommended movies!",
            Component: ResultCard,
            data: bestMovies
        },
        {
            condition: query === '' && queryPerson !== '',
            header: "Director and artists information",
            Component: ResultCardPerson,
            data: people
        },
        {
            condition: query === '' && queryPerson === '' && people.length > 0,
            header: "Director and artists information",
            Component: ResultCardPerson,
            data: person
        }
    ]
    const renderItems = (data, header, Component) => {
        return (
            <div className="container movie-container">
                <div className='filled-list'>
                    <h1> {header}</h1>
                </div>
                <ul className="results">
                    {
                        data && data.map(item => (
                            <li key={item.id}>
                                <Component element={item} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }


    return (
        <div className='add-page'>
            <SearchBar
                query={query}
                onChangeMovie={onChangeMovie}
                queryPerson={queryPerson}
                onChangePerson={onChangePerson}
                setQuery={setQuery}
                setQueryPerson={setQueryPerson}
                removeAll={removeAll}
                fetchBestMovies={fetchBestMovies} />
            {
                dataToRender[0].condition && renderItems(dataToRender[0].data, dataToRender[0].header, dataToRender[0].Component)
            }
            {
                dataToRender[1].condition && renderItems(dataToRender[1].data, dataToRender[1].header, dataToRender[1].Component)
            }
            {
                dataToRender[2].condition && renderItems(dataToRender[2].data, dataToRender[2].header, dataToRender[2].Component)
            }
            {
                dataToRender[3].condition && renderItems(dataToRender[3].data, dataToRender[3].header, dataToRender[3].Component)
            }

        </div>
    )
}
