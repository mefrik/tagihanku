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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DetailElectric from '../../../../Components/Detail/DetailElectric';
import { BarWave } from 'react-cssfx-loading';

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
        // backgroundColor: "#FBDF07",
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
    height: '20vh',
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
    {   id: 'Unit', 
        label: 'Unit', 
        align: 'left',
        minWidth: 3
    },
    {   id: 'Bill Date', 
        label: 'Bill Date', 
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
        label: 'Usage (kW.h)',
        minWidth: 2,
        align: 'left',
    },
    {
        id: 'Charge',
        label: 'Charge',
        minWidth: 2,
        align: 'left',
    },
    {
        id: 'Payment Method',
        label: 'Payment Method',
        minWidth: 1,
        align: 'left',
    },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 1,
        align: 'left',
    },
    {
        id: 'action',
        label: 'Action', 
        align: 'left',
        minWidth: 2, 
    },
];

export default function MainTable({isLoading, tag, snapshot, isEmpty, info, handleGetData}){
    const [openDetail, setOpenDetail] = React.useState(false);
    const [detailData, setDetailData] = React.useState([]);

    const handleOpenDetail = (data) => {
        console.log(data)
        setOpenDetail(true)
        setDetailData(data)
    }

    const handleCloseDetail = () => {
        setOpenDetail(false)
    }

    return(
      <CustomeBox>
        <StyledTableContainer component={Paper}>
            {(isLoading ?
                <SkelatonGrid item xs={12} container>
                    <BarWave />
                </SkelatonGrid>
                :
                <Table stickyHeader size="small" sx={{ minWidth: 650 }} aria-label="sticky table">
                    <caption>{info}</caption>
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
                        {!isEmpty?
                            (Object.values(snapshot).map((data,index) => (
                                <TabRow key={data.id}>
                                    <TabCell align="center">
                                        {data.number}
                                    </TabCell>
                                    <TabCell align="left">
                                        {data.unitName}
                                    </TabCell>
                                    <TabCell align="left">
                                        {data.billDate}
                                    </TabCell>
                                    <TabCell align="left">
                                        {data.company}
                                    </TabCell>
                                    <TabCell align="left">
                                        <NumericFormat 
                                            value={data.usage}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                        />
                                    </TabCell>
                                    <TabCell align="left">
                                        <NumericFormat 
                                            value={data.cost}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            prefix={'Rp. '}
                                        />
                                    </TabCell>
                                    <TabCell align="left">
                                        {data.paymentMethod}
                                    </TabCell>
                                    <TabCell align="left">
                                        {data.paymentStatus? 
                                            <Chip size='small' label="Paid" color="success" icon={<DoneIcon />}/>
                                            :
                                            <Chip variant='outlined' size='small' label="Unpaid" color="warning" icon={<AttachMoneyIcon />}/>
                                        }
                                    </TabCell>
                                    <TabCell align="left">
                                        <Button 
                                            variant='contained' 
                                            size="small"
                                            onClick={() => handleOpenDetail(data)}
                                        >
                                            Detail
                                        </Button>
                                    </TabCell>
                                </TabRow>
                            )))
                        :
                        null
                        }
                    </TableBody>
                </Table>
            )}
        </StyledTableContainer>
        <DetailElectric
            tag={tag}
            handleCloseDetail={handleCloseDetail}
            openDetail={openDetail}
            detailData={detailData}
            handleGetData={handleGetData}
        />
      </CustomeBox>
    )
}