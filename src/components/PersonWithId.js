import React from 'react';
import { ResultCard } from './ResultCard';

export const MovieWithId = ({ personData, isDirector, isActor }) => {
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
}
