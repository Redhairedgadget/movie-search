import './CacheNotification.css'

const CacheNotification = ({cached, hits}) => {
    const hitsMessage = process.env.REACT_APP_ENVIRONMENT === 'dev'  ? ` Repeated query hits in the last 2 mins: ${hits}.` : '';

    return (            
        <div className="render-notification">
            {cached ? 
                `This result is rendered from cache.` + hitsMessage
            : 
                `This result is rendered from TMDB server`
            }
        </div>
    )
}

export default CacheNotification;