import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './Store'


// Define a type for the slice state

interface CashState {
    value: {}
}

// Define the initial state using that type
const initialState: CashState = {
    value: [],
} as CashState


export const CashSlice = createSlice({
    name: 'Cash',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateCash: (state, notifications: PayloadAction<(state: {}) => any >) => {
            state.value = notifications.payload(state.value)
        }
    },
})


export const { updateCash } = CashSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNotification = (state: RootState) => state.Notification

export default CashSlice.reducer