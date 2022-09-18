import { Grid, styled } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import AddButton from '../../../../Components/Button/AddButton'
import useGetUserLogin from '../../../../hooks/useGetUserLogin'
import useGetValue from '../../../../hooks/useGetValue'
import MainTable from './MainTable'
import Menu from './Menu';

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

export default function IndexElectric() {
  const user = useGetUserLogin()
  const post = 'transaction'
  const tag = 'electric'
  const path = `${post}/${tag}`
  const datas = useGetValue(path) 

  const handleGetData = () => {
    datas.processValue()
  }

  useEffect(() => {
    handleGetData()
  }, [])
  
  
  return (
    <MainGrid>
      <TableGrid>
        <Menu tag={tag}/>
      </TableGrid>
      <TableGrid>
        <MainTable 
          tag={tag} 
          isLoading={datas.isLoading}
          snapshot={datas.snapshot}
          isEmpty={datas.isEmpty}
          info={datas.info}
          user={user}
          handleGetData={handleGetData}
        />
      </TableGrid>
      <ButtonGrid>
        <AddButton 
          path={path}
          tag={tag} 
          user={user}
          handleGetData={handleGetData}
        />
      </ButtonGrid>
    </MainGrid>
  )
}
