import logo from './logo.svg';
import './App.css';
import Topbar from './components/topbar/topbar'
import SideBar from './components/sidebar/sidebar'
import Home from './components/pages/home/home'
import UserList from './components/userList/userList'
import User from './components/pages/user/user'
import NewUser from './components/pages/user/newUser'

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ClaseList from './components/claseList/claseList';
import Clase from './components/pages/clase/clase';
import NewClase from './components/pages/clase/newClase'

function App() {
  return (
    <Router>
        <Topbar />
        <div className='container'>
          <SideBar />
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/users' element={<UserList/>}/>
              <Route path='/user/:userId' element={<User/>}/>
              <Route path='/newUser' element={<NewUser/>}/>
              <Route path='/clases' element={<ClaseList/>}/>
              <Route path='/clase/:claseId' element={<Clase/>}/>
              <Route path='/newClase' element={<NewClase/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
