import React from 'react';
import './Tooltip.css'

const Tooltip = ({ movieOverview, children }) => {
    return (
        <div className="tooltip">
            <span className="tooltiptext">{movieOverview}</span>
            {children}
        </div>
    )
}

export default Tooltip;