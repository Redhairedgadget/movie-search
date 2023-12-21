import React from 'react';
//TODO: use css modules?
import './MovieItem.css';

const MovieItem = ({ movie }) => {
  // Full URL for the poster
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`: process.env.PUBLIC_URL + `/no-image.jpg`;

  return (
    <div className='movie-item' style={{backgroundImage: `url(${posterUrl})`}}>
        <div className='movie-details'>
          <h3>{movie.title}</h3>
        </div> 
    </div>
  );
};

export default MovieItem;