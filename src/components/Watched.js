import React, { useContext } from 'react';
import { MovieRenderer } from './MovieRenderer';
import { GlobalContext } from '../context/GlobalState';


export const Watched = () => {
    const context = useContext(GlobalContext);
    const movies = context.watched;
    return (
        <>
            {
                movies.length > 0 ? (
                    <div className="container movie-container">
                        <div className='filled-list'>
                            <h1>Your Watched Movies</h1>
                        </div>
                        <ul className="results">
                            {
                                movies.map(movie => (
                                    <li key={movie.id}>
                                        <MovieRenderer
                                            movie={movie} context={context}
                                            onClickAdd={() => { context.addMovieToWatchList(movie); context.removeMovieFromWatched(movie) }}
                                            onClickRemove={() => { context.removeMovieFromWatched(movie) }}
                                            removeText={'Remove'}
                                            addText={'Move to Watchlist'}

                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) :
                    <div className="container empty-list">
                        <h1>You haven't watched any movie yet!</h1>
                    </div>
            }
        </>
    );
}
