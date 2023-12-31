import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './layout/Header';
import MovieList from './pages/MovieList';
import Pagination from './layout/Pagination';
import Notification from './components/Notification';
import './Spinner.css';

function App() {
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({});

    // Pages
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    // Notification messages
    const defaultMessage = 'Nothing to display without input. Use the search bar!';
    const noResultsMessage = 'Sorry, no results. Try searching something else.';
    const renderedFromServerMessage = 'This result is rendered from TMDB server';
    const cacheMessage = 'This result is rendered from cache.'

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState(defaultMessage)

    const handleRequest = async (nextPage=null) => {
        if (query) {
            setLoading(true);
            try {
                await getQuery(nextPage);
                setIsError(false);
            } catch (error) {
                setIsError(true);
                setMessage(`Error fetching search results: ${error.message}`)
            } finally {
                setLoading(false);
            }
        } else {
            setResults({});
            setIsError(false);
        }
    }

    const getQuery = async (nextPage = null) => {
        const { hits, pages } = await (await fetch(`${process.env.REACT_APP_BASE_URL}/api/search/?query=${query}${nextPage ? `&page=${nextPage}` : ''}`)).json();
        
        if(!nextPage) setPage(1);
        setResults(pages || {});
        setTotalPages(pages[nextPage || 1]?.data.total_pages || 1);

        const foundMovies = pages[nextPage || 1]?.data?.total_results > 0;
        
        if (foundMovies) {
            const cached = pages[nextPage || 1]?.cached;
            const hitsMessage = `Repeated query hits in the last 2 mins: ${hits}.`;
            const queryResultMessage = (cached ? cacheMessage : renderedFromServerMessage) + (process.env.REACT_APP_ENVIRONMENT === 'dev' ? ' ' + hitsMessage: '');
            setMessage(queryResultMessage);
        } else {
            setMessage(noResultsMessage);
        }
     };

    useEffect(() => { 
        if (query) {
            handleRequest();
        } else {
            setMessage(defaultMessage);
        }
    }, [query]);

    return (
        <>
           <Header query={query} setQuery={setQuery} handleRequest={handleRequest} loading={loading} />
           {loading ? (
              <div className="spinner-container">
                 <div className="spinner"></div>
              </div>
           ) : (
              <>
                 <Notification type={isError ? 'error': 'info'} message={message} />
                 <MovieList pageData={results[page]?.data?.results ?? []} />
              </>
           )}
           {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} handleRequest={handleRequest} loading={loading} />}
        </>
     );
}

export default App;