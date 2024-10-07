'use client'

import { GridColDef } from '@mui/x-data-grid';
import { deleteDept, getDepts } from '../../../../../../controllers/department.controller';
import ModifyDeptDialog from './ModifyDeptDialog';
// import DeleteDeptDialog from './DeleteDeptDialog';
import DeleteDeptForm from './DeleteDeptForm';
import EntityList from '@/app/Widgets/masters/EntityList';
import ContactForm from '@/app/Widgets/masters/masterForms/contactForm';
import DeptModifyForm from "./ModifyDeptForm";
import { useState } from 'react';
import AddDeptForm from '../add/AddDeptForm';
import ExecutiveDeptForm from '@/app/Widgets/masters/masterForms/executiveDeptForm';



export default function ModifyDept() {

  const columns: GridColDef[] = [
    { field: 'RowID', headerName: 'S.No' },
    { field: 'name', headerName: 'Name', width: 300 },

  ];

  const [id, setId] = useState<number>(-1);


  return (
    <EntityList
      renderModForm={(modDialogOpen, modDialogClose, id) =>
        <DeptModifyForm open={modDialogOpen} id={id} setDlgValue={modDialogClose} />
      }
      renderDelForm={(delDialogOpen, delDialogClose, dialogName, id) =>
        <DeleteDeptForm open={delDialogOpen} id={id} name={dialogName} setDlgValue={delDialogClose} />
      }
      fetchDataFn={getDepts}
      customCols={columns}
      renderAddForm={(addDialogOpen, addDialogValue) =>
        <AddDeptForm setDialogOpen={addDialogOpen}/>
      }
    >
    </EntityList>
  );
}
