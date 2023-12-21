import React from 'react';
import MovieItem from './MovieItem';
import './MovieList.css'

const MovieList = ({results}) => {

    return (
        <div className='movie-list'>
            {results.map(movie => (
                <MovieItem key={movie.id} movie={movie}/>
            ))}
        </div>
    );
};

export default MovieList;
