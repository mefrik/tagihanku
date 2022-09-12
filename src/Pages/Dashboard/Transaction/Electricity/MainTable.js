import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { NumericFormat } from 'react-number-format';
import DoneIcon from '@mui/icons-material/Done';
import { BarWave } from "react-cssfx-loading";


const CustomeBox = styled(Box)(() => ({
  borderRadius: '5px',
  boxShadow: '0px 2px 10px 0px rgb(0,0,0,0.05)',
  border: 'none',
}))
const StyledTableContainer = styled(TableContainer)(() => ({
    height: 'auto',
    borderRadius: '5px',
    border: 'none',
}))
const TabColumn = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#FBDF07",
        color: "black",
        border: 'none',
        fontSize: '16px',
        height: '50px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))
const TabRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: "#F0F5F9",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 'none',
    },
    '&:hover':{
        backgroundColor: "whitesmoke",
    }
}));
const TabCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976D2",
        color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const SkelatonGrid = styled(Grid)(() => ({
    height: '60vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const columns = [
    {   id: 'no', 
        label: 'No.', 
        align: 'center',
        minWidth: 2 
    },
    {   id: 'Date', 
        label: 'Date', 
        align: 'left',
        minWidth: 3
    },
    {   id: 'Company', 
        label: 'Company', 
        align: 'left',
        minWidth: 2, 
    },
    {
        id: 'Usage',
        label: 'Usage',
        minWidth: 2,
        align: 'left',
    },
    {
        id: 'Charge',
        label: 'Charge',
        minWidth: 3,
        align: 'left',
    },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 2,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action', 
        align: 'center',
        minWidth: 10, 
    },
];

export default function MainTable(){
    const loading = false;

    return(
      <CustomeBox>
        <StyledTableContainer component={Paper}>
            {(!loading ?
                <Table stickyHeader size="small" sx={{ minWidth: 650 }} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TabColumn
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TabColumn>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      <TabRow>
                          <TabCell align="center">
                            1
                          </TabCell>
                          <TabCell align="left">
                            12 September 2022
                          </TabCell>
                          <TabCell align="left">
                            PLN
                          </TabCell>
                          <TabCell align="left">
                            <NumericFormat 
                              value={1.2}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                                suffix={' kWH'}
                            />
                          </TabCell>
                          <TabCell align="left">
                            <NumericFormat 
                              value={88000}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                                prefix={'Rp. '}
                            />
                          </TabCell>
                          <TabCell align="center">
                            <Chip label="Paid" color="success" icon={<DoneIcon />}/>
                          </TabCell>
                          <TabCell align="center">
                            <Button 
                                variant='contained' 
                                size="small"
                            >
                                Detail
                            </Button>
                          </TabCell>
                      </TabRow>
                    </TableBody>
                </Table>
                :
                <SkelatonGrid item xs={12} container>
                    <BarWave />
                </SkelatonGrid>
            )}
        </StyledTableContainer>
      </CustomeBox>
    )
}