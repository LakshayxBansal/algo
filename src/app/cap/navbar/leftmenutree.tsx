import * as React from 'react';
import { useEffect, useState, useRef  } from 'react';
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
import { Popper, Grow, Popover, Paper } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function LeftMenuTree(props: {pages:menuTreeT[], openDrawer:boolean,setOpenDrawer?: any}) {
  const [open, setOpen] = React.useState<Map<number, boolean>>();
  const [openPop, setOpenPop] = React.useState<Map<number, HTMLElement|null>>();
  // const [hoverOpen, setHoverOpen] = React.useState< boolean>(false);
  const [hoverId, setHoverId] = React.useState<number>();
  const [selectedId, setSelectedId] = React.useState<number | null>(null); // Track selected item
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isReturning, setIsReturning] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const idToOpenPop = React.useRef(new Map(openPop))
  const pages = props.pages;


  useEffect(() => {
    if (!props.openDrawer) {
      const collapsedMap = new Map(open);
      for (let key of collapsedMap.keys()) {
        collapsedMap.set(key, false);
      }
      setOpen(collapsedMap);      
    }else{
      const idToOpenMap: Map<number, boolean> = new Map([]);
      pages.forEach(page => {
      if (page.children.length > 0) {
        idToOpenMap.set(page.id, false)
      }
    });
    setOpen(idToOpenMap);
   ShowMenu({pages: pages, level:0, menuLevel:0});
  }
  return () => {
    clearTimeout(timeoutRef.current);
};
  }, [props.openDrawer,idToOpenPop,hoverId]);


  function handleHeaderMenuClick(id: number) {
    const idToOpenMap: Map<number, boolean> = new Map(open);
      idToOpenMap.set(id, !idToOpenMap.get(id));
      props.setOpenDrawer(true);
      setOpen(idToOpenMap);
      setSelectedId(id);
  }


  function handleSubMenuHover( event: React.MouseEvent<HTMLElement>, page: menuTreeT) { 
      clearTimeout(timeoutRef.current);
      // setIsReturning(true);
      if(page.children.length>0){
          idToOpenPop.current.set(page.id, event.currentTarget);
          console.log("map enter",idToOpenPop);
          setHoverId(page.id);
        }
        // setHoverOpen(true);
  }

  console.log("map1",idToOpenPop);


  const handleMouseLeave = (event :React.MouseEvent<HTMLElement>,page:menuTreeT) => {
    clearTimeout(timeoutRef.current);
      // console.log("leave")
      setHoverId(page.id);
      timeoutRef.current =  setTimeout(() => {
        setIsReturning(false);
            let greatestKey = null;
            for (const key of idToOpenPop.current.keys()) {
              if (greatestKey === null || key > greatestKey) {
                greatestKey = key;
              }
            }
            if (greatestKey !== null) {
              idToOpenPop.current.delete(greatestKey);
            }
        }, 100);

  };

  // const handleOnPopperLeave = (event :React.MouseEvent<HTMLElement>,page:menuTreeT)=>{
  //   setHoverOpen(false);
  //   let greatestKey = null;
  //   for (const key of idToOpenPop.current.keys()) {
  //     if (greatestKey === null || key > greatestKey) {
  //       greatestKey = key;
  //     }
  //   }
  //   if (greatestKey !== null) {
  //     idToOpenPop.current.delete(greatestKey);
  //     console.log("popper leave",idToOpenPop)
  //   }
  // }

  const handleOnPopperLeave = (event :React.MouseEvent<HTMLElement>,page:menuTreeT)=>{
    // setHoverOpen(false);
    // let greatestKey = null;
    // for (const key of idToOpenPop.current.keys()) {
    //   if (greatestKey === null || key > greatestKey) {
    //     greatestKey = key;
    //   }
    // }
    // if (greatestKey !== null) {
    //   idToOpenPop.current.delete(greatestKey);
    //   console.log("popper leave",idToOpenPop)
    // }
    idToOpenPop.current.clear();
    // console.log("popper leave", idToOpenPop);
  }
  console.log("popper leave", idToOpenPop);


  function handleCollapse(id: number): boolean {
    return props.openDrawer ? open?.get(id) ?? false : false;
  }

  function generateHref(optionName : string){
    let href = "#";
    if(optionName==="Add User"){
      href = "/cap/admin/adduser";
    }
    return href;
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
                <ListItemButton sx={{ pl: indent }} onClick={(e) => handleHeaderMenuClick(page.id)}  component="a" href={page.href!=="#" ? page.href : generateHref(page.name)} selected={selectedId === page.id} >
                  <ListItemIcon style={{minWidth: '30px', marginRight:12, marginLeft:13}}>
                    {SelectIcon({Page: page, selected:selectedId === page.id})}
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                  {page.children.length ? open?.get(page.id) ? <ExpandLess/> : <ExpandMore /> : <></>}
                </ListItemButton>
              </Tooltip>
              <Collapse in={handleCollapse(page.id)} timeout="auto" unmountOnExit>
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

  function ShowPopper(levelData: {pages: menuTreeT[], level: number, menuLevel: number}) {
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
              {/* <Tooltip title={page.name} placement="left"> */}
                <ListItemButton sx={{ pl: indent }} 
                             onMouseEnter={ (e) => {  
                              // page.children.length  > 0 &&
                              handleSubMenuHover(e, page)           
                            }
                            }
                            //  onMouseLeave={(e) =>{page.children.length  > 0 && handleMouseLeave(e,page)}}  
                 component="a" href={page.href} selected={selectedId === page.id} >
                  <ListItemIcon style={{minWidth: '30px', marginRight:12, marginLeft:13}}>
                    {SelectIcon({Page: page, selected:selectedId === page.id})}
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                  {page.children.length ? idToOpenPop.current?.get(page.id) ? <ChevronRightIcon/> : <ExpandMore /> : <></>}
                </ListItemButton>
              {/* </Tooltip> */}
              { (
                // <Paper>
                <div>

                  {/*Boolean(hoverId) &&  (page.parent_id===0 && hoverId===page.id)|| */}
              <Popper   open={(idToOpenPop.current.get(page.id)?true:false)}
              anchorEl={idToOpenPop.current.get(page.id)}   transition placement='right-start'
              // onMouseEnter={(e) => {
              //   // setHoverOpen(true);
              //   }}
              onMouseLeave={
                (e) =>{page.children.length  > 0 && handleMouseLeave(e,page)}
              //   (e)=>{
              //   handleOnPopperLeave(e,page)
              // }
            }
         
               
               >
                  {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                   {/* <List component="div"  disablePadding sx={{bgcolor:'white'}} > */}
                    <Paper elevation={3} style={{ maxHeight:"20em", overflowY: 'auto' }}>

                   { idToOpenPop.current.get(page.id)?ShowPopper({pages: page.children, level:page.id, menuLevel: 0}):''}
                   {/* {ShowPopper({pages: page.children, level:page.id, menuLevel: 0})} */}
                    </Paper>

                  {/* </List> */}
                </Grow>
              )}
            </Popper>
            </div>
            // </Paper>
          )
              }
            </>
            }
          </div>
        ))}
    </div>
    );
  }

  // this is the main component
  return (
    <List
      sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >

      {props.openDrawer ?
      ShowMenu({pages: props.pages, level:0, menuLevel: 0})
     :
     ShowPopper({pages: props.pages, level:0, menuLevel: 0})
    }
    </List>
  );
}


const SelectIcon: React.FC<{ Page: menuTreeT ,selected: boolean }> = ({ Page,selected }) => {
  // Find the corresponding icon component based on user selection
  const selectedIcon = nameIconArr.find((item) => item.name === Page.icon);

  return (
    <>
        {selectedIcon && (
             <div
             style={{
               display: 'inline-block',
               transition: 'color 0.3s',
              //  color: selected ? 'primary.main' : (Page.children.length > 0 ? 'secondary' : 'info'), // Change color if selected
               color: selected ? 'primary.main' : (Page.children.length > 0 ? 'secondary' : 'info'),
             }}
           >
          <selectedIcon.icon color={Page.children.length> 0 ? "secondary": "info"}/>
          </div>
        )}
    </>
  );
};

