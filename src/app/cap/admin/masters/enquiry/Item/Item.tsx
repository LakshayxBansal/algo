"use client";

import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import DeleteItemForm from "./DeleteItemForm";
import ModifyItemForm from "./ModifyItemForm";
import ItemForm from "@/app/Widgets/masters/masterForms/itemForm";
import { getItems } from "@/app/controllers/item.controller";

export default function Item() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No." },
    { field: "name", headerName: "Name", width: 100 },
    { field: "group_id", headerName: "Group Id", width: 100 },
    { field: "alias", headerName: "Alias", width: 100 },
    { field: "unit_id", headerName: "Unit Id", width: 100 },
    { field: "hsn_code", headerName: "Hsn Code", width: 100 },
  ];

  return (
    <EntityList
    //   renderModForm={(modDialogOpen, modDialogClose, id) => (
    //         <ModifyItemForm
    //       open={modDialogOpen}
    //      id={id}
    //       setDlgValue={modDialogClose}
    //     />
    //   )}
    //   renderDelForm={(delDialogOpen, delDialogClose, dialogName, id) => (
        DelDialog={(delDialogOpen: any, delDialogClose: any, dialogName: any, id: any) => (
        <DeleteItemForm
          open={delDialogOpen}
          id={Number(id)}
          name={dialogName}
          setDlgValue={delDialogClose}
          />
      )}
    //   renderAddForm={(addDialogOpen, addDialogValue) => (
        modForm={(setDialogOpen: ((props: any) => void) | undefined, setVal: ((props: any) => void) | undefined,data:any) => (
            <ItemForm
        //   setDialogOpen={addDialogOpen}
        //   setDialogValue={addDialogValue}
        setDialogOpen={setDialogOpen}
            setDialogValue={setVal}
            // data={data}
        />
      )}
      fetchDataFn={getItems}
      customCols={columns}
    ></EntityList>
  );
}
