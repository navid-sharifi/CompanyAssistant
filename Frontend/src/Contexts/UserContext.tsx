
import { User } from './../Model/User'

import { createContext } from 'react';

export const UserContext = createContext<{ user: any | User, setUser: any }>({
    user: null, setUser: null
});
