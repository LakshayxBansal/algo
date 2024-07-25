'use client'

import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { deleteEntityDlgT, modifyEntityDlgT } from '@/app/models/models';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputForm from '@/app/cap/enquiry/InputForm';
import ContactForm from './masterForms/contactForm';
import { AddDialog } from './addDialog';
// import { Container } from '@mui/material';

type RenderFormFunctionEntity = (
  fnDialogOpen: (props: any) => void
) => JSX.Element;

type RenderFormFunctionEntity1 = (
  fnDialogOpen1: (props: any) => void
) => JSX.Element;


type ModifyT = {
  // formTitle: string,
  modForm: any,
  // ModForm: RenderFormFunctionEntity,
  DelDialog: any,
  fetchDataFn: any,
  customCols: GridColDef[],
  renderFormEntity: RenderFormFunctionEntity,
  // RenderFormFunctionEntity1:RenderFormFunctionEntity1

};



export default function EntityList<ModEntityT>(props: ModifyT) {

  const [modifyDlgState, setModifyDlgState] = useState<boolean>(false);
  const [deleteDlgState, setDeleteDlgState] = useState<boolean>(false);
  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<String>('');
  const [addText, setAddText] = useState<boolean>(false);
  const [modifyDlgState1, setModifyDlgState1] = useState<boolean>(false);



  const pgSize = 10;

  const [data, setData] = useState<ModEntityT | any>(); // change to rows and type will be dynamic
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({ pageSize: pgSize, page: 0 });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [searchText, setSearchText] = useState<String>('');


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
    setAddText(true);
  }

  return (
    <Container maxWidth="lg">
      <div style={{ height: 300, width: '100%', padding: "25px" }}>
        {/* <Toolbar/> */}
        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", p: 2 }}>
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
              ), disableUnderline: true, sx: { borderRadius: 0, justifyContent: "center", width: "fit-content" }, style: { fontSize: '1.2rem', alignItems: "center" }
            }}
          />
          <Box>
            <Button variant="contained" onClick={() => setAddText(true)}>
              ADD NEW
            </Button>
            {addText && (
              <AddDialog
                title={''}
                open={addText}
                setDialogOpen={setAddText}
              >
                {props.renderFormEntity(setAddText)}
              </AddDialog>
            )}
            {/* <Dialog  maxWidth="lg" open={addText}>
        <DialogContent>
          <ContactForm setDialogOpen={()=>setAddText(false)} setDialogValue={()=>setModifyDlgState1(true)}/>
        </DialogContent>
        </Dialog> */}
          </Box>
          {/* for edit button -- pencil */}
          {/* {modifyDlgState && <props.ModForm open={modifyDlgState} id={id} setDlgValue={setModifyDlgState}></props.ModForm>} */}

          {modifyDlgState && (
              <AddDialog  
                title={''}
                open={modifyDlgState}
                setDialogOpen={setModifyDlgState}
              >
                {props.modForm(modifyDlgState,id,setModifyDlgState )}
              </AddDialog>
            )}
           </Box>

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
        {/* The Below dialogs shall come fro  props */}
        {/* <div>

      {modifyDlgState && (
        <AddDialog
        title={props.formTitle}
        open={modifyDlgState}
        setDialogOpen={setModifyDlgState}
        >
          {props.renderFormEntity(setModifyDlgState)}
        </AddDialog>
      )}
      </div> */}
        {/* {modifyDlgState && <props.ModForm open={modifyDlgState} id={id} setDlgValue={setModifyDlgState}></props.ModForm>} */}
        {deleteDlgState && <props.DelDialog open={deleteDlgState} id={id} name={name} setDlgValue={setDeleteDlgState}></props.DelDialog>}

      </div>
    </Container>
  );
}
