"use client";
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { formErrorT } from "../../models/models";
import { optionsDataT } from "@/app/models/models";
import { RenderFormFunctionT, OnChangeFunction } from "@/app/models/models";
import { useDialog } from '@/app/Widgets/selectMasterWrapper/useDialog';
import { AutocompleteDBWrapper } from '@/app/Widgets/selectMasterWrapper/AutocompleteDBWrapper';
import { AddDialogWrapper } from '@/app/Widgets/selectMasterWrapper/AddDialogWrapper';


type SelectOptionsFunction = (option: any) => string;

export type selectMasterWrapperT = {
  name: string;
  id: string;
  label: string;
  dialogTitle: string;
  fetchDataFn: (arg0: string) => Promise<any>;
  fnFetchDataByID?: (id: number) => Promise<any>;
  renderForm?: RenderFormFunctionT;
  onChange?: OnChangeFunction;
  renderOptions?: SelectOptionsFunction;
  labelOptions?: SelectOptionsFunction;
  highlightOptions?: SelectOptionsFunction;
  width?: number;
  allowNewAdd?: boolean;
  allowModify?: boolean;
  formError?: formErrorT;
  required?: boolean;
  defaultValue?: optionsDataT;
  notEmpty?: boolean;
  disabled?: boolean;
  defaultOptions?: optionsDataT[]
  showDetails?: boolean;
  autoFocus?: boolean;
  setFormError?: (props: any) => void;
  error?: boolean;
  helperText?: string;
};

enum dialogMode {
  Add,
  Modify,
}

export function SelectMasterWrapper(props: selectMasterWrapperT) {
  const {
    dialogOpen,
    dlgMode,
    dialogValue,
    metaData,
    modData,
    openDialog,
    onModifyDialog,
    changeDialogValue,
    setDialogOpen
  } = useDialog(props);

  return (
    <>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AutocompleteDBWrapper
            {...props}
            dialogValue={dialogValue}
            openDialog={openDialog}
            onModifyDialog={onModifyDialog}
            setDialogValue={changeDialogValue}
            allowNewAdd={props.allowNewAdd !== false}
            allowModify={props.allowModify !== false}
          />
        </Box>
      </Grid>
      <AddDialogWrapper
        dialogOpen={dialogOpen}
        dlgMode={dlgMode}
        metaData={metaData}
        modData={modData}
        setDialogOpen={setDialogOpen}
        changeDialogValue={changeDialogValue}
        dialogTitle={props.dialogTitle}
        renderForm={props.renderForm}
      />
    </>
  );
}
