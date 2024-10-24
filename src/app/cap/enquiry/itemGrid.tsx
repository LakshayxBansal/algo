"use client";

import React, { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridSlots,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import { darken, lighten, styled, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { optionsDataT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import { getItem, getItemById } from "@/app/controllers/item.controller";
import ItemForm from "@/app/Widgets/masters/masterForms/itemForm";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { itemToListFormSchema } from "@/app/zodschema/zodschema";

type ModifiedRowT = {
  id?: number;
  enquiry_id?: number;
  item?: string;
  item_id?: number;
  quantity?: number;
  unit?: string;
  unit_id?: number;
  remarks?: string;
};

type ItemGridProps = {
  dgData: any;
  setdgData: any;
  setdgDialogOpen: any;
  dgFormError: any;
  setdgFormError: any;
  dgItemFormError: any;
  // Add other props here as needed
};

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .no-rows-primary": {
    fill: "#3D4751",
    ...theme.applyStyles("light", {
      fill: "#AEB8C2",
    }),
  },
  "& .no-rows-secondary": {
    fill: "#1D2126",
    ...theme.applyStyles("light", {
      fill: "#E8EAED",
    }),
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>No Items Added</Box>
    </StyledGridOverlay>
  );
}

const getTextColor = (color: string, theme: Theme, coefficient: number) => ({
  color: darken(color, coefficient),
  ...theme.applyStyles("light", {
    color: lighten(color, coefficient),
  }),
});

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .super-app-theme--Rejected": {
    ...getTextColor(theme.palette.error.main, theme, 0.1),
    "&:hover": {
      ...getTextColor(theme.palette.error.main, theme, 0.2),
    },
  },
}));

export default function ItemGrid({
  dgData,
  setdgData,
  setdgDialogOpen,
  dgFormError,
  setdgFormError,
  dgItemFormError
}: ItemGridProps) {
  const [editMode, setEditMode] = useState<GridRowId | null>(); // Type is an array of GridRowId type
  const [modifiedRowData, setModifiedRowData] = useState<ModifiedRowT>();

  function onSelectDataGridRowStateChange(
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: keyof ModifiedRowT
  ) {
    let values: ModifiedRowT = { ...modifiedRowData };
    values[name] = val?.name;
    values[`${name}_id` as keyof ModifiedRowT] = val?.id;
    setModifiedRowData(values);
  }

  //Setting editmode with selected row id and then setting selected row data in modifiedRowData state
  const handleEditClick = (id: GridRowId) => () => {
    setEditMode(id);
    const selectedRowData = dgData.find((row: any) => row.id === id); // Find the corresponding row data
    setModifiedRowData(selectedRowData);
  };

  // Filtering out the row with the matching id and saving into rows of data grid: DELETING THE SELECTED ROW
  const handleDeleteClick = (id: GridRowId) => () => {
    if (dgData.length > 0) {
      const updatedRows = dgData.filter((row: any) => row.id !== id);

      // Updating the data state with the filtered rows
      setdgData(updatedRows);
    }
  };

  //Saving the data from modifiedRowData state into rows of data grid
  const handleSaveClick = () => {
    const parsedData = itemToListFormSchema.safeParse(modifiedRowData); //Validating on saving
    if (parsedData.success) {
      const updatedData = dgData.map((row: any) =>
        row.id === modifiedRowData?.id ? modifiedRowData : row
      );
      setdgData(updatedData);
      setModifiedRowData(undefined);
      setEditMode(null);
      //Removing field erros on successful validation
      setdgFormError((curr: any) => {
        const { item, quantity, unit, remark, ...rest } = curr;
        return rest;
      });
    } else {
      const issues = parsedData.error.issues;
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      setdgFormError(errorState);
    }
  };

  // Removing the id from editmode on cancelling and removing field errors
  const handleCancelClick = () => {
    setEditMode(null);
    setdgFormError((curr: any) => {
      const { item, quantity, unit, remark, ...rest } = curr;
      return rest;
    });
  };

  const columns: GridColDef[] = [
    {
      field: "item",
      headerName: "Item Name",
      width: 180,
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <SelectMasterWrapper
              name={"item"}
              id={"item"}
              label={""}
              dialogTitle={"Add Item"}
              fetchDataFn={getItem}
              fnFetchDataByID={getItemById}
              required
              formError={dgFormError?.item ?? dgFormError.item}
              onChange={(e, v, s) =>
                onSelectDataGridRowStateChange(e, v, s, "item")
              }
              defaultValue={
                {
                  id: params.row.item_id,
                  name: params.row.item,
                } as optionsDataT
              }
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <ItemForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
          );
        }
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <InputControl
              required
              inputType={InputType.TEXT}
              type="number"
              decPlaces={0}
              min={0}
              max={10}
              // style= { textAlign: "right" },
              name="quantity"
              id="quantity"
              defaultValue={params.row.quantity}
              error={dgFormError?.quantity?.error}
              helperText={dgFormError?.quantity?.msg}
              onChange={(e: any) => {
                setModifiedRowData((prevState) => ({
                  ...prevState,
                  quantity: Number(e.target.value),
                }));
              }}
            />
          );
        }
      },
    },
    {
      field: "unit",
      headerName: "Unit Name",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <SelectMasterWrapper
              name={"unit"}
              id={"unit"}
              label={""}
              dialogTitle={"Add Unit"}
              fetchDataFn={getUnit}
              fnFetchDataByID={getUnitById}
              required
              formError={dgFormError?.unit ?? dgFormError.unit}
              onChange={(e, v, s) =>
                onSelectDataGridRowStateChange(e, v, s, "unit")
              }
              defaultValue={
                {
                  id: params.row.unit_id,
                  name: params.row.unit,
                } as optionsDataT
              }
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <UnitForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
          );
        }
      },
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 150,
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <InputControl
              required
              inputType={InputType.TEXT}
              name="remarks"
              id="remarks"
              defaultValue={params.row.remarks}
              error={dgFormError?.remarks ?? dgFormError.remark}
              helperText={dgFormError?.remarks?.msg}
              sx={{ width: "100%" }}
              onChange={(e: any) => {
                setModifiedRowData((prevState) => ({
                  ...prevState,
                  remarks: e.target.value,
                }));
              }}
            />
          );
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => {
        if (editMode === params.row.id) {
          return [
            <GridActionsCellItem
              key={params.row.id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick}
            />,
            <GridActionsCellItem
              key={params.row.id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={params.row.id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params.row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={params.row.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params.row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function AddItemToolbar() {
    const handleClick = () => {
      setdgDialogOpen(true);
    };

    return (
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Seperator>Item List</Seperator>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Item
        </Button>
      </GridToolbarContainer>
    );
  }

  const demoRows: any = [
    {
      id: 1,
      item: "Water Cooler",
      quantity: 2,
      unit: "Unit 1",
      remarks: "test",
    },
  ];

  const rejectedRowIds = [1, 3]; // Add the IDs you want to compare


  return (
    <>
      <StyledDataGrid
        disableColumnMenu
        columns={columns}
        rows={dgData ? dgData : []}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          toolbar: AddItemToolbar as GridSlots["toolbar"],
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          },
        }}
        rowHeight={
          dgFormError.item ||
          dgFormError.quantity ||
          dgFormError.unit ||
          dgFormError.remark
            ? 70
            : 50
        }
        getRowClassName={(params) =>
          Object.keys(dgItemFormError).includes((params.row.id - 1).toString()) 
              ? `super-app-theme--Rejected` 
              : ""
      }
      />
    </>
  );
}
