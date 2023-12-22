import './CacheNotification.css'

const CacheNotification = ({cached, hits}) => {

    return (            
        <div className="render-notification">
            {cached ? 
                `This result is rendered from cache. Repeated query hits in the last 2 mins: ${hits}.`
            : 
                `This result is rendered from TMDB server`
            }
        </div>
    )
}

export default CacheNotification;