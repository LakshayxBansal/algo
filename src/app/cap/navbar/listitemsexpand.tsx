import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAdmin = () => {
    setOpenAdmin(!openAdmin);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Tooltip title="Dashboard" placement="right">
        <ListItemButton component="a" href="/cap">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Tooltip>
      <Tooltip title="Call" placement="right">
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Call" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Tooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tooltip title="Inquiry" placement="right">
            <ListItemButton component="a" href="/cap/MyForm" sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Inquiry" />
            </ListItemButton>
          </Tooltip>
          <Tooltip title="Support" placement="right">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
          </Tooltip>
        </List>
      </Collapse>
      <Tooltip title="Campaign" placement="right">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Campaign" />
        </ListItemButton>
      </Tooltip>
      <Tooltip title="Reports" placement="right">
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </Tooltip>
      <Tooltip title="Admin" placement="right">
        <ListItemButton onClick={handleClickAdmin}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Tooltip>
      <Collapse in={openAdmin} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Tooltip title="Inquiry screen" placement="right">
          <ListItemButton component="a" href="/cap/admin/custominquiry" sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Inquiry screen" />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Add User" placement="right">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Add User" />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Modify Company" placement="right">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Modify Company" />
          </ListItemButton>
        </Tooltip>
        </List>
      </Collapse>

    </List>
  );
}