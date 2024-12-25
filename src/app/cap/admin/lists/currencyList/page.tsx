"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import CurrencyForm from "@/app/Widgets/masters/masterForms/currencyForm";
import {
  delCurrencyById,
  getCurrencyById,
  getCurrencyByPage,
} from "@/app/controllers/currency.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { CURRENCY_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
  {
    field: "symbol",
    headerName: "Symbol",
    editable: false,
  },
];

export default function Currency() {
  return (
    <>
      <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of Currency"}/>
      </Box>
      <EntityList
        title="Currency"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <CurrencyForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getCurrencyByPage}
        fnFetchDataByID={getCurrencyById}
        fnDeleteDataByID={delCurrencyById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={CURRENCY_OBJECT_ID}
      ></EntityList>
    </>
  );
}
