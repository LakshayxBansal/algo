'use client'

import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
// import { deleteEntityDlgT, modifyEntityDlgT } from '@/app/models/models';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TextField, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, MenuProps, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { AddDialog } from './addDialog';
import { StripedDataGrid, StyledInputBase } from '@/app/utils/styledComponents';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';



type renderAddForm = (
  addDialogOpen: (props: any) => void,
  addDialogValue: (props: any) => void
) => JSX.Element;

type renderModForm = (
  modDialogOpen: boolean,
  modDialogClose: Dispatch<SetStateAction<boolean>>,
  id: string,
) => JSX.Element;

type renderDeleteForm = (
  delDialogOpen: boolean,
  delDialogClose: Dispatch<SetStateAction<boolean>>,
  dialogName: string,
  id: string,
) => JSX.Element;


type ModifyT = {
  renderModForm: renderModForm,
  renderDelForm: renderDeleteForm,
  fetchDataFn: any,
  customCols: GridColDef[],
  renderAddForm: renderAddForm,
};




export default function EntityList<ModEntityT>(props: ModifyT) {

  const [modifyDlgState, setModifyDlgState] = useState<boolean>(false);
  const [deleteDlgState, setDeleteDlgState] = useState<boolean>(false);
  const [id, setId] = useState("-1");
  const [name, setName] = useState<String>('');
  const [addDlgState, setAddDlgState] = useState<boolean>(false);



  const pgSize = 10;

  const [data, setData] = useState<ModEntityT | any>(); // change to rows and type will be dynamic
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({ pageSize: pgSize, page: 0 });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [searchText, setSearchText] = useState<String>('');
  const [dummyText, setDummyText] = useState("");
  // const [pgSize, setpgSize] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleClick = (event: { currentTarget: SetStateAction<null>; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function fetchData() { // the fecth data function will come from props
      const rows: any = await props.fetchDataFn(PageModel.page, filterModel?.items[0]?.value, pgSize as number, searchText as string);

      setData(rows.data);

      setNRows(rows.count as number)
    }
    fetchData();

  }, [PageModel, filterModel, searchText]);


  const masterData = {
    userName: "dinesh",
  }


  const columns1: GridColDef[] = [
    {
      field: "Icon menu", headerName: "Options", width: 100, renderCell: (params) => (
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
              <IconButton onClick={() => {
                setId(params.row.id)
                setModifyDlgState(true)
              }}>
                <EditIcon />
                Edit
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>     <IconButton onClick={() => {
              setId(params.row.id)
              setName(params.row.name)
              setDeleteDlgState(true)
            }}>
              <DeleteIcon />
              Delete
            </IconButton></MenuItem>
          </Menu>
        </Box>

      )
    }
  ];

  // const columns: GridColDef[] = props.customCols.concat(columns1);
  const columns: GridColDef[] = columns1.concat(props.customCols);

  const addNewClick = () => {
    setAddDlgState(true);
  }

  return (
    <Container maxWidth="lg" style={{ height: "500px", width: '100%', padding: "25px" }}>
      {/* <Box style={{ height: 300, width: '100%', padding: "25px" }}> */}
      <Grid container spacing={2} style={{ verticalAlign: "center" }}>
        <Grid item xs={8}>
          <Box sx={{ width: '75%', paddingRight:"20px" }}>

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
                backgroundColor: '#f5f5f5' // Set the background color
              }
            }}
            InputLabelProps={{
              style: {
                backgroundColor: '#f5f5f5' // Ensure label background matches
              }
            }}
            />
            </Box>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "right", marginTop: "1.1rem", paddingRight: "45px" }}>
          <Button variant="contained" onClick={() => setAddDlgState(true)}>
            <AddIcon sx={{ paddingRight: "5px" }} />
            ADD NEW
          </Button>
        </Grid>
        <Grid item xs={1} sx={{verticalAlign:"center", marginTop:"10px"}}>
          <IconButton>
          <TuneIcon fontSize='large'/>
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{
        margin: "20px"
      }} />
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
        filterMode='server'
        onFilterModelChange={setFilterModel}
        loading={!data}
      />

      {addDlgState && (
        <AddDialog
          title={''}
          open={addDlgState}
          setDialogOpen={setAddDlgState}
        >
          {props.renderAddForm(setAddDlgState, setDummyText)}
        </AddDialog>
      )}
      {/* The Below dialogs shall come fro  props */}
      {modifyDlgState && (
        <AddDialog
          title={''}
          open={modifyDlgState}
          setDialogOpen={setModifyDlgState}
        >
          {props.renderModForm(modifyDlgState, setModifyDlgState, id)}
        </AddDialog>
      )}
      {deleteDlgState && (
        <AddDialog
          title={''}
          open={deleteDlgState}
          setDialogOpen={setDeleteDlgState}
        >
          {props.renderDelForm(deleteDlgState, setDeleteDlgState, "String", id)}
        </AddDialog>
      )}



      {/* </Box> */}
    </Container>
  );
}
