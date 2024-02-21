import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getToken, setToken } from '../Utilities/Http/StorageUtils'

// Define a type for the slice state

interface UserTokenState {
    value: string
}

// Define the initial state using that type
const initialState: UserTokenState = {
    value: getToken(),
} as UserTokenState

export const UserTokenSlice = createSlice({
    name: 'UserToken',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateUserToken: (state, UserToken: PayloadAction<string>) => {
            state.value = UserToken.payload;
            setToken(UserToken.payload)
        }
    },
})

export const { updateUserToken } = UserTokenSlice.actions

// Other code such as selectors can use the imported `RootState` type


export default UserTokenSlice.reducer