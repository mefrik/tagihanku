import React, { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { Grid, ThemeProvider } from '@mui/material'
import theme from '../../Styles/Style'
import IndexBannerScratches from './BanneerSection/IndexBannerScratches'
import IndexContentSratches from './ContentSection/IndexContentSratches'
import HomeButton from '../../Components/Button/HomeButton'
import styled from 'styled-components'

const CostumizeHomeButtonGrid = styled(Grid)(() =>({
  display: 'flex',
  position: 'fixed',
  bottom: 16,
  right: 16,
}))

export default function ScratchesIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <IndexBannerScratches/>
            <IndexContentSratches/>
        </Box>
        <CostumizeHomeButtonGrid>
          <HomeButton/>
        </CostumizeHomeButtonGrid>
    </ThemeProvider>
  )
}
