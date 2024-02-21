import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './Store'
import  Notification from '../Model/Notification'

// Define a type for the slice state

interface NotificationsState {
    value: Notification[]
}

// Define the initial state using that type
const initialState: NotificationsState = {
    value: [],
} as NotificationsState


export const NotificationsSlice = createSlice({
    name: 'Notifications',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateNotification: (state, notifications: PayloadAction<Notification[]>) => {
            
            state.value = notifications.payload;
        }
    },
})


export const { updateNotification } = NotificationsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNotification = (state: RootState) => state.Notification

export default NotificationsSlice.reducer