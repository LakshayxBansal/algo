'use client'

import { GridColDef} from '@mui/x-data-grid';
import { deleteDept, getDepts } from '../../../../../../controllers/department.controller';
import ModifyDeptDialog from './ModifyDeptDialog';
import DeleteDeptDialog from './DeleteDeptDialog';
import EntityList from '@/app/Widgets/masters/EntityList';



export default function ModifyDept() {
  
  const columns: GridColDef[] = [
    { field: 'RowID', headerName: 'S.No' },
    { field: 'name', headerName: 'Name', width: 300 },

  ];
  
  return (
    <EntityList 
    ModDialog={ModifyDeptDialog}
    DelDialog={DeleteDeptDialog}
    fetchDataFn={getDepts}
    customCols={columns}></EntityList>
  );
}
