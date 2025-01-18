import { optionsDataT } from '@/app/models/models';
import { useState } from 'react';
import { formMetaDataPropT, loggedInUserDataT, regionalSettingSchemaT, rightSchemaT } from "../../models/models";

enum dialogMode {
  Add,
  Modify,
}


interface UseDialogProps {
  defaultValue?: optionsDataT;
  allowNewAdd?: boolean;
  allowModify?: boolean;
  fnFetchDataByID?: (id: number) => Promise<any>;
  onChange?: (event: any, value: optionsDataT, setDialogValue: React.Dispatch<React.SetStateAction<optionsDataT>>) => void;
}

interface UseDialogReturn {
  dialogOpen: boolean;
  dlgMode: dialogMode;
  dialogValue: optionsDataT;
  metaData: formMetaDataPropT;
  modData: any;
  openDialog: () => Promise<void>;
  onModifyDialog: () => Promise<void>;
  changeDialogValue: (val: optionsDataT) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useDialog(props: UseDialogProps): UseDialogReturn {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dlgMode, setDlgMode] = useState<dialogMode>(dialogMode.Add);
  const [dialogValue, setDialogValue] = useState<optionsDataT>(
    props.defaultValue ?? {} as optionsDataT
  );
  const [modData, setModData] = useState<any>({});
  const [metaData, setMetaData] = useState<formMetaDataPropT>({
    fields: [],
    rights: {} as rightSchemaT,
    regionalSettingsConfigData: {} as regionalSettingSchemaT,
    loggedInUserData: {} as loggedInUserDataT
  });

  const allowNewAdd = props.allowNewAdd !== false;
  const allowModify = props.allowModify !== false;

  async function openDialog() {
    if (allowNewAdd) {
      if (props.fnFetchDataByID) {
        const data = await props.fnFetchDataByID(0);
        if (data[0]?.length > 0) {
          setMetaData({
            fields: data[0][0] || [],
            rights: data[0][1] || {},
            regionalSettingsConfigData: data[0][2] || [],
            loggedInUserData: data[0][3] || {}
          });
        }
      }
      setDialogOpen(true);
      setDlgMode(dialogMode.Add);
    }
  }

  async function onModifyDialog() {
    if (allowModify && dialogValue.id) {
      if (props.fnFetchDataByID) {
        const data = await props.fnFetchDataByID(dialogValue.id);
        if (data[0]?.length > 0) {
          setModData(data[0][1]);
          setMetaData({
            fields: data[0][0] || [],
            rights: data[0][2] || {},
            regionalSettingsConfigData: data[0][3] || [],
            loggedInUserData: data[0][4] || {}
          });
        } else {
          setModData(data[0]);
        }
      }
      setDialogOpen(true);
      setDlgMode(dialogMode.Modify);
    }
  }

  function changeDialogValue(val: optionsDataT) {
    console.log("Props", props);
    console.log(val);
    setDialogValue(val);
    if (props.onChange) {
      props.onChange(null, val, setDialogValue);
    }
  }

  return {
    dialogOpen,
    dlgMode,
    dialogValue,
    metaData,
    modData,
    openDialog,
    onModifyDialog,
    changeDialogValue,
    setDialogOpen
  };
}