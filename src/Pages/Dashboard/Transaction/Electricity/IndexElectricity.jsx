import { Grid, styled } from '@mui/material'
import React from 'react'
import AddButton from '../../../../Components/Button/AddButton'
import MainTable from './MainTable'
import { getDatabase, ref, query, child, get } from "firebase/database";
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

export default function IndexElectricity() {
  const [datas, setDatas] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const tag = 'electricity';

  function handleGetData () {
    return new Promise(resolve =>  {
      const db = getDatabase();
      const dbRef = query(ref(db));
      get(child(dbRef, `transaction/${tag}/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setDatas((Object.keys(snapshot.val()).map((key, index) => ({
            ...snapshot.val()[key], number: index + 1
          }))))
          setRows(datas)
          resolve("Upload Selesai")
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  React.useEffect(() => {
    handleGetData()
  },[]);

  return (
    <MainGrid>
      <TableGrid>
        <Menu tag={tag}/>
      </TableGrid>
      <TableGrid>
        <MainTable datas={datas}/>
      </TableGrid>
      <ButtonGrid>
        <AddButton tag={tag} handleGetData={handleGetData}/>
      </ButtonGrid>
    </MainGrid>
  )
}
