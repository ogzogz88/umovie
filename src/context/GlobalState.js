import React, { useReducer, useEffect, createContext } from 'react';
import { AppReducer } from './AppReducer';
//initial state
const initialState = {
    watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [],
    watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : [],
    person: []
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //saving our state in the localStorage, whenever our state changes
    useEffect(() => {
        const watchlist = JSON.stringify(state.watchlist);
        localStorage.setItem('watchlist', watchlist);
        const watched = JSON.stringify(state.watched);
        localStorage.setItem('watched', watched);
    }, [state]);

    //actions
    const addMovieToWatchList = (movie) => {
        dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie })
    }
    const addMovieToWatched = (movie) => {
        dispatch({ type: 'ADD_MOVIE_TO_WATCHED', payload: movie })
    }
    const removeMovieFromWatchList = (movie) => {
        dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: movie })
    }
    const removeMovieFromWatched = (movie) => {
        dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHED', payload: movie })
    }
    const addPeople = (person) => {
        dispatch({ type: 'ADD_PEOPLE', payload: person })
    }
    const removePeople = (person) => {
        dispatch({ type: 'REMOVE_PEOPLE', payload: person })
    }


    return (
        //addMovieToWatchList AND addMovieToWatchList:addMovieToWatchList is SAME HERE
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                person: state.person,
                addMovieToWatchList, addMovieToWatched, removeMovieFromWatchList, removeMovieFromWatched, addPeople, removePeople
            }}>
            {props.children}
        </GlobalContext.Provider>
    );
}