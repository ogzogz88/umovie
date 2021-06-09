import React from 'react';
import { ResultCard } from './ResultCard';
import { BreadCrumb } from './BreadCrumb';

export const PersonMovieRenderer = ({ personData, personName }) => {


    return (
        <div className="container movie-container">
            <BreadCrumb name={personName} />
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