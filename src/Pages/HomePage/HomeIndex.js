import React, { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material'
import theme from '../../Styles/Style'
import IndexIntro from './IntroSection/IndexIntro'
import IndexProjects from './ProjectsSection/IndexProjects'
import IndexPartners from './PartnersSection/IndexPartners'
import IndexContacts from './ContactsSection/IndexContacts'
import IndexFooter from './FooterSection/IndexFooter'
import IndexScratches from './ScratchesSection/IndexScratches'


const HomeIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#FFFFF', height: 'auto' }}>
          <IndexIntro/>
          <IndexScratches/>
          <IndexProjects/>
          <IndexPartners/>
          <IndexContacts/>
        </Box>
      </Container>
      <IndexFooter/>
    </ThemeProvider>
  )
}

export default HomeIndex