import React from 'react';

export const MovieRenderer = ({ movie, onClick, buttonText }) => {
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
                        <button className="btn btn-add" onClick={() => onClick()}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}