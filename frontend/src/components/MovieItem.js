import React from 'react';
//TODO: use css modules?
import './MovieItem.css';
import Tooltip from './Tooltip';

const MovieItem = ({ movie }) => {
  // Full URL for the poster
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: process.env.PUBLIC_URL + `/no-image.jpg`;

  const movieOverview = movie.overview || 'No description available :(';

  return (
    <div className='movie-item' style={{backgroundImage: `url(${posterUrl})`}}>
      <Tooltip movieOverview={movieOverview}>
        <i class="fa fa-info" aria-hidden="true"></i>
      </Tooltip>
        <div className='movie-details'>
          <h6>{movie.title}</h6>
        </div> 
    </div>
  );
};

export default MovieItem;