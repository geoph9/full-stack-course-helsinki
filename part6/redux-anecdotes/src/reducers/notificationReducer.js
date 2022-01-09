const defaultState = 'Notification Space'
let timeoutID = null

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

export const setNotification = (notification, nSeconds=5 ) => {
  return async dispatch => {
    if (timeoutID) clearTimeout(timeoutID)
    dispatch({ type: 'NEW_NOTIFICATION', notification })
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, Math.floor(nSeconds * 1000))
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer