const messageAtStart = null

const notificationReducer = (state = messageAtStart, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'HIDE_MESSAGE':
            return null
        default:
            return state
    }
  }

export const setMessage = (message) => {
    return {
        type: 'SET_MESSAGE',
        message
    }
}

export const hideMessage = () => {
    return {
        type: 'HIDE_MESSAGE'
    }
}

export default notificationReducer