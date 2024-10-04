"use client";

import { useEffect, useRef, useState } from "react";
import { GridColDef, GridFilterModel } from "@mui/x-data-grid";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  ClickAwayListener,
  Container,
  debounce,
  Divider,
  FormControlLabel,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Snackbar,
  Tooltip,
  Typography,
  TextField,
  styled,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { AddDialog } from "./addDialog";
import { RenderFormFunctionT } from "@/app/models/models";
import { StripedDataGrid } from "@/app/utils/styledComponents";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import { StyledMenu } from "../../utils/styledComponents";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { any } from "zod";
import { VisuallyHiddenInput } from "@/app/utils/styledComponents";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { useSearchParams } from "next/navigation";

type ModifyT = {
  title: string;
  renderForm?: RenderFormFunctionT;
  fetchDataFn: (
    page: number,
    searchText: string,
    pgSize: number
  ) => Promise<any>;
  fnFetchDataByID?: (id: number) => Promise<any>;
  fnDeleteDataByID?: (id: number) => Promise<any>;
  customCols: GridColDef[];
  AddAllowed: boolean;
};

const pgSize = 10;

enum dialogMode {
  Add,
  Modify,
  Delete,
}

export default function EntityList(props: ModifyT) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({ pageSize: pgSize, page: 0 });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [modData, setModData] = useState({});
  const [dlgMode, setDlgMode] = useState(dialogMode.Add);
  const [search, setSearch] = useState<string>("");
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({} as any);
  const [ids, setIds] = useState<number>(0);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [deleteMsg,setDeleteMsg] = useState<string>();

  const searchParams = useSearchParams();
  const searchData:string | null = searchParams.get("searchText")

  let searchText;
  useEffect(() => {
    const fetchData = debounce(async (searchText) => {
      const rows: any = await props.fetchDataFn(
        PageModel.page,
        searchText as string,
        pgSize as number
      );
      setData(rows.data);
      setNRows(rows.count as number);
    }, 400);
      
    if(searchData){
      fetchData(searchData);
    }else{
      fetchData(search);
    }
  }, [
    PageModel,
    filterModel,
    searchText,
    search,
    dialogOpen,
    dialogOpenDelete,
    searchData,
  ]);

  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl2(null);
  };

  async function onModifyDialog(modId: number) {
    if (props.fnFetchDataByID && modId) {
      const data = await props.fnFetchDataByID(modId);
      setModData(data[0]);
      setDialogOpen(true);
      setDlgMode(dialogMode.Modify);
    }
  }

  async function onDeleteDialog(modId: number) {
    if (props.fnDeleteDataByID && modId) {
      const data = await props.fnDeleteDataByID(modId);
        setDeleteMsg(data);
      
      setTimeout(() => {
        dialogOpenDelete ? setDialogOpenDelete(false) : null;
      }, 1000);
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseButtonMenu = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setOpen(false);
  };

  const columns1: GridColDef[] = [
    {
      field: "Icon menu",
      headerName: "Options",
      minWidth: 50,
      renderCell: (params) => {
        return <IconComponent id={params.row.id} />;
      },
    },
  ];

  const columns: GridColDef[] = columns1.concat(props.customCols);

  const columns3: GridColDef[] = columns1.concat(props.customCols);
  const [columns4, setColumns4] = useState(columns3);

  type colu = {
    field: keyof GridColDef;
    headerName: keyof GridColDef;
    editable: keyof GridColDef;
    minWidth: keyof GridColDef;
  };

  const handleColumnVisibilityChange = (col: GridColDef) => {
    setColumnVisibilityModel((prev: any) => {
      const newVisibilityModel = {
        ...prev,
        [col.field]: !prev[col.field],
      };
      setColumns4((prevColumns) => {
        const isColumnVisible = newVisibilityModel[col.field];
        if (isColumnVisible) {
          if (!prevColumns.some((item) => item.field === col.field)) {
            return [...prevColumns, col];
          }
        } else {
          return prevColumns.filter((item) => item.field !== col.field);
        }
        return prevColumns;
      });

      return newVisibilityModel;
    });
  };

  function ColumnVisibilityToggle(props: {
    columns1: GridColDef[];
    columns2: GridColDef[];
    handleColumnVisibilityChange: any;
  }) {
    const [columns1, setColumns1] = useState(props.columns1);
    const column1Fields = new Set(columns1.map((col) => col.field));
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {props.columns2.map((col) => (
          <FormControlLabel
            key={col.field}
            control={
              <Checkbox
                checked={column1Fields.has(col.field)} // Check if field exists in columns1
                onChange={() => props.handleColumnVisibilityChange(col)}
              />
            }
            label={col.headerName}
          />
        ))}
      </div>
    );
  }

  type iconT = {
    id: number;
  };

  function IconComponent(props: iconT) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <IconButton
              onClick={() => {
                onModifyDialog(props.id);
              }}
            >
              <EditIcon fontSize="large" />
              <Typography variant="h6">Edit</Typography>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <IconButton
              onClick={() => {
                setDialogOpenDelete(true);
                setIds(props.id);
              }}
            >
              <DeleteIcon />
              <Typography variant="h6">Delete</Typography>
            </IconButton>
          </MenuItem>
        </StyledMenu>
      </Box>
    );
  }

  function isSnakeCase(str: string): boolean {
    const snakeCaseRegex = /^[a-z]+(_[a-z]+)*$/;
    return snakeCaseRegex.test(str);
  }


  const columns2: GridColDef[] = [];
  let columnHeading = {
    field: "",
    headerName: "",
    editable: true,
    minWidth: 200,
  };

  type dataObj1 = { [key: string]: any };

  // function getUniqueObjects(
  //   arr1: GridColDef[],
  //   arr2: GridColDef[],
  //   key: keyof GridColDef
  // ) {
  //   // Combine both arrays
  //   const combined = [...arr1, ...arr2];

  //   // Create a Set to track unique values
  //   const uniqueSet = new Set();

  //   // Filter out unique objects based on the specified key
  //   const uniqueObjects = combined.filter((obj) => {
  //     // Create a unique identifier for the object based on the key
  //     const keyValue = obj[key];

  //     if (uniqueSet.has(keyValue)) {
  //       return false; // Object is not unique
  //     } else {
  //       uniqueSet.add(keyValue); // Add key value to Set
  //       return true; // Object is unique
  //     }
  //   });

  //   // Push unique objects from arr2 to arr1
  //   arr1.push(
  //     ...uniqueObjects.filter(
  //       (obj) => !arr1.some((existingObj) => existingObj[key] === obj[key])
  //     )
  //   );

  //   return arr1;
  // }

  function pushColumns(dataObj: dataObj1) {
    if (dataObj) {
      for (const key in dataObj) {
        const seenKeys = new Set();
        if (dataObj.hasOwnProperty(key)) {
          if (seenKeys.has(key)) {
            break;
          }
          seenKeys.add(key);
          let keyToUse: string;
          const result = isSnakeCase(key);
          let KeyToU: string;
          if (result) {
            keyToUse = key.replace(/_/g, " ");
            KeyToU = keyToUse.charAt(0).toUpperCase();
            KeyToU = KeyToU + keyToUse.slice(1);
            KeyToU = KeyToU.toLowerCase() // Ensure the string is in lowercase before capitalizing
              .replace(/\b\w/g, (char) => char.toUpperCase());
          } else {
            continue;
          }
          columnHeading = {
            ...columnHeading,
            field: key,
            headerName: KeyToU,
          };
          const exists = columns.some(
            (obj) => obj["field"] === columnHeading["field"]
          );
          if (!exists) {
            columns.push(columnHeading);
          }
        }
      }
    }
  }

  pushColumns(data[0]);

  return (
    <Box style={{ backgroundColor: "#fceff3", height: "100vh" }}>
      <SecondNavbar title={props.title}/>
      {/* </Toolbar> */}
      <Box style={{margin:"0 20px"}}>
        {/* <Grid container spacing={2} style={{ verticalAlign: "center" }}>
          <Grid item xs={8}>
            <Box sx={{ width: "75%" }}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                InputLabelProps={{
                  style: {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              textAlign: "right",
              marginTop: "1.1rem",
              paddingRight: "45px",
            }}
          >
            {props.AddAllowed && (
              <Box>
                <ButtonGroup
                  variant="contained"
                  ref={anchorRef}
                  aria-label="Button group with a nested menu"
                >
                  <Tooltip title="Add New">
                    <Button
                      onClick={() => {
                        setDialogOpen(true);
                        setDlgMode(dialogMode.Add);
                      }}
                    >
                      <AddIcon
                        fontSize="small"
                        style={{ marginRight: "5px" }}
                      />
                      Add New
                    </Button>
                  </Tooltip>
                  <Tooltip title="More Options">
                    <Button
                      size="small"
                      aria-controls={open ? "split-button-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={handleToggle}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
                <Popper
                  sx={{ zIndex: 1 }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseButtonMenu}>
                          <Tooltip title="Upload File">
                            <Button
                              key={"Upload File"}
                              onClick={handleMenuItemClick}
                              component="label"
                              role={undefined}
                              variant="outlined"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              <VisuallyHiddenInput
                                type="file"
                                onChange={(event: {
                                  target: { files: any };
                                }) => {
                                  const file = event.target.files[0];
                                  if (file) {
                                    console.log("Selected file:", file.name);
                                    // Add your file upload logic here
                                  }
                                }}
                                multiple
                              />
                              Upload File
                            </Button>
                          </Tooltip>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            )}
          </Grid>
          <Grid item xs={1} sx={{ verticalAlign: "center", marginTop: "10px" }}>
            <Tooltip title="Manage Columns">
              <IconButton
                aria-controls="tune-menu"
                aria-haspopup="true"
                onClick={handleClick1}
              >
                <TuneIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Box>
              <StyledMenu
                id="tune-menu"
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={handleClose1}
              >
                <ColumnVisibilityToggle
                  columns1={columns4}
                  columns2={columns}
                  handleColumnVisibilityChange={handleColumnVisibilityChange}
                />
              </StyledMenu>
            </Box>
          </Grid>
        </Grid> */}
        {dialogOpen && (
          <AddDialog title={""} open={dialogOpen} setDialogOpen={setDialogOpen}>
            {props.renderForm
              ? dlgMode === dialogMode.Add
                ? props.renderForm(setDialogOpen, (arg) => {})
                : props.renderForm(setDialogOpen, (arg) => {}, modData)
              : 1}
          </AddDialog>
        )}
        {dialogOpenDelete && (
          <AddDialog
            title={""}
            open={dialogOpenDelete}
            setDialogOpen={setDialogOpenDelete}
          >
            <Box id="sourceForm" style={{ padding: "20px", marginTop: "20px" }}>
              <form>
                <Typography variant={"h5"} style={{ paddingBottom: "10px" }}>
                  Are you sure you want to delete?
                </Typography>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  m={1}
                >
                  <Button
                    style={{ paddingRight: "20px" }}
                    onClick={() => {
                      setDialogOpenDelete(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      onDeleteDialog(ids);
                      setSnackOpen(true);
                    }}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </Box>
              </form>
              <Snackbar
                open={snackOpen}
                autoHideDuration={1000}
                onClose={() => setSnackOpen(false)}
                message="Record Deleted!"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              />
            </Box>
          </AddDialog>
        )}
        <Paper
          elevation={3}
          sx={{
            // height: 400,
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Grid container spacing={2} style={{ verticalAlign: "center" }}>
            <Grid item xs={8}>
              <Box sx={{ width: "50%" }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    style: {
                      backgroundColor: "#f5f5f5",
                      marginLeft: "1.1em",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                textAlign: "right",
                marginTop: "1.1rem",
                paddingRight: "45px",
              }}
            >
              {props.AddAllowed && (
                <Box>
                  <ButtonGroup
                    variant="contained"
                    ref={anchorRef}
                    aria-label="Button group with a nested menu"
                    sx={{
                      '& .MuiButtonGroup-grouped': {
                        borderColor: '#fff', // Change the separator color
                      },
                      '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                        borderRightColor: '#fff', // Change the color of the separator
                      }
                    }}
                  >
                    <Tooltip title="Add New">
                      <Button
                        onClick={() => {
                          setDialogOpen(true);
                          setDlgMode(dialogMode.Add);
                        }}
                        style={{ backgroundColor: "#e05a5a" }}
                      >
                        <AddIcon
                          fontSize="small"
                          style={{ marginRight: "5px" }}
                        />
                        Add New
                      </Button>
                    </Tooltip>
                    <Tooltip title="More Options">
                      <Button
                        size="small"
                        aria-controls={open ? "split-button-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                        style={{ backgroundColor: "#e05a5a" }}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                  <Popper
                    sx={{ zIndex: 1 }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener
                            onClickAway={handleCloseButtonMenu}
                          >
                            <Tooltip title="Upload File">
                              <Button
                                key={"Upload File"}
                                onClick={handleMenuItemClick}
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{bordercolor:"#e05a5a", color:"#e05a5a"}}
                              >
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event: {
                                    target: { files: any };
                                  }) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      console.log("Selected file:", file.name);
                                      // Add your file upload logic here
                                    }
                                  }}
                                  multiple
                                />
                                Upload File
                              </Button>
                            </Tooltip>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                verticalAlign: "center",
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-end",
              }}
            >
              <Tooltip title="Manage Columns">
                <IconButton
                  aria-controls="tune-menu"
                  aria-haspopup="true"
                  onClick={handleClick1}
                >
                  <TuneIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Box>
                <StyledMenu
                  id="tune-menu"
                  anchorEl={anchorEl2}
                  open={Boolean(anchorEl2)}
                  onClose={handleClose1}
                >
                  <ColumnVisibilityToggle
                    columns1={columns4}
                    columns2={columns}
                    handleColumnVisibilityChange={handleColumnVisibilityChange}
                  />
                </StyledMenu>
              </Box>
            </Grid>
          </Grid>
          <StripedDataGrid
            rows={data ? data : []}
            columns={columns4}
            rowCount={NRows}
            getRowId={(row) => row.id}
            pagination={true}
            pageSizeOptions={[pgSize]}
            paginationMode="server"
            paginationModel={PageModel}
            onPaginationModelChange={setPageModel}
            filterMode="server"
            onFilterModelChange={setFilterModel}
            loading={!data}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            disableRowSelectionOnClick
            checkboxSelection
            autoHeight
          />
        </Paper>
      </Box>
    </Box>
  );
}