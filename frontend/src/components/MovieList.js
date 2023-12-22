import React from 'react';
import MovieItem from './MovieItem';
import './MovieList.css'

const MovieList = ({pageData}) => {
    return (
        <div className='movie-list'>
            {pageData.map(movie => (
                <MovieItem key={movie.id} movie={movie}/>
            ))}
        </div>
    );
};

export default MovieList;
