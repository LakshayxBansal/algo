import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Popper, Grow, Paper, Typography, Box, Slide, LinearProgress } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { menuTreeT } from "../../models/models";
import { nameIconArr } from "../../utils/iconmap.utils";
import { useRouter } from "next/navigation";



export default function LeftMenuTree(props: {
  pages: menuTreeT[];
  openDrawer: boolean;
  setOpenDrawer?: any;
  isHover?: boolean;
}) {
  const [open, setOpen] = React.useState<Map<number, boolean>>();
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [openPopper, setOpenPopper] = useState<Map<number, boolean>>(new Map());
  // const [hoverId, setHoverId] = React.useState<number | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false); 

  const router = useRouter();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const idToOpenPop = useRef<Map<number, HTMLElement | null>>(new Map());
  let arra1 = [0, 2, 5, 9, 12, 51, 54,61];
  const pages = props.pages;



  useEffect(()=>{
    if(isPending){
      document.body.classList.add('cursor-wait');
    }
    else {
      document.body.classList.remove('cursor-wait');
    }
  },[isPending]);


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
    
  }, [props.openDrawer, openPopper]);

  function handleHeaderMenuClick(id: number, href:string) {
    const idToOpenMap: Map<number, boolean> = new Map(open);
    idToOpenMap.set(id, !idToOpenMap.get(id));
    props.setOpenDrawer(true);
    setOpen(idToOpenMap);
    setSelectedId(id);
    startTransition(() => {
      router.push(href)
      document.body.classList.add('cursor-wait');
     
    })
  }

  function handleSubMenuHover(
    event: React.MouseEvent<HTMLElement>,
    page: menuTreeT
  ) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
    // setHoverId(page.id);
    if (arra1.includes(page.parent_id)) {
      idToOpenPop.current.set(page.id, event.currentTarget);
      if (page.parent_id == 0) {
        openPopper.clear();
        setOpenPopper((prevState) => new Map(prevState.set(page.id, true)));
      } 
      else if (page.parent_id == 5) {
        openPopper.clear();
        setOpenPopper((prevState) => new Map(prevState.set(5, true)));
        setOpenPopper((prevState) => new Map(prevState.set(page.id, true)));
      } else if (page.parent_id == 9) {
        openPopper.clear();
        setOpenPopper((prevState) => new Map(prevState.set(5, true)));
        setOpenPopper((prevState) => new Map(prevState.set(9, true)));
        setOpenPopper((prevState) => new Map(prevState.set(page.id, true)));
      } 
      else if (page.parent_id == 61) {
        openPopper.clear();
        setOpenPopper((prevState) => new Map(prevState.set(61, true)));
        setOpenPopper((prevState) => new Map(prevState.set(page.id, true)));
      }
    }
  }

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLElement>,
    page: menuTreeT
  ) => {
    if (timeoutRef.current == undefined) {
      timeoutRef.current = setTimeout(() => {
        // setHoverId(page.id);
        idToOpenPop.current.clear();
        setOpenPopper((prevState) => new Map());
      }, 500);
    }
  };

  const handleMousePopper = (
    event: React.MouseEvent<HTMLElement>,
    page: menuTreeT
  ) => {
    // setHoverId(page.id);
    idToOpenPop.current.clear();
    // setOpenPopper((prevState) => new Map(prevState.clear()));
    openPopper.clear();
  };

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

  const handleTransiton =  (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    startTransition(() => {
      router.push(href)
      document.body.classList.add('cursor-wait');
     
    })
     
  };


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
        {
          pages.map((page, index) => (
            <div key={index}>
              {page.parent_id === level && (
                <>
                  <Tooltip title={page.name} placement="right">
                    <ListItemButton
                      sx={{ pl: indent }}
                      onClick={(e) =>{ e.preventDefault(); handleHeaderMenuClick(page.id, page.href)}}
                      component="a"
                      selected={selectedId === page.id}
                      tabIndex={-1}
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
                      ) : null}
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
          ))
        }
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
              <Box>
                <ListItemButton
                  sx={{ pl: indent }}
                  onMouseEnter={(e) => {
                    handleSubMenuHover(e, page);
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave(e, page);
                  }}
                  component="a"
                  onClick={(e) => handleTransiton(e, page.href)}
                  // href={page.href}
                  selected={selectedId === page.id}
                  tabIndex={-1}
                  style={
                    page.parent_id == 0 && props.isHover
                      ? { display: "flex", flexDirection: "column" }
                      : { margin: "7px 0" }
                  }
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

                  {/* {
                    (page.parent_id ==0 && hover) ? (
                      <Typography variant="caption">
                      {page.name}
                      </Typography> 
                      ) :(<ListItemText primary={page.name} />)
                  } */}

                  {/* {page.parent_id == 0 && props.isHover ? (
                    <Typography variant="caption">{page.name}</Typography>
                  ) : (
                    <></>
                  )}

                  {page.parent_id > 0 && <ListItemText primary={page.name} />}

                  {page.children.length && page.parent_id > 0 ? (
                    openPopper?.get(page.id) ? (
                      <ChevronRightIcon />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    <></>
                  )} */}
                  <ListItemText primary={page.name} />
                  {page.children.length > 0 ? (
                    openPopper?.get(page.id) ? (
                      <ChevronRightIcon />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    <></>
                  )}
                </ListItemButton>
                {
                  <>
                    {/*Boolean(hoverId) &&  (page.parent_id===0 && hoverId===page.id)|| */}
                    <Popper
                      // open={idToOpenPop.current.has(page.id)}
                      // open={hoverId === page.id || hoverId === page.parent_id}
                      open={openPopper.get(page.id) ? true : false}
                      anchorEl={idToOpenPop.current.get(page.id)}
                      transition
                      placement="right-start"
                      style={{ position: "absolute", zIndex: "9999" }}
                    >
                      {({ TransitionProps }) => (
                        <Grow {...TransitionProps}>
                          <Paper
                            elevation={8}
                            style={{ maxHeight: "20em", overflowY: "auto" }}
                          >
                            {/* <div style={{backgroundColor:"#fff" , zIndex:9999}}> */}

                            {ShowPopper({
                              pages: page.children,
                              level: page.id,
                              menuLevel: 0,
                            })}
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </>
                }
              </Box>
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
        sx={{ width: "100%", maxWidth: 560,overflowX:"hidden", bgcolor: "background.paper", padding: 0}}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {props.openDrawer
          ? ShowMenu({ pages: props.pages, level: 0, menuLevel: 0 })
          : ShowPopper({ pages: props.pages, level: 0, menuLevel: 0 })}
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
