import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Login/LoginPage';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeIndex from './Pages/HomePage/HomeIndex';
import ScratchesIndex from './Pages/ScratchesPage/ScratchesIndex';
>>>>>>> 8ee2d63d2f5ca7225231f4525390191700f06bb6

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<LoginPage />}>
        </Route>
=======
        <Route path='/' element={<HomeIndex/>}/>
        <Route path='/scratches' element={<ScratchesIndex/>}/>
>>>>>>> 8ee2d63d2f5ca7225231f4525390191700f06bb6
      </Routes>
    </BrowserRouter>
  )
}

export default App;