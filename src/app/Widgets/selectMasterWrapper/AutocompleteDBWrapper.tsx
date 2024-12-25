import React from 'react';
import { AutocompleteDB } from '@/app/Widgets/AutocompleteDB';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { OnChangeFunction } from "@/app/models/models";
import { formErrorT, optionsDataT } from "@/app/models/models";


type SelectOptionsFunction = (option: any) => string;

interface AutocompleteDBWrapperProps {
  name: string;
  id: string;
  label: string;
  renderOptions?: SelectOptionsFunction;
  labelOptions?: SelectOptionsFunction;
  highlightOptions?: SelectOptionsFunction;
  fetchDataFn: any;
  onChange?: OnChangeFunction;
  width?: string | number;
  dialogValue: any;
  setDialogValue: (value: any) => void;
  formError?: formErrorT;
  setFormError?: (error: any) => void;
  required?: boolean;
  notEmpty?: boolean;
  defaultValue?: optionsDataT;  
  onModifyDialog: () => void;
  openDialog: () => void;
  allowNewAdd: boolean;
  allowModify: boolean;
  disabled?: boolean;
  defaultOptions?: any;
  showDetails?: boolean;
}

export function AutocompleteDBWrapper(props: AutocompleteDBWrapperProps) {
  const { dialogValue, openDialog, onModifyDialog, allowNewAdd, allowModify } = props;

  return (
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
      setDialogVal={props.setDialogValue}
      formError={props.formError}
      setFormError={props.setFormError}
      required={props.required}
      notEmpty={props.notEmpty}
      defaultValue={props.defaultValue}
      // fnSetModifyMode={onModifyDialog}
      disable={props.disabled}
      defaultOptions={props.defaultOptions}
      showDetails={props.showDetails ? props.showDetails : false}
      iconControl={!props.disabled && (
        <IconButton title="title" tabIndex={-1} size="small" sx={{ padding: 0, margin: 0 }}>
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "Left",
              alignItems: "Center",
              marginLeft: "1px",
              gap: "0px",
            }}
          >
            {!(dialogValue?.id ? true : false) && (
              <Tooltip
                title={allowNewAdd ? "Click to add new" : "Not allowed to add"}
                placement="top"
              >
                <AddIcon
                  onClick={openDialog}
                  color="action"
                  fontSize="small"
                  sx={{ padding: 0, margin: 0 }}
                />
              </Tooltip>
            )}
            {(dialogValue?.id ? true : false) && (
              <Tooltip
                title={allowModify ? "Click to modify" : "Not allowed to modify"}
                placement="bottom"
              >
                <EditTwoToneIcon
                  onClick={onModifyDialog}
                  color="action"
                  fontSize="small"
                />
              </Tooltip>
            )}
          </span>
        </IconButton>
      )}
    />
  );
}