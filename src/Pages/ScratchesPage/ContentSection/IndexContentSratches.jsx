import React, {useState} from 'react'
import Tab from '@mui/material/Tab'
import { AppBar, styled } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Index3D from './Asset3D/Index3D'

const CostumizeAppBar = styled(AppBar)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    background: 'white',
    boxShadow: 'none',
    padding: '10px'
}))

const CostumizeTabs = styled(TabList)(() => ({
    '& .MuiTabs-indicator': {
        height: 0,
    },
})) 

const CostumizeTab = styled(Tab)(() => ({    
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    textTransform: "capitalize",
    lineHeight: "22px",
    '&:hover': {
        color: "#FFFFFF",
        backgroundColor: "#9C9EFE",
        borderRadius: "5px",
    },
    '&.Mui-selected': {
      background: 'secondary',
      borderRadius: '5px',
      color: "#FFFFFF",
      backgroundColor: "rgba(166, 108, 255, 1)",
    },
}))

const CostumizeTabPanel = styled(TabPanel)(() => ({

}))


export default function IndexContentSratches() {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <TabContext value={value}>
        <CostumizeAppBar>
            <CostumizeTabs
                onChange={handleChange}
                value={value}
                selectionFollowsFocus
            >
                {
                    ListItems.map((value) =>{
                        return(
                        <CostumizeTab
                            key={value.id}
                            label={value.title}
                            value={value.id}
                            disabled={value.status}
                        />
                        )
                    })
                }
            </CostumizeTabs>
        </CostumizeAppBar>
        <CostumizeTabPanel value="1">
            <Index3D/>
        </CostumizeTabPanel>
        <CostumizeTabPanel value="2">
            Item Two
        </CostumizeTabPanel>
        <CostumizeTabPanel value="3">
            Item Three
        </CostumizeTabPanel>
        <CostumizeTabPanel value="4">
            Item Fourer
        </CostumizeTabPanel>
    </TabContext>
  )
}


const ListItems = [
    {
        id: '1',
        title: `3D Asset`,
        status: false,
    },
    {
        id: '2',
        title: `NFT`,
        status: false,
    },
    {
        id: '3',
        title: `Art`,
        status: false,
    },
    {
        id: '4',
        title: `Comic`,
        status: false,
    },
]