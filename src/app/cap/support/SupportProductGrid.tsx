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
import { Button, Grid, Typography } from "@mui/material";

import { optionsDataT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/selectMasterWrapper/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import { getProduct, getProductById } from "@/app/controllers/product.controller";
import ProductForm from "@/app/Widgets/masters/masterForms/productForm";
import { getUnit, getUnitById } from "@/app/controllers/unit.controller";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { productToListFormSchema, supportProductSchema } from "@/app/zodschema/zodschema";
import { set } from "lodash";

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
  setdgDialogOpen: any;
  dgFormError: any;
  setdgFormError: any;
  dgProductFormError: any;
  isDisable : boolean;
  setDgProductFormError:any
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
      <Box sx={{ mt: 2 }}>No Products Added</Box>
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
    ".MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal": {
      opacity: 0.8,
    },
    "& .super-app-theme--Rejected": {
      ...getTextColor(theme.palette.error.main, theme, 0.1),
      "&:hover": {
        ...getTextColor(theme.palette.error.main, theme, 0.2),
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: "bold",
      },
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
    "&:hover": {
      borderColor: "#212121",
    },
    "&.button-focused": {
      borderColor: "#1976d2",
      borderWidth: 2,
    },
    borderWidth: 1,
    borderStyle: "solid",
  }));

export default function SupportProductGrid({
  dgData,
  setdgData,
  setdgDialogOpen,
  dgFormError,
  setdgFormError,
  dgProductFormError,
  isDisable,
  setDgProductFormError
}: ProductGridProps) {
  const [editMode, setEditMode] = useState<GridRowId | null>(); // Type is an array of GridRowId type
  const [modifiedRowData, setModifiedRowData] = useState<ModifiedRowT>();
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  function onSelectDataGridRowStateChange(
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: keyof ModifiedRowT
  ) {
    let values: ModifiedRowT = { ...modifiedRowData };
    values[name] = val?.name;
    values[`${name}_id` as keyof ModifiedRowT] = val?.id;
    setDialogValue(val);
    setModifiedRowData(values);
  }

  //Setting editmode with selected row id and then setting selected row data in modifiedRowData state

  const handleDeleteClick = (id: GridRowId) => () => {
    if (dgData.length > 0) {
      const updatedRows = dgData.filter((row: any) => row.id !== id);
      if(dgProductFormError[(Number(id)-1)]) {
        setDgProductFormError((prev: any) => {
          const { [(Number(id)-1)]: _, ...rest } = prev;
          return rest;
        });
      }
      // Updating the data state with the filtered rows
      setdgData(updatedRows);
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setEditMode(id);
    const selectedRowData = dgData.find((row: any) => row.id === id); // Find the corresponding row data
    setModifiedRowData(selectedRowData);
  };

  const handleCancelClick = () => {
    setEditMode(null);
    setdgFormError((curr: any) => {
      const { product, quantity, unit, remark, ...rest } = curr;
      return rest;
    });
  };

  const handleSaveClick = () => {
    const parsedData = supportProductSchema.safeParse(modifiedRowData); //Validating on saving
    if (parsedData.success) {
      
      const foundId = dgData.find(
        (row: any) => row.product_id === modifiedRowData?.product_id
      )
      if (foundId) {
        setDgProductFormError((prev: Record<number, Record<string, { msg: string; error: boolean }>>) => {
          return {
            ...prev,
            [Number(foundId.id)]: {
              product: {
                msg: "Product already added",
                error: true,
              },
            },
          };
        });
        return ;
      }
      const updatedData = dgData.map((row: any) =>
        row.id === modifiedRowData?.id ? modifiedRowData : row
      );
      setdgData(updatedData);
      setModifiedRowData(undefined);
      setEditMode(null);
      const gridId = Number(modifiedRowData?.id)-1;
      if(gridId){
      if(dgProductFormError[gridId]) {
        setDgProductFormError((prev: any) => {
          const { [Number(gridId)]: _, ...rest } = prev;
          return rest;
        });
      }}
      //Removing field erros on successful validation
      setdgFormError((curr: any) => {
        const { product, ...rest } = curr;
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



  const columns: GridColDef[] = [
    {
      field: "product",
      headerName: "Product Name",
      width: 200,
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <SelectMasterWrapper
              name={"product"}
              id={"product"}
              label={""}
              dialogTitle={"Product"}
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
              renderForm={(fnDialogOpen, fnDialogValue,metaData, data) => (
                <ProductForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  metaData={metaData}
                  data={data}
                />
              )}
            />
          );
        }
      },
      
    },
    {
      field: "faq",
      headerName: "FAQ",
      width: 100,
      renderCell: (params) => (
        <a
          href={`https://example.com/faq/${params.row.id}`} 
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </a>
      ),
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
            disabled={isDisable}
          />,
          <GridActionsCellItem
            key={params.row.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params.row.id)}
            color="inherit"
            disabled={isDisable}
          />,
        ];
      },
    },
     {
          field: "errorMessages",
          headerName: "Error Messages",
          width: 300,
          renderCell: (params) => {
            const rowIndex = params.row.id - 1;
            const rowErrors = dgProductFormError[rowIndex];
    
            if (rowErrors) {
              return (
                <div style={{ marginTop: "0.5rem" }}>
                  {Object.keys(rowErrors).map((errorKey, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="error"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      {rowErrors[errorKey]?.msg}
                    </Typography>
                  ))}
                </div>
              );
            }
            return null; // Return null if no errors for the row
          },
        },
  ];
  
  //**************** this was old code  ******************/
  // function AddProductToolbar() {
  //   const handleClick = () => {
  //     setdgDialogOpen(true);
  //   };

  //   return (
  //     <GridToolbarContainer
  //       sx={{ display: "flex", justifyContent: "space-between" }}
  //     >
  //       <Seperator>Product List</Seperator>
  //       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} disabled={isDisable}>
  //         Add Product
  //       </Button>
  //     </GridToolbarContainer>
  //   );
  // }
  const handleFocus = () => setIsButtonFocused(true);
  const handleBlur = () => setIsButtonFocused(false);
  const handleClick = () => {
    setdgDialogOpen(true);
  };
 


  return (
    <>
     <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ position: "relative", backgroundColor: "white" }}
        >
          Product List
        </Typography>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          onFocus={handleFocus} // Track focus
          onBlur={handleBlur} // Track blur
          disabled = {isDisable}
        >
          Add Product
        </Button>
      </Grid>
      <StyledDataGrid
        disableColumnMenu
        columns={columns}
        rows={dgData ? dgData : []}
        disableRowSelectionOnClick
        className={isButtonFocused ? "button-focused" : ""}
        slots={{ 
          noRowsOverlay: () => <div></div>,
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          },
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
          Object.keys(dgProductFormError).includes((params.row.id - 1).toString()) 
              ? `super-app-theme--Rejected` 
              : ""
      }
      />
    </>
  );
}
