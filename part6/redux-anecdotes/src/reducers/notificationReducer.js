const defaultState = 'Notification Space'

const notificationReducer = (state = defaultState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
        return defaultState
    default:
      return state
  }

}

export const setNotification = notification => {
  return {
    type: 'NEW_NOTIFICATION',
    notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer