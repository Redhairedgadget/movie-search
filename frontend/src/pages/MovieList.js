import React from 'react';
import MovieCard from '../components/MovieCard';
import './MovieList.css'

const MovieList = ({pageData}) => {
    return (
        <div className='movie-list'>
            {pageData.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
};

export default MovieList;
