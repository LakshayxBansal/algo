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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
  {
    field: "symbol",
    headerName: "Symbol",
    editable: true,
  },
];

export default function Currency() {
  return (
    <>
      <EntityList
        title="Currency Master"
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
      ></EntityList>
    </>
  );
}
