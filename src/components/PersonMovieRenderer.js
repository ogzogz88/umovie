import React from 'react';
import { ResultCard } from './ResultCard';

export const PersonMovieRenderer = ({ personData }) => {


    return (
        <div className="container movie-container">
            <div>deneme</div>
            <ul className="results">
                {
                    personData.map(movie => {
                        return (
                            <li key={movie.id}>
                                <ResultCard movie={movie} />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}