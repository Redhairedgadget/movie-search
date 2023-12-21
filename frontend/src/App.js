import React, { useState } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import Header from './components/Header';
import Pagination from './components/Pagination';
import CacheNotification from './components/CacheNotification';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    // TODO: displaying hits isn't required, but perhaps it's convenient for review purposes. Delete if not needed
    const [hits, setHits] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const sendRequest = async (page=null) => {
        try {
            const response = await fetch(`http://localhost:8000/api/search/?query=${query}${page ? `&page=${page}`: ''}`);
            const res = await response.json();

            setResults(res.data.results || []);
            setHits(res.hits);
            setTotalPages(res.data.total_pages)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    return (
        <div>
            <Header query={query} setQuery={setQuery} sendRequest={sendRequest}/>
            {results.length > 0 && <CacheNotification hits={hits}/>}
            <MovieList results={results} />
            {results.length > 1 && <Pagination totalPages={totalPages} sendRequest={sendRequest}/>}
        </div>
    );
}

export default App;