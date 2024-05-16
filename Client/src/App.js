
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  return (
    // defining routing
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
