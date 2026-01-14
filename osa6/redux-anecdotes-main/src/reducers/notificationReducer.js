import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification() {
      return ''
    }
  }
})

const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
