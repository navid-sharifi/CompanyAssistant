import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserLoginPage } from './Pages/User/Login/UserLogin';
import { useAppSelector } from './Store/hooks';
import { CompanyListPage } from './Pages/Company/List/CompanyListPage';
import { ProjectListPage } from './Pages/Project/List/ProjectList';

function App() {

  var UserToken = useAppSelector(state => state.UserToken.value)
  if (!UserToken)
    return <UserLoginPage />

  return <Pages />
}

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div>404</div>} />
        <Route path='/' element={<CompanyListPage />} />
        <Route path='/Company/:companyId/Projects' element={<ProjectListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;