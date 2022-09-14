import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { Avatar, Badge, Button, Container, Stack, Typography } from '@mui/material';
import ListItems from './ListItems';
import { Outlet } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useSnackbar } from 'notistack';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  padding: theme.spacing(0, 23),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerLogo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerProfile = styled('div')(({ theme, openDrawerProfile }) => ({
  display: `${openDrawerProfile}`,
  position: 'relative',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  background: "rgb(255,255,255,0)",
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 0,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: "relative",
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(10),
            },
        }),
    },
    '& .MuiDrawer-paper:hover' :{
        // position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
  }),
);

const BoxAppBar = styled(Box)(({ open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginLeft: open? drawerWidth : drawerWidth,
}))
const BoxLeftBar = styled(Box)(() => ({
  display: "flex",
}))
const BoxRightBar = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))
const BoxProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  borderRadius: '5px',
  backgroundColor: 'rgb(0,0,220,0.1)',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px'
}))
const TypographyProfileName = styled(Typography)(() => ({
  textTransform: "capitalize",
  fontWeight: 'bolder',
  fontSize: '15px'
}))
const Typographytext = styled(Typography)(() => ({
  textTransform: "capitalize",
  fontSize: '13px'
}))

const ButtonSearch = styled(Button)(() => ({
  width: "200px",
  height: "35px",
  display: "flex",
  justifyContent: "left"
}))
const TypographySearch = styled(Typography)(() => ({
  textTransform: "capitalize",
}))

export default function Drawer({email, name, phoneNumber, photo, verified, role, userId}) {
  const appBarIconSize = 30;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [openDrawerProfile, setOpenDrawerProfile] = React.useState('none')

  const handleDrawerProfileOpen = () => {
    setOpenDrawerProfile('flex')
  }
  const handleDrawerProfileClose = () => {
    setOpenDrawerProfile(open? 'flex' : 'none')
  }
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleSearchOpen = () => {
    enqueueSnackbar("On development", {variant:"info"});
  }
  const handleMessegeOpen = () => {
    enqueueSnackbar("On development", {variant:"info"});
  }
  const handleNotifOpen = () => {
    enqueueSnackbar("On development", {variant:"info"});
  }
  const handleProfileOpen = () => {
    enqueueSnackbar("On development", {variant:"info"});
  }

  return (
    <Box sx={{ display: 'flex', height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <BoxAppBar>
            <BoxLeftBar>
            </BoxLeftBar>
            <BoxRightBar>
              <ButtonSearch 
                size="large" 
                color="primary" 
                variant='outlined'
                onClick={handleSearchOpen}
              >
                <SearchIcon sx={{ width: appBarIconSize, height: appBarIconSize }}/>
                <TypographySearch>Search ...</TypographySearch>
              </ButtonSearch>
              <IconButton 
                size="large" 
                color="inherit"
                onClick={handleMessegeOpen}
              >
                <Badge badgeContent={10} color="info">
                  <MailIcon sx={{ width: appBarIconSize, height: appBarIconSize }} color={"primary"}/>
                </Badge>
              </IconButton>
              <IconButton 
                size="large" 
                color="inherit"
                onClick={handleNotifOpen}
              >
                <Badge badgeContent={4} color="info">
                  <NotificationsNoneIcon sx={{ width: appBarIconSize, height: appBarIconSize }} color={"primary"}/>
                </Badge>
              </IconButton>
              <IconButton 
                size="large" 
                color="inherit"
                onClick={handleProfileOpen}
              >
                <Avatar
                  alt={name}
                  src={photo}
                  sx={{ width: appBarIconSize, height: appBarIconSize }}
                />
              </IconButton>
            </BoxRightBar>
          </BoxAppBar>
        </Toolbar>
      </AppBar>
      <Main 
        variant="permanent" 
        open={open}
        onMouseEnter={handleDrawerProfileOpen}
        onMouseLeave={handleDrawerProfileClose}
      > 
        <DrawerHeader>
          <div></div>
          <IconButton 
            onClick={handleDrawerOpen} 
            edge="end"
          >
            {open? 
              <PushPinIcon color='primary'/>
              :
              <PushPinIcon color='black'/>
            }
          </IconButton>
        </DrawerHeader>
        <DrawerLogo>
          <Avatar variant="square" src={logo} sx={{width: 30, height: 30}}/>
        </DrawerLogo>
        <DrawerProfile openDrawerProfile={openDrawerProfile}>
          <BoxProfile>
            <Avatar
              alt={name}
              src={photo}
              sx={{ width: 50, height: 50 }}
            />
            <Stack>
              <TypographyProfileName noWrap>{name}</TypographyProfileName>
              <Typographytext noWrap>{phoneNumber}</Typographytext>
            </Stack>
          </BoxProfile>
        </DrawerProfile>
        <ListItems component="nav" open={open}/>
      </Main>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerProfile/>
        <Container maxWidth="100%" sx={{ mt: 2, mb: 2 }}>
            <Outlet/>
        </Container>
      </Box>
    </Box>
  );
}
