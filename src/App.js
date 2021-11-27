import './App.css';
import Topbar from './components/topbar/topbar'
import SideBar from './components/sidebar/sidebar'
import Home from './components/pages/home/home'
import UserList from './components/userList/userList'
import User from './components/pages/user/user'
import NewUser from './components/pages/user/newUser'
import Horarios from './components/pages/horarioClase/horario'
import HorariosAdmin from './components/pages/horarioClase/horarioAdmin'

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
              <Route path='/horarios' element={<Horarios/>}/>
              <Route path='/horariosAdmin' element={<HorariosAdmin/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
