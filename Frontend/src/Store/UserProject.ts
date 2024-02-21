import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompanyModel } from '../Model/CompanyModel'
import { ProjectModel } from '../Model/ProjectModel'

// Define a type for the slice state

interface UserProjectState {
    value?: ProjectModel[]
}


// Define the initial state using that type
const initialState: UserProjectState = {
    value: undefined,
} as UserProjectState

export const UserProjectSlice = createSlice({
    name: 'UserProject',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateUserProject: (state, UserProjects: PayloadAction<ProjectModel[] | undefined>) => {
            state.value = UserProjects.payload;
        }
    },
})

export const { updateUserProject } = UserProjectSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default UserProjectSlice.reducer