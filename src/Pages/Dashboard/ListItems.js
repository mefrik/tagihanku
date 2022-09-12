import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import styled from '@emotion/styled';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import OpacityIcon from '@mui/icons-material/Opacity';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid } from '@mui/material';
import LogOut from '../../Components/Modal/LogOut';



const GridList = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
}))


const ButtonList = styled(ListItemButton)(() => ({
    color: '#393E46',
    borderRadius: "10px",
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "10px",
    marginRight: "10px",
    '&.Mui-selected':{
        backgroundColor: "#C1EFFF",
        color: '#A66CFF',
        borderRadius: "10px",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "10px",
        marginRight: "10px",
    },
}))

const ListItems = ({open}) => {
    const params = useLocation();
    const [openMarket, setOpenMarket] = useState(false);  
    const [openModalLogOut, setOpenModalLogOut] = useState(false);
    const [histOpen, setHistOpen] = useState(false);

    const handleOpenModal = () => {
        setOpenModalLogOut(!openModalLogOut);
    }

    const handleOpenMarket = () => {
        setOpenMarket(!openMarket)
        setHistOpen(!histOpen)
    }

  return (
    <GridList>
        <List component="div" disablePadding>
            <Link  to='/dashboard/analytics'>
                <ButtonList selected={params.pathname.includes('analytics')}>
                    <ListItemIcon >
                        <TrendingUpIcon sx={{color: params.pathname.includes('analytics')? "#A66CFF" : "" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Analytics" />
                </ButtonList>
            </Link >
            <ButtonList onClick={handleOpenMarket}>
            <ListItemIcon>
                <CurrencyExchangeOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Transaction"/>
            {openMarket ? <ExpandLess /> : <ExpandMore />}
            </ButtonList>
            <Collapse in={openMarket} timeout='auto' unmountOnExit>
                <List component="div" disablePadding>
                    <Link  to='/dashboard/transaction/electricity'>
                    <ButtonList selected={params.pathname.includes('electricity')}>
                        <ListItemIcon >
                            <FlashOnIcon sx={{color: params.pathname.includes('electricity')? "#A66CFF" : "" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Electricity" />
                    </ButtonList>
                    </Link >
                </List>
                <List component="div" disablePadding>
                    <Link  to='/dashboard/transaction/health'>
                    <ButtonList selected={params.pathname.includes('health')}>
                        <ListItemIcon >
                            <HealthAndSafetyIcon sx={{color: params.pathname.includes('health')? "#A66CFF" : "" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Health" />
                    </ButtonList>
                    </Link >
                </List>
                <List component="div" disablePadding>
                    <Link  to='/dashboard/transaction/internet'>
                    <ButtonList selected={params.pathname.includes('internet')}>
                        <ListItemIcon >
                            <WifiTetheringIcon sx={{color: params.pathname.includes('internet')? "#A66CFF" : "" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Internet" />
                    </ButtonList>
                    </Link >
                </List>
                <List component="div" disablePadding>
                    <Link  to='/dashboard/transaction/tax'>
                    <ButtonList selected={params.pathname.includes('tax')}>
                        <ListItemIcon >
                            <ReceiptLongIcon sx={{color: params.pathname.includes('tax')? "#A66CFF" : "" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Tax" />
                    </ButtonList>
                    </Link >
                </List>
                <List component="div" disablePadding>
                    <Link  to='/dashboard/transaction/water'>
                    <ButtonList selected={params.pathname.includes('water')}>
                        <ListItemIcon >
                            <OpacityIcon sx={{color: params.pathname.includes('water')? "#A66CFF" : "" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Water" />
                    </ButtonList>
                    </Link >
                </List>
                <List component="div" disablePadding>
                    <Link  to='/dashboard/transaction/others'>
                    <ButtonList selected={params.pathname.includes('others')}>
                        <ListItemIcon >
                            <InsertChartOutlinedIcon sx={{color: params.pathname.includes('others')? "#A66CFF" : "" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Others" />
                    </ButtonList>
                    </Link >
                </List>
            </Collapse>
        </List>
        <List>
            <List component="div" disablePadding>
                <ButtonList onClick={handleOpenModal} selected={params.pathname.includes('/logout')}>
                    <ListItemIcon >
                        <LogoutIcon sx={{color: params.pathname.includes('/logout')? "#A66CFF" : "" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ButtonList>
                <LogOut open={openModalLogOut} handleOpenModal={handleOpenModal}/>
            </List>
        </List>
    </GridList>
  )
}

export default ListItems


