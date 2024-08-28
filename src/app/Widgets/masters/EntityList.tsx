"use client";

import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { AddDialog } from "./addDialog";
import { RenderFormFunctionT } from "@/app/models/models";
import { StripedDataGrid } from "@/app/utils/styledComponents";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";

type ModifyT = {
  renderForm?: RenderFormFunctionT;
  fetchDataFn: (
    page: number,
    value: any,
    pgSize: number,
    searchText: string
  ) => Promise<any>;
  fnFetchDataByID?: (id: number) => Promise<any>;
  customCols: GridColDef[];
  AddAllowed: boolean;
};

const pgSize = 10;

enum dialogMode {
  Add,
  Modify,
}

export default function EntityList(props: ModifyT) {
  const [id, setId] = useState("-1");
  const [name, setName] = useState<String>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [data, setData] = useState([]); // change to rows and type will be dynamic
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({ pageSize: pgSize, page: 0 });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [searchText, setSearchText] = useState("");
  const [modData, setModData] = useState({});
  const [dlgMode, setDlgMode] = useState(dialogMode.Add);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // the fecth data function will come from props
      const rows: any = await props.fetchDataFn(
        PageModel.page,
        filterModel?.items[0]?.value,
        pgSize as number,
        searchText as string
      );
      setData(rows.data);

      setNRows(rows.count as number);
    }
    fetchData();
  }, [PageModel, filterModel, searchText]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns1: GridColDef[] = [
    {
      field: "Icon menu",
      headerName: "Options",
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <IconButton
         onClick={() => onModifyDialog(params.row.id)}
              >
                <EditIcon />
                Edit
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {" "}
              <IconButton
         onClick={() => {
          setId(params.row.id);
          setName(params.row.name);
          //setDeleteDlgState(true)
        }}
              >
                <DeleteIcon />
                Delete
              </IconButton>
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  const columns: GridColDef[] = columns1.concat(props.customCols);

  async function onModifyDialog(modId: number) {
    if (props.fnFetchDataByID && modId) {
      const data = await props.fnFetchDataByID(modId);
      setModData(data[0]);
      setDialogOpen(true);
      setDlgMode(dialogMode.Modify);
    }
  }

  return (
    <Container
      maxWidth="lg"
      style={{ height: "500px", width: "100%", padding: "25px" }}
    >
      <Grid container spacing={2} style={{ verticalAlign: "center" }}>
        <Grid item xs={8}>
          <Box sx={{ width: "75%", marginLeft:"30px" }}>
            <TextField
              // label="Search"
              variant="outlined"
              fullWidth
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: "#f5f5f5", // Set the background color
                },
              }}
              InputLabelProps={{
                style: {
                  backgroundColor: "#f5f5f5", // Ensure label background matches
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
              <Button
                variant="contained"
                onClick={() => {
                  setDialogOpen(true);
                  setDlgMode(dialogMode.Add);
                }}
              >
                <AddIcon sx={{ paddingRight: "5px" }} />
                ADD NEW
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={1} sx={{ verticalAlign: "center", marginTop: "10px" }}>
          <IconButton>
            <TuneIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <Divider
        sx={{
          margin: "20px",
        }}
      />

      {/* {props.AddAllowed && (
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setDialogOpen(true);
                  setDlgMode(dialogMode.Add);
                }}
              >
                ADD NEW
              </Button>
            </Box>
          )} */}

      {dialogOpen && (
        <AddDialog title={""} open={dialogOpen} setDialogOpen={setDialogOpen}>
          {props.renderForm
            ? dlgMode === dialogMode.Add
              ? props.renderForm(setDialogOpen, (arg) => {})
              : props.renderForm(setDialogOpen, (arg) => {}, modData)
            : 1}
        </AddDialog>
      )}
      <StripedDataGrid
        rows={data ? data : []}
        columns={columns}
        rowCount={NRows}
        getRowId={(row) => row.id}
        pagination={true}
        pageSizeOptions={[pgSize, 20, 30]}
        paginationMode="server"
        paginationModel={PageModel}
        onPaginationModelChange={setPageModel}
        filterMode="server"
        onFilterModelChange={setFilterModel}
        loading={!data}
      />
    </Container>
  );
}
