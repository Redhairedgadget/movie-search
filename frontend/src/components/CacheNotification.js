import './CacheNotification.css'

const CacheNotification = ({query, totalResults, cached, hits}) => {
    const hitsMessage = process.env.REACT_APP_ENVIRONMENT === 'dev'  ? ` Repeated query hits in the last 2 mins: ${hits}.` : '';

    return (            
        <div className="render-notification">
            {query ? 
                totalResults > 0 ? 
                    (cached ? 
                        `This result is rendered from cache.` + hitsMessage
                        : 
                        `This result is rendered from TMDB server`)
                :
                    'Sorry, no results. Try searching something else.'
            :
            'Nothing to display without input. Use the search bar!'
            }
        </div>
    )
}

export default CacheNotification;