import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Collapse, styled, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const CostumizeList = styled(List)(() => ({
    width: 'auto',
}))

const CostumizeListItemButton = styled(ListItemButton)(() => ({
    ":hover": {
        background: '#F4EEFF',
        borderRadius: '5px',
    }
}))

const CostumizeExpandLess = styled(ExpandLess)(() => ({
    color: '#A66CFF',
}))
const CostumizeExpandMore = styled(ExpandMore)(() => ({
    color: '#A66CFF',
}))

const CostumizeCheckbox = styled(Checkbox)(() => ({
    color: '#A66CFF'
}))

const CostumizeTextNameBox = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "16px",
    textTransform: "capitalize",
    lineHeight: "22px",
}))

const CustomizeListText = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "15px",
    textTransform: "capitalize",
    lineHeight: "22px",
}))

export default function Filter({boxName, itemName}) {
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(true);


  const handleClick = () => {
    setOpen(!open);
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }

  return (
    <List>
        <CostumizeListItemButton onClick={handleClick}>
            <ListItemText 
                secondary={
                    <React.Fragment>
                      <CostumizeTextNameBox>
                        {boxName}
                      </CostumizeTextNameBox>
                    </React.Fragment>
                } 
            />
            {open ? <CostumizeExpandLess /> : <CostumizeExpandMore />}
        </CostumizeListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <CostumizeList>
            {itemName.map((value) => {
                return (
                <ListItem
                    key={value.id}
                    onClick={handleToggle(value)}
                    secondaryAction={
                    <CostumizeCheckbox
                        edge="end"
                        checked={checked.indexOf(value) !== -1}
                    />
                    }
                    disablePadding
                >
                    <CostumizeListItemButton>
                    <ListItemText 
                        id={value.id} 
                        secondary={
                            <CustomizeListText>
                                {value.name}
                            </CustomizeListText>
                        }
                    />
                    </CostumizeListItemButton>
                </ListItem>
                )
            })}
            </CostumizeList>
        </Collapse>
    </List>
  );
}
