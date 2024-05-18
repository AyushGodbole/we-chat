
import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import SetAvatar from './Pages/SetAvatar';
function App() {
  return (
    // defining routing
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
