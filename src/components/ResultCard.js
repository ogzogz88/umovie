import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';


export const ResultCard = ({ element }) => {
    const { addMovieToWatchList, watchlist, watched } = useContext(GlobalContext);

    //prevent adding a movie more than one. we control the watchlist and if the movie exists, storedMovieExists = TRUE
    let allMovies = [...watchlist, ...watched];
    let storedMovieExists = allMovies.find(item => item.id === element.id);

    return (
        <>
            <div className='result-card'>
                <div className="poster-wrapper">
                    {element.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w200${element.poster_path}`} alt={`${element.title} poster`} />)
                        : <div className='filler-poster'></div>
                    }
                </div>
                <div className="info">
                    <div className="header">
                        <h3 className="title">{element.title}</h3>
                        <h4 className="release-date">

                            {element.release_date ? element.release_date.substring(0, 4) : '-'}
                        </h4>
                        <p className="movie-info">Average vote: {element.vote_average}</p>
                        <p className="movie-info">Language: {element.original_language}</p>

                    </div>
                    <div className="controls">
                        <button
                            className="btn btn-add btn-full-width"
                            onClick={() => addMovieToWatchList(element)}
                            // we used storedValueExists value as the value of "disabled" property of our "Add to watchlist" button, this is
                            // an easy and quick solution for this use case.
                            disabled={storedMovieExists}>
                            Add to Watchlist
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}
