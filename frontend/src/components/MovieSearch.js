import React, { useState } from 'react';
import MovieItem from './MovieItem';
// TODO: use css modules?
import './MovieSearch.css'

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    // TODO: displaying hits isn't required, but perhaps it's convenient for review purposes. Delete if not needed
    const [hits, setHits] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/search/?query=${query}`);
            const res = await response.json();
            
            setResults(res.data.results || []);
            setHits(res.hits);
            setTotalPages(res.data.total_pages)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };


    const handlePageChange = async (i) => {
        try {
            const response = await fetch(`http://localhost:8000/api/search/?query=${query}&page=${i}`);
            const res = await response.json();
            console.log(res)
            setResults(res.data.results || []);
            setHits(res.hits);
            setTotalPages(res.data.total_pages)
        } catch(error) {
            console.error('Error fetching search results:', error);
        }
    }

    return (
        <div>
            <form className='search-bar'>
                <input type="text" value={query} placeholder="Search movies..." onChange={(e) => setQuery(e.target.value)} />
                <button type="submit" onClick={handleSearch}>Submit</button>
            </form>

            {results.length > 0 ? 
            
            <div>
                {hits > 0 ? 
                    `This result is rendered from cache. In last two minutes this request was made ${hits} times.`
                : 
                    `This result is rendered from server`
                }
            </div> : null
            }

            <div className='movie-list'>
                {results.map(movie => (
                    <MovieItem key={movie.id} movie={movie}/>
                ))}
            </div>

            <div className='pagination'>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
