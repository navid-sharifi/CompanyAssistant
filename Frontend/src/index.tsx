import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { User } from './Model/User';
import { getCredentials } from './Utilities/Http/StorageUtils';
import { CasheContext } from './Contexts/CasheContext';
import { UserContext } from './Contexts/UserContext';
import { Provider } from 'react-redux'
import { Store } from './Store/Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const MainContainer = () => {
  var [user, setUser] = useState<User | null>(getCredentials());
  var [cashe, setCashe] = useState<any>({});

  return (

        <CasheContext.Provider value={{ cashe, setCashe }}>
          <UserContext.Provider value={{ user, setUser }}>
              <Provider store={Store}>
                <App />
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </Provider>
          </UserContext.Provider>
        </CasheContext.Provider>
  )
}

root.render(
  <MainContainer />
);

reportWebVitals();
