import React from 'react';

export const SearchBar = ({ query, onChangeMovie, queryPerson, onChangePerson, setQuery, setQueryPerson, removeAll, fetchBestMovies }) => {
    return (
        <div className='container'>
            <div className='add-content'>
                <div className='input-wrapper'>
                    <input
                        type='text' placeholder='Search for a movie.'
                        value={query}
                        onChange={onChangeMovie}
                    />
                    <button className='btn btn-clear'
                        onClick={() => { setQuery('') }}
                    ><i className="fas fa-trash-alt"></i> </button>
                </div>
            </div>
            <div className='add-content'>
                <div className='input-wrapper'>
                    <input
                        type='text' placeholder='Search for a director or artist.'
                        value={queryPerson}
                        onChange={onChangePerson}
                    />
                    <button className='btn btn-clear'
                        onClick={() => { setQueryPerson('') }}
                    ><i className="fas fa-trash-alt"></i> </button>
                </div>
            </div>
            <div className='add-content'>
                <div className='input-wrapper'>
                    <button className='btn btn-clear btn-clear-all'
                        onClick={() => {
                            removeAll();
                            fetchBestMovies();
                        }}
                        style={{ display: "flex", justifyContent: "space-between", fontWeight: 'lighter', textTransform: 'none', padding: '1rem' }}
                    >Clear All<i className="fas fa-trash-alt"></i> </button>
                </div>
            </div>
        </div>
    );
}

