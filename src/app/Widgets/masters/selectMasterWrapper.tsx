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
import { getScreenDescription } from "@/app/controllers/object.controller";

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
  defaultOptions?: optionsDataT[]
  showDetails?: boolean;
  autoFocus?: boolean;
};

type masterDataprop = {
  fields: {},
  data?: {},
  rights: {},
  config_data: {},
  loggedInUserData: {}
}

enum dialogMode {
  Add,
  Modify,
}

export function SelectMasterWrapper(props: selectMasterWrapperT) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dlgMode, setDlgMode] = useState(dialogMode.Add);
  const [dialogValue, setDialogValue] = useState<optionsDataT>(
    // {} as optionsDataT
    props.defaultValue ?? {} as optionsDataT
  );
  const [desc, setDesc] = useState();
  const [modData, setModData] = useState({});
  const allowNewAdd = props.allowNewAdd === false ? false : true;
  const allowModify = props.allowModify === false ? false : true;
  const [masterData, setMasterData] = useState<masterDataprop>({
    fields: [],
    data: {},
    rights: {},
    config_data: [],
    loggedInUserData: {}
  });


  async function openDialog() {
    if (allowNewAdd) {
      if (props.fnFetchDataByID) {
        const data = await props.fnFetchDataByID(0);
        setDesc(data[0]);
      }
      setDialogOpen(true);
      setDlgMode(dialogMode.Add);
      if (props.fnFetchDataByID) {
        const data = await props.fnFetchDataByID(0);
        if (data.length > 0) {
          setMasterData({
            fields: data[0][0] || [],
            rights: data[0][1] || {},
            config_data: data[0][2] || [],
            loggedInUserData: data[0][3] || {}
          });
        }
      }
    }
    // getDescriptionData();
  }

  // this is a wrapper function to enable a call the the parent controls onchange
  function changeDialogValue(val: optionsDataT) {
    setDialogValue(val);
    if (props.onChange) {
      props.onChange(null, val, setDialogValue);
    }
  }


  async function onModifyDialog() {
    if (allowModify) {
      if (props.fnFetchDataByID && dialogValue.id) {
        const data = await props.fnFetchDataByID(dialogValue.id);
        setModData(data[0][1]);
        setMasterData({
          fields: data[0][0] || {},
          data: data[0][1] || {},
          rights: data[0][2] || {},
          config_data: data[0][3] || {},
          loggedInUserData: data[0][4] || {}
        });
      }
      setDialogOpen(true);
      setDlgMode(dialogMode.Modify);
    }
    // getDescriptionData();
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
            defaultOptions={props.defaultOptions}
            showDetails={props.showDetails ? props.showDetails : false}
          />
          {!props.disable && (
            <IconButton tabIndex={-1} size="small">
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
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
                {(dialogValue.id ? true : false) && (
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
              ? props.renderForm(setDialogOpen, changeDialogValue, masterData)
              : props.renderForm(setDialogOpen, changeDialogValue, masterData, modData)
            : 1}
        </AddDialog>
      )}
    </>
  );
}
