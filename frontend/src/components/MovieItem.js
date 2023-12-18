import React from 'react';
//TODO: use css modules?
import './MovieItem.css';

const MovieItem = ({ movie }) => {
// Full URL for the poster
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <article className="movie-item">
        <img src={posterUrl} alt={movie.title} className='movie-image'/>
        <div className="movie-details">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <p>Language: {movie.original_language}</p>
            <p>{movie.overview}</p>
        </div>
    </article>
  );
};

export default MovieItem;