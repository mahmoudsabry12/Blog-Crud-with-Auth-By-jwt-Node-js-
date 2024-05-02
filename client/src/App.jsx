
import './App.css'
import  Dashboard  from './Pages/Dashboard';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/register' element={<Register />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/dashboard' element={<Dashboard />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App
