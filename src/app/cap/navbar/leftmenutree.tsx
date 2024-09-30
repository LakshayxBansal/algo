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
import { Popper, Grow, Popover } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function LeftMenuTree(props: {pages:menuTreeT[], openDrawer:boolean,setOpenDrawer?: any}) {
  const [open, setOpen] = React.useState<Map<number, boolean>>();

  const [openPop, setOpenPop] = React.useState<Map<number, boolean>>();
  const [hoverOpen, setHoverOpen] = React.useState< boolean>(false);
  const [hoverId, setHoverId] = React.useState< number[]>([]);

  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null); // Track selected item


  const [openPopper, setOpenPopper] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const [listButton, setListButton] = useState(false);


  const [isPopperHovered, setIsPopperHovered] = useState(false);

  const [isButtonHovered, setIsButtonHovered] = useState(false);



  const anchorRef = React.useRef()


//stack overflow example
// const [state, setState] = useState({anchorEl:null, mouseOverButton:false, mouseOverMenu:false});

const[mouseOverButton , setMouseOverButton]= useState(false);
const[mouseOverMenu , setMouseOverMenu]= useState(false);

const enterButton = () => {
  setMouseOverButton(true);
}

const leaveButton = () => {
  // Set a timeout so that the menu doesn't close before the user has time to
  // move their mouse over it
  setTimeout(() => {
    setMouseOverButton(false);
  }, 1000);
}






  // const anchorRef = useRef<null | HTMLElement>(null);
  // const popperRef = useRef<HTMLDivElement>(null);


  const pages = props.pages;

  // const parentId = props.pages.map(page=>page.children);

  // console.log(parentId);


  type DlgState = {
    [key: string]: HTMLElement | null;
  };

    const [dlgState, setDlgState] = React.useState<DlgState>({});



  useEffect(() => {
    if (!props.openDrawer) {
      const collapsedMap = new Map(open);
      for (let key of collapsedMap.keys()) {
        collapsedMap.set(key, false);
      }
      setOpen(collapsedMap);
      const idToOpenPop: Map<number, boolean> = new Map([]);
      pages.forEach(page => {
      if (page.children.length > 0) {
        // page.children.forEach(page=>{
          idToOpenPop.set(page.id, false);
        // })
      }
      setOpenPop(idToOpenPop);
    });
      
    }else{
      const idToOpenMap: Map<number, boolean> = new Map([]);
      pages.forEach(page => {
      if (page.children.length > 0) {
        idToOpenMap.set(page.id, false)
      }
    });
    setOpen(idToOpenMap);
    const str = ShowMenu({pages: pages, level:0, menuLevel:0});
  }

  // setTimeout(() => setAnchorEl(anchorRef?.current), 1) 

  }, [props.openDrawer,anchorRef]);




  function handleHeaderMenuClick(id: number) {
    const idToOpenMap: Map<number, boolean> = new Map(open);
      idToOpenMap.set(id, !idToOpenMap.get(id));
      props.setOpenDrawer(true);
      setOpen(idToOpenMap);
      setSelectedId(id);
      console.log("maooings",idToOpenMap,id)
  }

  function handleClick( event: React.MouseEvent<HTMLElement>) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }


  const idToOpenPop: Map<number, boolean> = new Map(openPop);
  function handleSubMenuHover( event: React.MouseEvent<HTMLElement>, page: menuTreeT) {

    
    if(idToOpenPop.get(page.id) == true){
      idToOpenPop.set(page.id, true);
    }else{
      idToOpenPop.set(page.id, !idToOpenPop.get(page.id));
    }
      // props.setOpenDrawer(true);
      setOpenPop(idToOpenPop);

      page.parent_id===0?setHoverId([]):null
      
      if(page.children.length>0) 
      {
        hoverId.push(page.id)
        setHoverId(hoverId)}
      console.log("enter", idToOpenPop);
      setHoverOpen(true);
      setAnchorEl(event.currentTarget);

      // setSelectedId(id);
      // console.log("maooings",idToOpenMap,id)
  }

  // function handleSubMenuHover(event: React.MouseEvent<HTMLElement>, id: number) {
  //   const idToOpenPop: Map<number, boolean> = new Map(openPop);
    
  //   // Set the Popper for the current id to true (open it)
  //   idToOpenPop.set(id, true);
    
  //   setOpenPop(idToOpenPop); // Update state to keep the popper open
  //   setAnchorEl(event.currentTarget); // Set anchor for the popper
  // }

  const handleMouseLeave = (event :React.MouseEvent<HTMLElement>,page:menuTreeT) => {
    // const idToOpenPop: Map<number, boolean> = new Map(openPop);

    // setTimeout(() => {
      // if(idToOpenPop.get(id) == true){
      //   idToOpenPop.set(id, false);     
      // // }
      // setOpenPop(idToOpenPop);
      // console.log("leave ", idToOpenPop);
      // setAnchorEl(null);
    // }, 10000);
    if(page.parent_id === 0 && hoverId.length >0 )
   {setTimeout(() => {
    {
      setHoverId([]);
    }
   }, 500);
  }
  };

  // function handleMouseLeave(event: React.MouseEvent<HTMLElement>, id: number) {
  //   const idToOpenPop: Map<number, boolean> = new Map(openPop);

  //   setTimeout(() => {
    
  //     if (idToOpenPop.has(id)) {
  //       idToOpenPop.set(id, !idToOpenPop.get(id)); // Collapse the submenu on mouse leave
  //     }
      
  //     setOpenPop(idToOpenPop);
  //     setAnchorEl(null); // Optionally reset the anchor element
  //   }, 100000);
 
  // }


  const handleIconMenu = (e:any)=>{
    console.log('popper');
    setTimeout(() => {
      // setHoverOpen(true);
     // !hoverOpen?handleSubMenuHover(e,page.id):null
     !hoverOpen && setAnchorEl(e.currentTarget)
    },1000000);
  
                
  }



  // console.log(selectedId);

  //   function handleCollapse(id: number):boolean{
  //     const idToOpenMap: Map<number, boolean> = new Map(open);
  //     let value:boolean = open?.get(id)!;
  //     if(props.openDrawer){
  //       return value;   
  //     }else{
  //         //  pages.forEach(page=>{ 
  //       // if(page.children.length > 0){
  //         // idToOpenMap.set(id, false);
  //         // setOpen(idToOpenMap);

  //       // }
  //     // })
  //     // setOpen(idToOpenMap);
  //     console.log("false or true", )
  //     value=false;
  //     return value;
  //     }
  // }

  function handleCollapse(id: number): boolean {
    return props.openDrawer ? open?.get(id) ?? false : false;
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
                <ListItemButton sx={{ pl: indent }} onClick={(e) => handleHeaderMenuClick(page.id)}  component="a" href={page.href} selected={selectedId === page.id} >
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
                  {/* {level} */}
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
              <Tooltip title={page.name} placement="left">
                <ListItemButton sx={{ pl: indent }} 
                             onMouseEnter={ (e) => {
                              // console.log('list hover',level)
                              // setHoverId(page.id)
                              // setHoverOpen(true);
                              page.children.length  > 0 &&
                              handleSubMenuHover(e, page)
                              // console.log("data",page)
                              // setIsPopperHovered(true)
                              // setIsButtonHovered(true);
                              // setAnchorEl(e.currentTarget);

                              // (e) => {!openPop?.get(page.id)?
                              // handleSubMenuHover(e,page.id):null}

                              // page.children.length > 0 &&  setAnchorEl(e.currentTarget)              
                            }
                            }
                             onMouseLeave={(e) => handleMouseLeave(e,page)}                // onClick={(e) => handleSubMenuClick(page.id)} 
                 component="a" href={page.href} selected={selectedId === page.id} >
                  <ListItemIcon style={{minWidth: '30px', marginRight:12, marginLeft:13}}>
                    {SelectIcon({Page: page, selected:selectedId === page.id})}
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                  {page.children.length ? openPop?.get(page.id) ? <ChevronRightIcon/> : <ExpandMore /> : <></>}
                </ListItemButton>
              </Tooltip>
              {
              <Popper   open={hoverId.includes(page.id)}
              anchorEl={anchorEl}   transition 
              // onMouseLeave={(e) => handleMouseLeave(e,page.id)}
              //  onMouseEnter={(e) => {handleIconMenu}}
               onMouseEnter={(e) =>{
                console.log("popper")
                // setIsPopperHovered(true)
                // handleSubMenuHover(e, page.id)

                }}
               
               >
                  {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                   <List component="div"  disablePadding >
                          { ShowPopper({pages: page.children, level:page.id, menuLevel: indent+10})}
                  </List>
                </Grow>
              )}
            </Popper>
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

