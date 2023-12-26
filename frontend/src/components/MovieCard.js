import React from 'react';
import './MovieCard.css';
import Tooltip from './Tooltip';

const MovieItem = ({ movie }) => {
  // Full URL for the poster
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: process.env.PUBLIC_URL + `/no-image.jpg`;

  const movieOverview = movie.overview || 'No description available :(';

  return (
    <div className='card' style={{backgroundImage: `url(${posterUrl})`}}>
      <Tooltip movieOverview={movieOverview}>
        <i className="fa fa-info" aria-hidden="true"></i>
      </Tooltip>
      <div className='card-details'>
        <h6>{movie.title}</h6>
        <div className='age-tag'>{ movie.adult ? '18+' : '0+'}</div>
      </div> 
    </div>
  );
};

export default MovieItem;