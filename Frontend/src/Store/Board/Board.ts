import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state

interface BoardState {
    value: any
}


// Define the initial state using that type
const initialState: BoardState = {
    value: {},
} as BoardState

export const BoardSlice = createSlice({
    name: 'Board',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateSelectedBoard: (state, selectedBoard: PayloadAction<{
            projectId: string,
            board: string
        }>) => {
            var PrevData = state.value[selectedBoard.payload.projectId] ?? {};
            state.value = { ...state.value, [selectedBoard.payload.projectId]: { ...PrevData, selectedBoard: selectedBoard.payload.board } }
        }
    },
})

export const { updateSelectedBoard } = BoardSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default BoardSlice.reducer