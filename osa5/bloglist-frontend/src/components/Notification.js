import React from 'react'

const Notification = ({ message, id }) => {
    if (message === null) {
        return null
    }

    if(id===1) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification