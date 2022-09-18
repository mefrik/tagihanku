import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PagesIndex from './Pages/PagesIndex';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import theme from './Styles/Style';
import IndexDashboard from './Pages/Dashboard/IndexDashboard';
import IndexAnalytics from './Pages/Dashboard/Analytics/IndexAnalytics';
import IndexElectric from './Pages/Dashboard/Transaction/Electric/IndexElectric';
import IndexHealth from './Pages/Dashboard/Transaction/Health/IndexHealth';
import IndexInternet from './Pages/Dashboard/Transaction/Internet/IndexInternet';
import IndexTax from './Pages/Dashboard/Transaction/Tax/IndexTax';
import IndexWater from './Pages/Dashboard/Transaction/Water/IndexWater';
import IndexOthers from './Pages/Dashboard/Transaction/Others/IndexOthers';
import IndexTransaction from './Pages/Dashboard/Transaction/IndexTransaction';
import IndexRegister from './Pages/Register/IndexRegister';
import IndexVerification from './Pages/Verification/IndexVerification';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<PagesIndex/>}/>
              <Route path='dashboard' element={<IndexDashboard/>}>
                <Route path='analytics' element={<IndexAnalytics/>}/>
                <Route path='transaction' element={<IndexTransaction/>}>
                  <Route path='electric' element={<IndexElectric/>}/>
                  <Route path='health' element={<IndexHealth/>}/>
                  <Route path='internet' element={<IndexInternet/>}/>
                  <Route path='tax' element={<IndexTax/>}/>
                  <Route path='water' element={<IndexWater/>}/>
                  <Route path='others' element={<IndexOthers/>}/>
                </Route>
              </Route>
            <Route path='register' element={<IndexRegister/>}/>
            <Route path='verification' element={<IndexVerification/>}/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;