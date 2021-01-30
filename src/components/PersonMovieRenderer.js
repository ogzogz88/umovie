import React from 'react';
import { ResultCard } from './ResultCard';

export const PersonMovieRenderer = ({ personData, isDirector, isActor }) => {

    if (isDirector) {

        return (
            <div className="container movie-container">
                <ul className="results">
                    {
                        personData.map(movie => {
                            if (movie.job === 'Director') {
                                return (
                                    <li key={movie.id}>
                                        <ResultCard movie={movie} />
                                    </li>
                                );
                            }
                            else return null;

                        }
                        )
                    }
                </ul>
            </div >

        );
    } else if (isActor) {

        return (
            <div className="container movie-container">
                <ul className="results">
                    {
                        personData.map(movie => (
                            <li key={movie.id}>
                                <ResultCard movie={movie} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    } else return (<></>);

}