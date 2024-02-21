import { configureStore } from '@reduxjs/toolkit'
import NotificationReducer from './Notification';
import CashReducer from './Cash';
import UserTokenReducer from './UserToken';
import UserCompanyReducer from './UserCompany';
import UserProjectReducer from './UserProject';

export const Store = configureStore({
    reducer: {
        Notification: NotificationReducer,
        Cash: CashReducer,
        UserToken: UserTokenReducer,
        UserCompany: UserCompanyReducer,
        UserProject: UserProjectReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch

