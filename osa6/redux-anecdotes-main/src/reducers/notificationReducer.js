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

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
