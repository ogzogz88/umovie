import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';


export const ResultCard = ({ movie }) => {
    const { addMovieToWatchList, watchlist } = useContext(GlobalContext);

    //prevent adding a movie more than one. we control the watchlist and if the movie exists, storedMovieExists = TRUE
    let storedMovieExists = watchlist.find(item => item.id === movie.id);

    return (
        <div>
            <div className='result-card'>
                <div className="poster-wrapper">
                    {movie.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />)
                        : <div className='filler-poster'></div>
                    }
                </div>
                <div className="info">
                    <div className="header">
                        <h3 className="title">{movie.title}</h3>
                        <h4 className="release-date">

                            {movie.release_date ? movie.release_date.substring(0, 4) : '-'}
                        </h4>
                        <p className="movie-info">Average vote: {movie.vote_average}</p>
                        <p className="movie-info">Language: {movie.original_language}</p>

                    </div>
                    <div className="controls">
                        <button
                            className="btn btn-add"
                            onClick={() => addMovieToWatchList(movie)}
                            // we used storedValueExists value as the value of "disabled" property of our "Add to watchlist" button, this is
                            // an easy and quick solution for this use case.
                            disabled={storedMovieExists}>
                            Add to Watchlist
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}
