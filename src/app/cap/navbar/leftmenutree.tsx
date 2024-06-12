import * as React from 'react';
import { useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {menuTreeT} from '../../models/models';
import {nameIconArr} from '../../utils/iconmap.utils';


export default function LeftMenuTree(props: {pages:menuTreeT[], setOpenDrawer: any}) {
  const [open, setOpen] = React.useState<Map<number, boolean>>();
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const pages = props.pages;

  useEffect(() => {
    const idToOpenMap: Map<number, boolean> = new Map([]);
    pages.forEach(page => {
      if (page.children.length > 0) {
        idToOpenMap.set(page.id, false)
      }
    });
    setOpen(idToOpenMap);
    const str = ShowMenu({pages: pages, level:0, menuLevel:0});
    console.log(str);
  }, []);


  function handleHeaderMenuClick(id: number) {
    const idToOpenMap: Map<number, boolean> = new Map(open);
    idToOpenMap.set(id, !idToOpenMap.get(id));
    props.setOpenDrawer(true);
    setOpen(idToOpenMap);
  }

  function ShowMenu(levelData: {pages: menuTreeT[], level: number, menuLevel: number}) {
    const level = levelData.level;
    const pages = levelData.pages;
    const indent =  levelData.menuLevel;
    

    function ShowIcon(key: String) {
      const icon = nameIconArr.find((obj)=> obj.name === 'DashboardIcon')?.icon;  

      return ({icon});
    }
    
    return (
      <div>
        {pages.map((page, index) => (
          <div key={index}>
            {page.parent_id === level && 
            <>
              <Tooltip title={page.name} placement="right">
                <ListItemButton sx={{ pl: indent }} onClick={(e) => handleHeaderMenuClick(page.id)}  component="a" href={page.href}>
                  <ListItemIcon style={{minWidth: '30px'}}>
                    {SelectIcon({Page: page})}
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


const SelectIcon: React.FC<{ Page: menuTreeT }> = ({ Page }) => {
  // Find the corresponding icon component based on user selection
  const selectedIcon = nameIconArr.find((item) => item.name === Page.icon);

  return (
    <>
        {selectedIcon && (
          <selectedIcon.icon color={Page.children.length> 0 ? "secondary": "info"}/>
        )}
    </>
  );
};

