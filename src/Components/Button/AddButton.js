import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled, Tooltip, tooltipClasses } from '@mui/material';
import AddElectricity from '../Form/AddElectricity';

const CustomizeToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    TransitionComponent: "Zoom",
    [`& .${tooltipClasses.arrow}`]: {
      color: '#9C9EFE',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#9C9EFE",
      color: '#FFFFFF',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
}));

export default function AddButton({tag, path, user, handleGetData}) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(!openModal)
  }

  return (
    <Box sx={{ '& > :not(style)': { m: 2 } }}>
        <CustomizeToolTip title='Add data'>
            <Fab color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon />
            </Fab>
        </CustomizeToolTip>
        {tag === 'electric'?
          <AddElectricity 
            tag={tag} 
            path={path}
            user={user}
            open={openModal} 
            handleOpen={handleOpen}
            handleGetData={handleGetData}
          />
          :
          null
        }
    </Box>
  );
}