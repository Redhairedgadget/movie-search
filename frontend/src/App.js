import React, { useState } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import Header from './components/Header';
import Pagination from './components/Pagination';
import CacheNotification from './components/CacheNotification';
import { useDebounce } from './utils/debounce';
import './Spinner.css';

function App() {
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({});
    // TODO: displaying hits isn't required, but perhaps it's convenient for review purposes. Delete if not needed
    const [hits, setHits] = useState(0);

    // Pages
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const handleRequest = async (nextPage=null) => {
        setLoading(true);
        
        try {
            const response = await fetch(`http://localhost:8000/api/search/?query=${query}${nextPage ? `&page=${nextPage}`: ''}`);
            const res = await response.json();

            if(!nextPage) setPage(1);

            setResults(res.pages || []);
            setHits(res.hits);
            setTotalPages(res.pages[page].data.total_pages);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

        setLoading(false);
    }

    const debouncedRequest = useDebounce(handleRequest, 500);

    return (
        <div>
            <Header query={query} setQuery={setQuery} handleRequest={debouncedRequest} loading={loading}/>
                {loading ? 
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                : 
                    <>
                        {Object.keys(results).length > 0 && <CacheNotification cached={results[page]?.cached || false} hits={hits}/>}
                        <MovieList pageData={results[page]?.data?.results ?? []} />
                    </>
                }
                {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} handleRequest={debouncedRequest} results={results} /> }
        </div>
    );
}

export default App;