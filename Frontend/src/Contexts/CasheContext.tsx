import { createContext } from 'react';

export const CasheContext = createContext<{ cashe: any, setCashe: any }>({cashe : null, setCashe : null});