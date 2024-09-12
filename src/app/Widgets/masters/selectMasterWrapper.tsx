"use client";
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { AddDialog } from "./addDialog";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AutocompleteDB from "../AutocompleteDB";
import { formErrorT } from "../../models/models";
import EditIcon from "@mui/icons-material/Edit";
import { optionsDataT } from "@/app/models/models";
import { RenderFormFunctionT } from "@/app/models/models";

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
  disable?: boolean;
};

enum dialogMode {
  Add,
  Modify,
}

export function SelectMasterWrapper(props: selectMasterWrapperT) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dlgMode, setDlgMode] = useState(dialogMode.Add);
  const [dialogValue, setDialogValue] = useState<optionsDataT>(
    {} as optionsDataT
  );
  const [modData, setModData] = useState({});
  const allowNewAdd = props.allowNewAdd === false ? false : true;
  const allowModify = props.allowModify === false ? false : true;

  function openDialog() {
    if (allowNewAdd) {
      setDialogOpen(true);
      setDlgMode(dialogMode.Add);
    }
  }

  async function onModifyDialog() {
    if (allowModify) {
      if (props.fnFetchDataByID && dialogValue.id) {
        const data = await props.fnFetchDataByID(dialogValue.id);
        setModData(data[0]);
      }
      setDialogOpen(true);
      setDlgMode(dialogMode.Modify);
    }
  }

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
            disable={props.disable}
          />
          {!props.disable && (
            <IconButton size="small">
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "Center",
                  alignItems: "Center",
                  marginLeft: "3px",
                  gap: "0px",
                }}
              >
                <Tooltip
                  title={
                    allowNewAdd ? "Click to add new" : "Not allowed to add"
                  }
                  placement="top"
                >
                  <AddBoxIcon
                    onClick={openDialog}
                    color="action"
                    fontSize="small"
                  />
                </Tooltip>
                {(dialogValue.id ?? false) && (
                  <Tooltip
                    title={
                      allowModify ? "Click to modify" : "Not allowed to modify"
                    }
                    placement="bottom"
                  >
                    {
                      <EditIcon
                        onClick={onModifyDialog}
                        color="action"
                        fontSize="small"
                      />
                    }
                  </Tooltip>
                )}
              </span>
            </IconButton>
          )}
        </Box>
      </Grid>
      {dialogOpen && (
        <AddDialog
          title={props.dialogTitle}
          open={dialogOpen}
          setDialogOpen={setDialogOpen}
        >
          {props.renderForm
            ? dlgMode === dialogMode.Add
              ? props.renderForm(setDialogOpen, setDialogValue)
              : props.renderForm(setDialogOpen, setDialogValue, modData)
            : 1}
        </AddDialog>
      )}
    </>
  );
}
