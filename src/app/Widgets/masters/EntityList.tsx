'use client'

import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { deleteEntityDlgT,modifyEntityDlgT } from '@/app/models/models';
import { useEffect, useState } from 'react';
import { IconButton, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

type ModifyT = {
  ModDialog:any,
  DelDialog:any,
  fetchDataFn:any, 
  customCols :GridColDef[]
};

export default function Modify<ModEntityT>(props:ModifyT) {
  
  const [modifyDlgState, setModifyDlgState] = useState<modifyEntityDlgT>({open: false, data:{}});
  const [deleteDlgState, setDeleteDlgState] = useState<deleteEntityDlgT>({open: false, data:{}});
  
  const pgSize = 5;
  
  const [data, setData] = useState<ModEntityT|any>(); // change to rows and type will be dynamic
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({pageSize:pgSize , page:0});
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [searchText, setSearchText] = useState<String>('');

  useEffect(() => {
    async function fetchData() { // the fecth data function will come from props
      const rows : any = await props.fetchDataFn(PageModel.page, filterModel?.items[0]?.value, pgSize as number, searchText as string);
      
      setData(rows.data); 
      
      setNRows(rows.count as number)
    }
      fetchData();
    
  }, [PageModel,filterModel,searchText]);

  

  const columns: GridColDef[] = props.customCols.concat(
  [

    { field: 'Edit' , headerName: 'Edit', width: 100, renderCell: (params) => (
      <IconButton onClick={() => {setModifyDlgState({open: true , data : params.row})}}>
        <EditIcon/>
      </IconButton>
    ) },
    { field: 'Delete' , headerName: 'Delete', width: 100, renderCell: (params) => (
      <IconButton onClick={() => {setDeleteDlgState({open: true , data : params.row})}}>
        <DeleteIcon/>
      </IconButton>
    ) }

  ]);
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Toolbar/>
      <TextField
                  label="Search"
                  name="search"
                  fullWidth
                  id="search"
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 'fit-content' }}
                  autoFocus
                />
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
      {modifyDlgState && <props.ModDialog {...modifyDlgState} setDlgValue={setModifyDlgState}></props.ModDialog>}
      {deleteDlgState && <props.DelDialog {...deleteDlgState} setDlgValue={setDeleteDlgState}></props.DelDialog>}
    </div>
  );
}