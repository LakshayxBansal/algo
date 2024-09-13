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
  const [search, setSearch] = useState("");
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({} as any);
  const [ids, setIds] = useState<number>(0);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

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

    fetchData(search);
  }, [
    PageModel,
    filterModel,
    searchText,
    search,
    dialogOpen,
    dialogOpenDelete,
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
    console.log("clicked delete dialog");
    if (props.fnDeleteDataByID && modId) {
      const data = await props.fnDeleteDataByID(modId);
      if (data.status) {
        // setSnackOpen(true);
      }
      setTimeout(() => {
        dialogOpenDelete ? setDialogOpenDelete(false) : null;
      }, 1000);
    }
  }

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibilityModel((prev: { [x: string]: any }) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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
    // setSelectedIndex(index);
    setOpen(false);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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

  const columns1: GridColDef[] = [
    {
      field: "Icon menu",
      headerName: "Options",
      minWidth:200, 
      renderCell: (params) => {
        return <IconComponent id={params.row.id} />;
      },
    },
  ];

  // const columns: GridColDef[] = columns1.concat(props.customCols);

  

  const columns2: GridColDef[] = [];
  let columnHeading = {
    field: "",
    headerName: "",
    editable: true,
    minWidth: 200,
  };
  
  const dataObj:{ [key: string]: any } = data[0];
  if (dataObj) {
    for (const key in dataObj) {
      const seenKeys = new Set();
      if (dataObj.hasOwnProperty(key)) {
        if (seenKeys.has(key)) {
          break;
        }
        seenKeys.add(key);  
        columnHeading = {
          ...columnHeading,
          field:key,
          headerName:key,
        }
      columns2.push(columnHeading);
      }
    }
  }

  const columns: GridColDef[] = columns1.concat(columns2);




  // console.log(columns2);

  return (
    <Container
      maxWidth="lg"
      style={{ height: "500px", width: "100%", padding: "25px" }}
    >
      <Typography variant="h4">{props.title}</Typography>
      <Divider />
      <Grid container spacing={2} style={{ verticalAlign: "center" }}>
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
          sx={{ textAlign: "right", marginTop: "1.1rem", paddingRight: "45px" }}
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
                    <AddIcon fontSize="small" style={{ marginRight: "5px" }} />
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
                        placement === "bottom" ? "center top" : "center bottom",
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
                              onChange={(event: { target: { files: any } }) => {
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                {columns.map((col) => (
                  <FormControlLabel
                    key={col.field}
                    control={
                      <Checkbox
                        checked={columnVisibilityModel[col.field] !== false}
                        onChange={() => handleColumnVisibilityChange(col.field)}
                      />
                    }
                    label={col.headerName}
                  />
                ))}
              </div>
            </StyledMenu>
          </Box>
        </Grid>
      </Grid>
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
              <Typography variant={"h4"} style={{ paddingBottom: "10px" }}>
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
      <StripedDataGrid
        rows={data ? data : []}
        columns={columns}
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
      />
    </Container>
  );
}
