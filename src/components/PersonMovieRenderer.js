import React from 'react';
import { ResultCard } from './ResultCard';

export const PersonMovieRenderer = ({ personData, personName }) => {


    return (
        <div className="container movie-container">
            <div>deneme{personName}</div>
            <ul className="results">
                {
                    personData.map(movie => {
                        return (
                            <li key={movie.id}>
                                <ResultCard element={movie} />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}