import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompanyModel } from '../Model/CompanyModel'

// Define a type for the slice state

interface UserCompanyState {
    value?: CompanyModel[]
}

// Define the initial state using that type
const initialState: UserCompanyState = {
    value: undefined,
} as UserCompanyState

export const UserCompanySlice = createSlice({
    name: 'UserCompany',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateUserCompany: (state, UserCompanies: PayloadAction<CompanyModel[] | undefined>) => {
            state.value = UserCompanies.payload;
        }
    },
})


export const { updateUserCompany } = UserCompanySlice.actions
export default UserCompanySlice.reducer