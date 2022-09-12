import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import { styled, Tooltip, tooltipClasses } from '@mui/material';
import { Link } from 'react-router-dom';

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

export default function HomeButton() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Link to="/">
            <CustomizeToolTip title='Back to home'>
                <Fab color="primary" aria-label="add">
                    <HomeIcon />
                </Fab>
            </CustomizeToolTip>
        </Link>
    </Box>
  );
}