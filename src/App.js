import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PagesIndex from './Pages/PagesIndex';
import { SnackbarProvider } from 'notistack';
import IndexDashboard from './Pages/Dashboard/IndexDashboard';
import Verfication from './Pages/Login/Verification';
import { ThemeProvider } from '@mui/material';
import theme from './Styles/Style';
import IndexAnalytics from './Pages/Dashboard/Analytics/IndexAnalytics';
import IndexElectricity from './Pages/Dashboard/Transaction/Electricity/IndexElectricity';
import IndexHealth from './Pages/Dashboard/Transaction/Health/IndexHealth';
import IndexInternet from './Pages/Dashboard/Transaction/Internet/IndexInternet';
import IndexTax from './Pages/Dashboard/Transaction/Tax/IndexTax';
import IndexWater from './Pages/Dashboard/Transaction/Water/IndexWater';
import IndexOthers from './Pages/Dashboard/Transaction/Others/IndexOthers';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PagesIndex/>}/>
            <Route path='dashboard' element={<IndexDashboard/>}>
              <Route path='analytics' element={<IndexAnalytics/>}/>
              <Route path='transaction/electricity' element={<IndexElectricity/>}/>
              <Route path='transaction/health' element={<IndexHealth/>}/>
              <Route path='transaction/internet' element={<IndexInternet/>}/>
              <Route path='transaction/tax' element={<IndexTax/>}/>
              <Route path='transaction/water' element={<IndexWater/>}/>
              <Route path='transaction/others' element={<IndexOthers/>}/>
            </Route>
            <Route path='verification' element={<Verfication/>}/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;