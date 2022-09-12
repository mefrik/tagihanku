import { Grid, styled } from '@mui/material'
import React, { useState } from 'react'
import AddButton from '../../../../Components/Button/AddButton'
import MainTable from './MainTable'


const MainGrid = styled(Grid)(() => ({
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
}))
const TableGrid = styled(Grid)(() =>({
}))
const ButtonGrid = styled(Grid)(() =>({
  display: 'flex',
  position: 'fixed',
  bottom: 16,
  right: 16,
}))

export default function IndexElectricity() {
  const tag = 'electricity';
  return (
    <MainGrid>
      <TableGrid>
        <MainTable/>
      </TableGrid>
      <ButtonGrid>
        <AddButton tag={tag}/>
      </ButtonGrid>
    </MainGrid>
  )
}
