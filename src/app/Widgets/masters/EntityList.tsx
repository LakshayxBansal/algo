'use client'

import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { deleteEntityDlgT, modifyEntityDlgT } from '@/app/models/models';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputForm from '@/app/cap/enquiry/InputForm';
import ContactForm from './masterForms/contactForm';
import { AddDialog } from './addDialog';
import { SocketAddress } from 'net';
// import { Container } from '@mui/material';

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



  const columns: GridColDef[] = props.customCols.concat(
    [

      {
        field: 'Edit', headerName: 'Edit', width: 100, renderCell: (params) => (
          <IconButton onClick={() => {
            setId(params.row.id)
            setModifyDlgState(true)
          }}>
            <EditIcon />
          </IconButton>
        )
      },
      {
        field: 'Delete', headerName: 'Delete', width: 100, renderCell: (params) => (
          <IconButton onClick={() => {
            setId(params.row.id)
            setName(params.row.name)
            setDeleteDlgState(true)
          }}>
            <DeleteIcon />
          </IconButton>
        )
      }

    ]);


  const addNewClick = () => {
    setAddDlgState(true);
  }

  return (
    <Container maxWidth="lg">
      <div style={{ height: 300, width: '100%', padding: "25px" }}>
        {/* <Toolbar/> */}
        <Box sx={{ display: 'flex', alignItems: "center", p: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              // label="Search..."
              name="search"
              id="search"
              placeholder="Search..."
              type="search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="medium" style={{ verticalAlign: "middle", marginBottom: "0.2rem", fontWeight: "bold" }} />
                  </InputAdornment>
                ), disableUnderline: true, sx: { borderRadius: 0, justifyContent: "center", width: "fit-content", flexGrow: 1 }, style: { fontSize: '1.2rem', alignItems: "center" }
              }}
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={() => setAddDlgState(true)}>
              ADD NEW
            </Button>
          </Box>
        </Box>
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

        <DataGrid
          rows={data ? data : []}
          columns={columns}
          rowCount={NRows}
          getRowId={(row) => row.id}
          pagination={true}
          pageSizeOptions={[pgSize]}
          paginationMode="server"
          paginationModel={PageModel}
          onPaginationModelChange={setPageModel}
          filterMode='server'
          onFilterModelChange={setFilterModel}
          loading={!data}
        />

      </div>
    </Container>
  );
}
