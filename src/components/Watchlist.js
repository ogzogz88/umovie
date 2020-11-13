import React, { useContext } from 'react';
import { MovieRenderer } from './MovieRenderer';
import { GlobalContext } from '../context/GlobalState';



export const Watchlist = () => {
    const context = useContext(GlobalContext);
    const movies = context.watchlist;
    return (
        <>
            {
                movies.length > 0 ? (
                    <div className="container movie-container">
                        <div className='filled-list'>
                            <h1>Your Watchlist</h1>
                        </div>
                        <ul className="results">
                            {
                                movies.map(movie => (
                                    <li key={movie.id}>
                                        {/* <WatchListRenderer movie={movie} context={context} /> */}
                                        <MovieRenderer
                                            movie={movie}
                                            context={context}
                                            onClickAdd={() => { context.addMovieToWatched(movie); context.removeMovieFromWatchList(movie) }}
                                            onClickRemove={() => { context.removeMovieFromWatchList(movie) }}
                                            addText={'Add to Watched'}
                                            removeText={'Remove'}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) :
                    <div className="container empty-list">
                        <h1>Your Watchlist is empty</h1>
                    </div>
            }
        </>
    );
}
