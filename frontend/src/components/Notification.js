import './Notification.css'

const Notification = ({type='info', message}) => {

    return (            
        <div className={`notification ${type}`}>
            {message}
        </div>
    )
}

export default Notification;