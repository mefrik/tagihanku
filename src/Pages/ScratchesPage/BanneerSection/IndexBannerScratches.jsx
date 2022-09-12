import { Grid } from '@mui/material'
import React from 'react'
import BannerScratchesContent from './BannerScratchesContent'


export default function IndexBannerScratches() {
  return (
    <Grid sx={{height: 'auto', bgcolor: '#FFFFF',}}>
        <BannerScratchesContent/>
    </Grid>
  )
}
