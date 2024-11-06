import * as React from "react";
import { useEffect, useState, useRef } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { menuTreeT } from "../../models/models";
import { nameIconArr } from "../../utils/iconmap.utils";
import { Popper, Grow, Popover, Paper, MenuItem } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { currencySchema } from "@/app/zodschema/zodschema";

export default function LeftMenuTree(props: {
  pages: menuTreeT[];
  openDrawer: boolean;
  setOpenDrawer?: any;
}) {
  const [open, setOpen] = React.useState<Map<number, boolean>>();
  const [openPop, setOpenPop] =
    React.useState<Map<number, HTMLElement | null>>();
  // const [hoverOpen, setHoverOpen] = React.useState< boolean>(false);
  const [hoverId, setHoverId] = React.useState<number | null>(null);
  // const hoverId = useRef<number | null>(null); 
  const [selectedId, setSelectedId] = React.useState<number | null>(null); // Track selected item
  const [openn, setOpenn] = useState(false);
  // const [openPopper, setOpenPopper] = useState<Map<number, boolean>>(new Map()); // Track which poppers are open

  // const isHoveringPopper = useRef<boolean>(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  let lastKey; 
  const [lastele , setLastEle] = useState<number>(0);
  const [parentId,setParentId] = useState<number[]>([]);
  const [isHoveringPopper, setIsHoveringPopper] = useState<boolean>(false); // Track if hovering over popper


  // const idToOpenPop = React.useRef(new Map(openPop));
  const idToOpenPop = useRef(new Map());
  const pages = props.pages;

  useEffect(() => {
    if (!props.openDrawer) {
      const collapsedMap = new Map(open);
      for (let key of collapsedMap.keys()) {
        collapsedMap.set(key, false);
      }
      setOpen(collapsedMap);
    } else {
      const idToOpenMap: Map<number, boolean> = new Map([]);
      pages.forEach((page) => {
        if (page.children.length > 0) {
          idToOpenMap.set(page.id, false);
        }
      });
      setOpen(idToOpenMap);
      ShowMenu({ pages: pages, level: 0, menuLevel: 0 });
    } 
      return () => {
        clearTimeout(timeoutRef.current);
    };
  }, [props.openDrawer,hoverId]);

  function handleHeaderMenuClick(id: number) {
    const idToOpenMap: Map<number, boolean> = new Map(open);
    idToOpenMap.set(id, !idToOpenMap.get(id));
    props.setOpenDrawer(true);
    setOpen(idToOpenMap);
    setSelectedId(id);
  }

  let arra1 = [0,2,5,9,12,5,51,54];

  function handleSubMenuHover(
    event: React.MouseEvent<HTMLElement>,
    page: menuTreeT
  ) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
      //  parentId.push(page.parent_id);
      //   setParentId(parentId);
      //   let lastE = parentId[parentId.length - 1]
      //   setLastEle(lastE);
      //   console.log(parentId);
      //   console.log(lastele);
  
      if (page.children.length > 0){

        if(page.id == page.parent_id){
          console.log("working")
          idToOpenPop.current.clear();
          idToOpenPop.current.set(page.id, event.currentTarget);
          setHoverId(page.id);

        }else{
          idToOpenPop.current.set(page.id, event.currentTarget);
          setHoverId(page.id);
        }



        // if(arra1.includes(page.id)){
        //   console.log("working if")
        //   idToOpenPop.current.clear();
        //   idToOpenPop.current.set(page.id, event.currentTarget);
          // setHoverId(page.id);
          
        // }else{
          // idToOpenPop.current.set(page.id, event.currentTarget);
          // setHoverId(prev=>prev);
        // }

        // console.log(page.id);
        // console.log("parentid",page.parent_id);
      
        // console.log(idToOpenPop)
        console.log("parent",page.parent_id);
        console.log("page",page.id)
        // console.log(hoverId)
        // if(page.parent_id !== lastele){
          
        // }
    }
   
  }

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLElement>,
    page: menuTreeT
  ) => {
    // console.log(page.id);
    // console.log(page.parent_id);
    
    // console.log("state",timeoutRef.current);
  // if(page.parent_id < lastele){
    if(timeoutRef.current == undefined){
      timeoutRef.current=   setTimeout(() => {
        // setIsHoveringPopper(false);
        // console.log("leave map working");
        // setHoverId(page.parent_id);
         setHoverId(page.id);
          
        // let greatestKey = null;
        // for (const key of idToOpenPop.current.keys()) {
        //   if (greatestKey === null || key > greatestKey) {
        //     greatestKey = key;
        //   }
        // }
        // if (greatestKey !== null) {
        //   idToOpenPop.current.delete(greatestKey);
        //   console.log("leaveing",idToOpenPop);
        // }

   idToOpenPop.current.clear();

        //  lastKey = Array.from(idToOpenPop.current.keys()).pop();  // Gets the last key
        //  idToOpenPop.current.delete(lastKey);

      }, 100);
    }
  // }else{
  //   idToOpenPop.current.clear();
  // }
     
  };

  //   const handleMouseLeave = (event :React.MouseEvent<HTMLElement>,page:menuTreeT) => {
  //     console.log("leave")
      // setHoverId(page.id);
  //     // idToOpenPop.current

  // };

  const handleOnPopperLeave = (event :React.MouseEvent<HTMLElement>,page:menuTreeT)=>{
    // if(page.)
    // setHoverOpen(false);
    // let greatestKey = null;
    // for (const key of idToOpenPop.current.keys()) {
    //   if (greatestKey === null || key > greatestKey) {
    //     greatestKey = key;
    //   }
    // }
    // if (greatestKey !== null) {
    //   setHoverId(greatestKey);
    //   idToOpenPop.current.delete(greatestKey);
    //   console.log("popper leave",idToOpenPop)
    // }

    let lastKey = Array.from(idToOpenPop.current.keys()).pop();  // Gets the last key

    // Remove the last inserted element
             idToOpenPop.current.delete(lastKey);
  }

  // const handleOnPopperLeave = (
  //   event: React.MouseEvent<HTMLElement>,
  //   page: menuTreeT
  // ) => {
  //   // setHoverOpen(false);
  //   // let greatestKey = null;
  //   // for (const key of idToOpenPop.current.keys()) {
  //   //   if (greatestKey === null || key > greatestKey) {
  //   //     greatestKey = key;
  //   //   }
  //   // }
  //   // if (greatestKey !== null) {
  //   //   idToOpenPop.current.delete(greatestKey);
  //   //   console.log("popper leave",idToOpenPop)
  //   // }
  //   // setHoverId(page.parent_id);
  //   console.log(hoverId);
  //   // setHoverId(page.parent_id);
  //   idToOpenPop.current.clear();
  //   console.log("popper leave", idToOpenPop);
  // };

  function handleCollapse(id: number): boolean {
    return props.openDrawer ? open?.get(id) ?? false : false;
  }

  function generateHref(optionName: string) {
    let href = "#";
    if (optionName === "Add User") {
      href = "/cap/admin/adduser";
    }
    return href;
  }

  function ShowMenu(levelData: {
    pages: menuTreeT[];
    level: number;
    menuLevel: number;
  }) {
    const level = levelData.level;
    const pages = levelData.pages;
    const indent = levelData.menuLevel;

    function ShowIcon(key: String) {
      const icon = nameIconArr.find(
        (obj) => obj.name === "DashboardIcon"
      )?.icon;

      return { icon };
    }

    return (
      <div>
        {pages.map((page, index) => (
          <div key={index}>
            {page.parent_id === level && (
              <>
                <Tooltip title={page.name} placement="right">
                  <ListItemButton
                    sx={{ pl: indent }}
                    onClick={(e) => handleHeaderMenuClick(page.id)}
                    component="a"
                    href={
                      page.href !== "#" ? page.href : generateHref(page.name)
                    }
                    selected={selectedId === page.id}
                  >
                    <ListItemIcon
                      style={{
                        minWidth: "30px",
                        marginRight: 12,
                        marginLeft: 13,
                      }}
                    >
                      {SelectIcon({
                        Page: page,
                        selected: selectedId === page.id,
                      })}
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                    {page.children.length ? (
                      open?.get(page.id) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : (
                      <></>
                    )}
                  </ListItemButton>
                </Tooltip>
                <Collapse
                  in={handleCollapse(page.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {ShowMenu({
                      pages: page.children,
                      level: page.id,
                      menuLevel: indent + 2,
                    })}
                  </List>
                </Collapse>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }












  function ShowPopper(levelData: {
    pages: menuTreeT[];
    level: number;
    menuLevel: number;
  }) {
    const level = levelData.level;
    const pages = levelData.pages;
    const indent = levelData.menuLevel;

    function ShowIcon(key: String) {
      const icon = nameIconArr.find(
        (obj) => obj.name === "DashboardIcon"
      )?.icon;

      return { icon };
    }

    return (
      <div>
        {pages.map((page, index) => (
          <div key={index}>
            {page.parent_id === level && (
              <div>
                {/* <Tooltip title={page.name} placement="left"> */}
                <ListItemButton
                  sx={{ pl: indent }}
                  onMouseEnter={(e) => {
                    handleSubMenuHover(e, page);
                  }}
                  onMouseLeave={(e) => {
                    // page.children.length  > 0 &&
                    handleMouseLeave(e, page);
                  }}
                  component="a"
                  href={page.href}
                  selected={selectedId === page.id}
                >
                  <ListItemIcon
                    style={{
                      minWidth: "30px",
                      marginRight: 12,
                      marginLeft: 13,
                    }}
                  >
                    {SelectIcon({
                      Page: page,
                      selected: selectedId === page.id,
                    })}
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                  {page.children.length ? (
                    idToOpenPop.current?.get(page.id) ? (
                      <ChevronRightIcon />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    <></>
                  )}
                </ListItemButton>
                {/* </Tooltip> */}
                {
                  <>
                    {/*Boolean(hoverId) &&  (page.parent_id===0 && hoverId===page.id)|| */}
                    
                    <Popper
                      open={idToOpenPop.current.has(page.id)}
                      // open={(hoverId == lastKey)?true:false}
                      anchorEl={idToOpenPop.current.get(page.id)}
                      transition
                      placement="right-start"
                      onMouseEnter={(e) => {
                        // setHoverOpen(true);
                        // setHoverId(page.id);
                        // setIsHoveringPopper(true);
                        // console.log("popper enter", page.id);
                      }}
                      onMouseLeave={
                        (e) => {
                          // page.children.length > 0 &&
                            // handleOnPopperLeave(e, page);
                        }
                      }
                    >
                      {({ TransitionProps }) => (
                        <Grow {...TransitionProps}>
                          <List component="div"  disablePadding sx={{bgcolor:'white'}} >
                          <Paper
                            elevation={3}
                            style={{ maxHeight: "20em", overflowY: "auto" }}
                          >
                            {/* <List> */}
                              {/* { idToOpenPop.current.get(page.id)?ShowPopper({pages: page.children, level:page.id, menuLevel: 0}):''} */}
                              {ShowPopper({
                                pages: page.children,
                                level: page.id,
                                menuLevel: 0,
                              })}
                            {/* </List> */}
                          </Paper>

                          </List>
                        </Grow>
                      )}
                    </Popper>
                  </>
                }
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // this is the main component
  return (
    <div>

    <List
      sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      >
      {/* {props.openDrawer? 
        ShowMenu({ pages: props.pages, level: 0, menuLevel: 0 })
        : ShowPopper({ pages: props.pages, level: 0, menuLevel: 0 })} */}
         {
        ShowMenu({ pages: props.pages, level: 0, menuLevel: 0 })}
    </List>
        </div>
  );
}

const SelectIcon: React.FC<{ Page: menuTreeT; selected: boolean }> = ({
  Page,
  selected,
}) => {
  // Find the corresponding icon component based on user selection
  const selectedIcon = nameIconArr.find((item) => item.name === Page.icon);

  return (
    <>
      {selectedIcon && (
        <div
          style={{
            display: "inline-block",
            transition: "color 0.3s",
            //  color: selected ? 'primary.main' : (Page.children.length > 0 ? 'secondary' : 'info'), // Change color if selected
            color: selected
              ? "primary.main"
              : Page.children.length > 0
              ? "secondary"
              : "info",
          }}
        >
          <selectedIcon.icon
            color={Page.children.length > 0 ? "secondary" : "info"}
          />
        </div>
      )}
    </>
  );
};
