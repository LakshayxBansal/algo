"use client";

import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridSlots,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import { darken, lighten, styled, Theme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

import { optionsDataT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import {
  getProduct,
  getProductById,
} from "@/app/controllers/product.controller";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { productToListFormSchema } from "@/app/zodschema/zodschema";

type ModifiedRowT = {
  id?: number;
  enquiry_id?: number;
  product?: string;
  product_id?: number;
  quantity?: number;
  unit?: string;
  unit_id?: number;
  remarks?: string;
};

type ProductGridProps = {
  dgData: any;
  setdgData: any;
  dgDialogOpen: any;
  setdgDialogOpen: any;
  dgFormError: any;
  setdgFormError: any;
  dgProductFormError: any;
  // Add other props here as needed
};

const getTextColor = (color: string, theme: Theme, coefficient: number) => ({
  color: darken(color, coefficient),
  ...theme.applyStyles("light", {
    color: lighten(color, coefficient),
  }),
});

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  ".MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal": {
    zIndex: 0,
  },
  "& .super-app-theme--Rejected": {
    ...getTextColor(theme.palette.error.main, theme, 0.1),
    "&:hover": {
      ...getTextColor(theme.palette.error.main, theme, 0.2),
    },
  },
}));

export default function ProductGrid({
  dgData,
  setdgData,
  dgDialogOpen,
  setdgDialogOpen,
  dgFormError,
  setdgFormError,
  dgProductFormError,
}: ProductGridProps) {
  const [editMode, setEditMode] = useState<GridRowId | null>(); // Type is an array of GridRowId type
  const [modifiedRowData, setModifiedRowData] = useState<ModifiedRowT>();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const headers = document.querySelectorAll(
        ".MuiDataGrid-columnHeader.MuiDataGrid-withBorderColor"
      );
      headers.forEach((header) => header.setAttribute("tabindex", "-1"));
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up the observer on unmount
    return () => observer.disconnect();
  }, []);

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
    const parsedData = productToListFormSchema.safeParse(modifiedRowData); //Validating on saving
    if (parsedData.success) {
      const updatedData = dgData.map((row: any) =>
        row.id === modifiedRowData?.id ? modifiedRowData : row
      );
      setdgData(updatedData);
      setModifiedRowData(undefined);
      setEditMode(null);
      //Removing field erros on successful validation
      setdgFormError((curr: any) => {
        const { product, quantity, unit, remark, ...rest } = curr;
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
      setdgFormError((curr: any) => {
        return {
          ...curr,
          ...errorState,
        };
      });
    }
  };

  // Removing the id from editmode on cancelling and removing field errors
  const handleCancelClick = () => {
    setEditMode(null);
    setdgFormError((curr: any) => {
      const { product, quantity, unit, remark, ...rest } = curr;
      return rest;
    });
  };

  const columns: GridColDef[] = [
    {
      field: "product",
      headerName: "Product Name",
      width: editMode ? 190 : 117,
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <SelectMasterWrapper
              name={"product"}
              id={"product"}
              label={""}
              dialogTitle={"Add Product"}
              fetchDataFn={getProduct}
              fnFetchDataByID={getProductById}
              required
              formError={dgFormError?.product ?? dgFormError.product}
              onChange={(e, v, s) =>
                onSelectDataGridRowStateChange(e, v, s, "product")
              }
              defaultValue={
                {
                  id: params.row.product_id,
                  name: params.row.product,
                } as optionsDataT
              }
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <ProductForm
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
      width: editMode ? 219 : 78,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <InputControl
              required
              inputType={InputType.TEXT}
              type="number"
              inputProps={{
                min: 0,
                max: 10000000,
                // style: { textAlign: "right" },
                onKeyDown: (e: any) => {
                  // Prevent 'e' character
                  if (
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "-" ||
                    e.key === "+"
                  ) {
                    e.preventDefault();
                  }
                },
              }}
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
      width: editMode ? 180 : 91,
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
      width: editMode ? 200 : 91,
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <TextField
              name="remarks"
              id="remarks"
              defaultValue={params.row.remarks}
              error={dgFormError?.remarks ?? dgFormError.remark}
              helperText={dgFormError?.remarks?.msg}
              onChange={(e: any) => {
                setModifiedRowData((prevState) => ({
                  ...prevState,
                  remarks: e.target.value,
                }));
              }}
              onKeyDown={(e: any) => {
                // Stop propagation for specific keys
                if (
                  [
                    " ",
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                  ].includes(e.key)
                ) {
                  e.stopPropagation();
                }
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

  function AddProductToolbar() {
    const handleClick = () => {
      setdgDialogOpen(true);
    };

    return (
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Seperator>Product List</Seperator>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Product
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <StyledDataGrid
        disableColumnMenu
        columns={columns}
        rows={dgData ? dgData : []}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: () => <></>,
          toolbar: AddProductToolbar as GridSlots["toolbar"],
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .MuiDivider-root": {
            display: "none", // Hides the divider
          },
          borderColor: dgDialogOpen ? "#1976d2" : "",
          borderWidth: 2,
        }}
        rowHeight={
          dgFormError.product ||
          dgFormError.quantity ||
          dgFormError.unit ||
          dgFormError.remark
            ? 70
            : 50
        }
        getRowClassName={(params) =>
          Object.keys(dgProductFormError).includes(
            (params.row.id - 1).toString()
          )
            ? `super-app-theme--Rejected`
            : ""
        }
      />
    </>
  );
}
