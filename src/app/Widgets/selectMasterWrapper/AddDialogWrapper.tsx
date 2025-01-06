import React from 'react';
import { AddDialog } from '@/app/Widgets/masters/addDialog';

enum dialogMode {
  Add,
  Modify,
}


interface MetaData {
  fields: any[];
}

interface AddDialogWrapperProps {
  dialogOpen: boolean;
  dlgMode: dialogMode;
  metaData?: MetaData;
  modData?: any;
  setDialogOpen: (open: boolean) => void;
  changeDialogValue: (value: any) => void;
  dialogTitle: string;
  renderForm?: (
    setDialogOpen: (open: boolean) => void,
    changeDialogValue: (value: any) => void,
    metaData?: MetaData,
    modData?: any
  ) => React.ReactNode;
}

export function AddDialogWrapper(props: AddDialogWrapperProps) {
  const { dialogOpen, dlgMode, metaData, modData, setDialogOpen, changeDialogValue } = props;

  return (
    dialogOpen && (
      <AddDialog
        title={`${dlgMode === dialogMode.Add ? 'Add' : 'Update'} ${props.dialogTitle}`}
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        {props.renderForm
          ? (metaData?.fields?.length ?? 0) > 0 ? (
            dlgMode === dialogMode.Add
              ? props.renderForm(setDialogOpen, changeDialogValue, metaData)
              : props.renderForm(setDialogOpen, changeDialogValue, metaData, modData)
          ) : (
            dlgMode === dialogMode.Add
              ? props.renderForm(setDialogOpen, changeDialogValue)
              : props.renderForm(setDialogOpen, changeDialogValue, modData)
          ) : 1
        }
      </AddDialog>
    )
  );
}