import { Grid, styled } from '@mui/material'
import React from 'react'
import ChartOne from './ChartOne'
import ChartTwo from './ChartTwo'
import Percentages from './Percentages'


const MainGrid = styled(Grid)(() => ({
  // border: '1px solid red',
  height: 'auto'
}))
const SubGrid = styled(Grid)(() => ({
  // background: 'rgb(0,0,0,0.5)',
  height: '70vh',
}))
const SubGridItem = styled(Grid)(() => ({
  // background: 'rgb(245,0,0,0.5)',
  height: '70vh',
}))


export default function IndexAnalytics() {
  return (
    <MainGrid 
      direction="row" 
      container
    >
      <Percentages/>
      <SubGrid item xs={12} container spacing={2}>
        <SubGridItem item xs={9}>
          <ChartOne/>
        </SubGridItem>
        <SubGridItem item xs={3}>
          <ChartTwo/>
        </SubGridItem>
      </SubGrid>
    </MainGrid>
  )
}
