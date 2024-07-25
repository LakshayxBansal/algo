"use client";
import React, { useState, ReactNode } from "react";
import { Box, Grid, Input } from "@mui/material";
import { AddDialog } from "./addDialog";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AutocompleteDB from "../AutocompleteDB";
import { formErrorT } from "../../models/models";

type RenderFormFunction = (
  fnDialogOpen: (props: any) => void,
  fnDialogValue: (props: any) => void,
  id?: string
) => JSX.Element;


type OnChangeFunction = (
  event: any,
  newVal: any,
  setDialogValue: (props: any) => void
) => void;

type SelectOptionsFunction = (option: any) => string;

type selectMasterWrapperT = {
  name: string;
  id: string;
  label: string;
  dialogTitle: string;
  fetchDataFn: (arg0: string) => Promise<any>;
  renderForm: RenderFormFunction;
  onChange?: OnChangeFunction;
  renderOptions?: SelectOptionsFunction;
  labelOptions?: SelectOptionsFunction;
  highlightOptions?: SelectOptionsFunction;
  width?: number;
  allowNewAdd?: boolean;
  formError?: formErrorT;
  required?: boolean;
  defaultValue?: string;
  notEmpty?: boolean;
  renderModForm: RenderFormFunction;
  //children: React.FunctionComponentElement
};

export function SelectMasterWrapper<CustomT>(props: selectMasterWrapperT) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modDialogOpen, setModDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<CustomT>({} as CustomT);
  const [modEntityId, setModEntityId] = useState("");
  const allowNewAdd = props.allowNewAdd === false ? false : true;

  function openDialog() {
    if (allowNewAdd) {
      setDialogOpen(true);
    }
  }

  function onModifyDialog(id:string) {
    setModDialogOpen(true);
    setModEntityId(id);
  }

  //             ListboxComponent={customListbox}

  return (
    <>
      <Grid item xs={12} md={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AutocompleteDB
            name={props.name}
            id={props.id}
            label={props.label}
            renderOptions={props.renderOptions}
            labelOptions={props.labelOptions}
            highlightOptions={props.highlightOptions}
            fetchDataFn={props.fetchDataFn}
            onChange={props.onChange}
            width={props.width}
            diaglogVal={dialogValue}
            setDialogVal={setDialogValue}
            formError={props.formError}
            required={props.required}
            notEmpty={props.notEmpty}
            defaultValue={props.defaultValue}
            fnSetModifyMode={onModifyDialog}
          />
          <Tooltip
            title={allowNewAdd ? "Click to add new" : "Not allowed to add"}
            placement="top"
          >
            <IconButton onClick={openDialog} size='small'>
              <AddBoxIcon color="action" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
      {dialogOpen && (
        <AddDialog
          title={props.dialogTitle}
          open={dialogOpen}
          setDialogOpen={setDialogOpen}
        >
          {props.renderForm(setDialogOpen, setDialogValue)}
        </AddDialog>
      )}
      {modDialogOpen && (
        <AddDialog
          title={props.dialogTitle}
          open={modDialogOpen}
          setDialogOpen={setModDialogOpen}
        >
          {props.renderModForm(setDialogOpen, setDialogValue, modEntityId)}
        </AddDialog>
      )}
    </>
  );
}
