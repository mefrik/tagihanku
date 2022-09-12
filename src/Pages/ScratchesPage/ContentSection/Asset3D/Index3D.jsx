import { Grid, styled } from '@mui/material'
import React from 'react'
import Filter from '../../../../Components/Detail/Filter'
import Content3D from './Content3D'


const CostumizeGrid = styled(Grid)(() => ({

}))

const CostumizeGridLeft = styled(Grid)(() => ({
  
}))
const CostumizeGridRight = styled(Grid)(() => ({

}))



export default function Index3D() {
  return (
    <CostumizeGrid
      container
      spacing={{ xs: 2, md: 2 }} 
      columns={{ xs: 3, sm: 6, md: 12 }}
    >
      <CostumizeGridLeft item xs={3}>
        <Filter 
          boxName="File Type"
          itemName={filterByType}
        />
      </CostumizeGridLeft>
      <CostumizeGridRight item xs={9}>
        <Content3D/>
      </CostumizeGridRight>
    </CostumizeGrid>
  )
}

const filterByType = [
  {
    id: 1,
    name: 'Blender'
  },
  {
    id: 2,
    name: 'Sketch Up'
  },
]