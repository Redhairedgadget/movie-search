import React, { useEffect, useState } from 'react';
import MovieList from './pages/MovieList';
import './App.css';
import Header from './layout/Header';
import Pagination from './layout/Pagination';
import CacheNotification from './components/CacheNotification';
import './Spinner.css';

function App() {
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({});
    const [hits, setHits] = useState(0);

    const [cachedStatus, setCached] = useState(false);

    // Pages
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const handleRequest = async (nextPage=null) => {
        if (query) {
            try {
                if((nextPage && !(nextPage in results)) || !nextPage) {
                    setLoading(true);
                    setCached(false);
                    
                    await getQuery(nextPage);
                } else {
                    setCached(true);
                }
                await getHits();
            } catch (error) {
                console.error('Error fetching search results: ', error);
            } finally {
                setLoading(false);
            }
        } else {
            setResults({});
        }
    }

    const getQuery = async (nextPage=null) => {
        const moviesResult = await (await fetch(`${process.env.REACT_APP_BASE_URL}/api/search/?query=${query}${nextPage ? `&page=${nextPage}`: ''}`)).json();

        if(!nextPage) setPage(1);

        setResults(moviesResult.pages || {});
        setTotalPages(moviesResult.pages[nextPage || 1].data.total_pages);
    }

    const getHits = async () => {
        const hitsResult = await (await fetch(`${process.env.REACT_APP_BASE_URL}/api/get-hits/?query=${query}`)).json();
        setHits(hitsResult.hits);
    }

    useEffect(() => { handleRequest()}, [query]);

    return (
        <div>
            <Header query={query} setQuery={setQuery} handleRequest={handleRequest} loading={loading}/>
                {loading ? 
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                : 
                <>
                        <CacheNotification query={query} totalResults={results[page]?.data?.total_results} cached={cachedStatus} hits={hits}/>
                        <MovieList pageData={results[page]?.data?.results ?? []} />
                    </>
                }

                {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} handleRequest={handleRequest} loading={loading} /> }
        </div>
    );
}

export default App;