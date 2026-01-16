import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return "anecdote '" + action.payload + "' created"
    case 'VOTE':
      return "anecdote '" + action.payload + "' voted"
    case 'LENGTH_ERROR':
      return "too short anecdote, must have length 5 or more"
    case 'CLEAR':
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext