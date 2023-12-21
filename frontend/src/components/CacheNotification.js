import './CacheNotification.css'

const CacheNotification = ({hits}) => {

    return (            
        <div className="render-notification">
            {hits > 0 ? 
                `This result is rendered from cache. In last two minutes this request was made ${hits} times.`
            : 
                `This result is rendered from TMDB server`
            }
        </div>
    )
}

export default CacheNotification;