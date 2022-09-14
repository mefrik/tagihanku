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
import IndexTransaction from './Pages/Dashboard/Transaction/IndexTransaction';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<PagesIndex/>}/>
              <Route path='dashboard' element={<IndexDashboard/>}>
                <Route path='analytics' element={<IndexAnalytics/>}/>
                <Route path='transaction' element={<IndexTransaction/>}>
                  <Route path='electricity' element={<IndexElectricity/>}/>
                  <Route path='health' element={<IndexHealth/>}/>
                  <Route path='internet' element={<IndexInternet/>}/>
                  <Route path='tax' element={<IndexTax/>}/>
                  <Route path='water' element={<IndexWater/>}/>
                  <Route path='others' element={<IndexOthers/>}/>
                </Route>
              </Route>
            <Route path='verification' element={<Verfication/>}/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;