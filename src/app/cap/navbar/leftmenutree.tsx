import * as React from 'react';
import { useEffect } from 'react';
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
import {menuTreeT} from '../../models/models';


export default function LeftMenuTree(props: {pages:menuTreeT[]}) {
  const [open, setOpen] = React.useState<Map<number, boolean>>();
  const [openAdmin, setOpenAdmin] = React.useState(false);

  useEffect(() => {
    const idToOpenMap: Map<number, boolean> = new Map([]);
    props.pages.forEach(page => {
      if (page.children.length > 0) {
        idToOpenMap.set(page.id, false)
      }
    });
    setOpen(idToOpenMap);
    const str = ShowMenu({pages: props.pages, level:0, menuLevel:0});
    console.log(str);
  }, []);


  function handleHeaderMenuClick(id: number) {
    const idToOpenMap: Map<number, boolean> = new Map(open);
    idToOpenMap.set(id, !idToOpenMap.get(id));
    setOpen(idToOpenMap);
  }

  const iconMap = {
    DashboardIcon: DashboardIcon,
    // Add more mappings for other icons as needed
  };


  function ShowMenu(levelData: {pages: menuTreeT[], level: number, menuLevel: number}) {
    const level = levelData.level;
    const pages = levelData.pages;
    const indent =  levelData.menuLevel;

    
    return (
      <div>
        {pages.map((page, index) => (
          <div key={index}>
            {page.parent_id === level && 
            <>
              <Tooltip title={page.name} placement="right">
                <ListItemButton sx={{ pl: indent }} onClick={(e) => handleHeaderMenuClick(page.id)}  component="a" href={page.href}>
                  <ListItemIcon style={{minWidth: '30px'}}>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                  {page.children.length ? open?.get(page.id) ? <ExpandLess/> : <ExpandMore /> : <></>}
                </ListItemButton>
              </Tooltip>
              <Collapse in={open?.get(page.id)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {ShowMenu({pages: page.children, level:page.id, menuLevel: indent+2})}
                </List>
              </Collapse>

            </>
            }
          </div>
        ))}
    </div>
    );
  }


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {ShowMenu({pages: props.pages, level:0, menuLevel: 0})}
    </List>
  );
}


/*
                <Collapse in={open?.get(page.id)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {ShowMenu({level:page.id})}
                  </List>
                </Collapse>
*/

/*
      <Tooltip title="Dashboard" placement="right">
        <ListItemButton component="a" href="/cap">
          <ListItemIcon>
            <DashboardIcon/>
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

  function ShowSubMenu(levelData: {pages: menuTreeT[], level: number}) {
    const level = levelData.level;
    const pages = levelData.pages;
    if (pages.length){
      return (
        <div>
          {pages.map((page, index) => (
            <div key={index}>
              {page.parent_id === level && 
              <>
                <li>tooltip</li>
                <li>button</li>
                <li> icon</li>
                <li>---{page.name}---</li>
                <li>button end</li>
                <li>tooltip end</li>
              </>
              }
            </div>
          ))}
      </div>
      );
    } else {
      return (<></>);
    }

  }



  function ShowMenu(levelData: {pages: menuTreeT[],level: number}) {
    const level = levelData.level;
    const pages = levelData.pages;
    if (pages.length){
      return (
        <div>
          {pages.map((page, index) => (
            <div key={index}>
              {page.parent_id === level && 
              <>
                <li>tooltip</li>
                <li>button</li>
                <li> icon</li>
                <li>---{page.name}---</li>
                <li>button end</li>
                <li>tooltip end</li>
                <li>expand</li>
                <li>collapse</li>
                <li>list</li>
                <li>{"sub-level-"  } {page.name}-{page.id}</li>
                {ShowSubMenu({pages: page.children ,level:page.id})}
                <li>list end</li>
                <li>collapse end end</li>
              </>
              }
            </div>
          ))}
      </div>
      );
    } else {
      return (<></>);
    }
  }


        function ShowSubMenu(levelData: {pages: menuTreeT[], level: number}) {
    const level = levelData.level;
    
    return (
      <div>
        {props.pages.map((page, index) => (
          <div key={index}>
            {page.parent_id === level && 
            <>
              <Tooltip title={page.name} placement="right">
                <ListItemButton onClick={(e) => handleHeaderMenuClick(page.id)}  component="a" href={page.href}>
                  <ListItemIcon>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                  {page.children.length ? open?.get(page.id) ? <ExpandLess/> : <ExpandMore /> : <></>}
                </ListItemButton>
              </Tooltip>
            </>
            }
          </div>
        ))}
    </div>
    );
  }



  function ShowMenu(levelData: {pages: menuTreeT[], level: number}) {
    const level = levelData.level;
    
    return (
      <div>
        {props.pages.map((page, index) => (
          <div key={index}>
            {page.parent_id === level && 
            <>
              <Tooltip title={page.name} placement="right">
                <ListItemButton onClick={(e) => handleHeaderMenuClick(page.id)}  component="a" href={page.href}>
                  <ListItemIcon>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                  {page.children.length ? open?.get(page.id) ? <ExpandLess/> : <ExpandMore /> : <></>}
                </ListItemButton>
              </Tooltip>
              <Collapse in={open?.get(page.id)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {ShowSubMenu({level:page.id})}
                </List>
              </Collapse>

            </>
            }
          </div>
        ))}
    </div>
    );
  }

*/