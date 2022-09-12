import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled, Tooltip, tooltipClasses } from '@mui/material';
import AddElectricity from '../Modal/AddElectricity';

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

export default function AddButton({tag}) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(!setOpenModal)
  }


  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <CustomizeToolTip title='Add data'>
            <Fab color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon />
            </Fab>
        </CustomizeToolTip>
        <AddElectricity tag={tag} open={openModal} handleOpen={handleOpen} />
    </Box>
  );
}