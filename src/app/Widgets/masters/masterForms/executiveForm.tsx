"use client";
import React, { useEffect, useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import AreaForm from "./areaForm";
import { getArea, getAreaById } from "@/app/controllers/area.controller";
import { getInviteDetailByContact } from "@/app/controllers/user.controller";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  getExecutiveRole,
  getExecutiveRoleById,
} from "@/app/controllers/executiveRole.controller";
import {
  getExecutiveGroup,
  getExecutiveGroupById,
} from "@/app/controllers/executiveGroup.controller";
import { getBizAppUser } from "@/app/controllers/user.controller";
import { insertExecutiveIdToInviteUser } from "@/app/controllers/user.controller";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import ExecutiveRoleForm from "./executiveRoleForm";
import ExecutiveGroupForm from "./executiveGroupForm";
import InviteUserForm from "./InviteUserForm";
import ExecutiveDeptForm from "./executiveDeptForm";
import CountryForm from "@/app/Widgets/masters/masterForms/countryForm";
import StateForm from "@/app/Widgets/masters/masterForms/stateForm";
import { getCountries, getCountryById, getStateById, getStates } from "@/app/controllers/masters.controller";
import {
  getDeptById,
  getExecutiveDept,
} from "@/app/controllers/executiveDept.controller";
import {
  createExecutive,
  updateExecutive,
} from "@/app/controllers/executive.controller";
import {
  executiveSchemaT,
  masterFormPropsT,
  masterFormPropsWithDataT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import dayjs from "dayjs";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { getSession } from "@/app/services/session.service";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { AddDialog } from "../addDialog";
import AddDocsForm from "@/app/cap/admin/lists/executiveList/AddDocsForm";

type ModifiedRowT = {
  id?: number;
  description?: string;
  document?: string;
  file?: string | ArrayBuffer | null ;
};

const rows: any = [];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ExecutiveForm(props: masterFormPropsWithDataT) {
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [docData, setDocData] = React.useState(rows);
  const [modifiedRowData, setModifiedRowData] = useState<ModifiedRowT>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [editMode, setEditMode] = useState<GridRowId | null>();
  const entityData: executiveSchemaT = props.data ? props.data : {};
  const [defaultState, setDefaultState] = useState<optionsDataT | undefined>({
    id: entityData.state_id,
    name: entityData.state,
  } as optionsDataT);
  const [defaultRole, setDefaultRole] = useState<optionsDataT | undefined>({
    id: entityData.role_id,
    name: entityData.role,
  } as optionsDataT);
  const [stateKey, setStateKey] = useState(0);
  const [roleKey, setRoleKey] = useState(0);

  function EditToolbar() {

    const handleClick = () => {
      setDialogOpen(true);
    };

    return (
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Seperator>Document List</Seperator>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Document
        </Button>
      </GridToolbarContainer>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 150,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <InputControl
              required
              inputType={InputType.TEXT}
              name="description"
              id="description"
              defaultValue={params.row.description}
              error={formError?.description?.error}
              helperText={formError?.description?.msg}
              onChange={(e: any) => {
                setModifiedRowData((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
              }}
            />
          );
        }
      },
    },
    {
      field: "document",
      headerName: "Document",
      width: 150,
      renderCell: (params) => {
        if (editMode === params.row.id) {
          return (
            <>
            {modifiedRowData?.file ? modifiedRowData?.document : 
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>}
            </>
          );
        }
      },
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
          />,
          <GridActionsCellItem
            key={params.row.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params.row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleSaveClick = () => {
    //save the data from modifiedRowData state into rows of data grid
    if (docData.length > 0) {
      const updatedRows = docData.map((row: any) =>
        row.id === modifiedRowData?.id ? { ...row, ...modifiedRowData } : row
      );
      setDocData(updatedRows);
      setEditMode(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
        const file = files[0];
        setModifiedRowData((prevState) => ({
          ...prevState,
          document: file.name,
        }));
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            // console.log(base64String);
            setModifiedRowData((prevState) => ({
              ...prevState,
              file: base64String,
            }));
        };
        reader.readAsDataURL(file);
    }
}

  const handleDeleteClick = (id: GridRowId) => () => {
    // Filter out the row with the matching id
    if (docData.length > 0) {
      const updatedRows = docData.filter((row: any) => row.id !== id);

      // Update the data state with the filtered rows
      setDocData(updatedRows);
    }
  };

  const handleCancelClick = () => {
    setEditMode(null);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setEditMode(id);
    const selectedRowData = docData.find((row: any) => row.id === id); // Find the corresponding row data
    setModifiedRowData(selectedRowData); //Setting selected row data in modifiedRowData state
    setModifiedRowData((prevState) => ({
      ...prevState,
      file: undefined,
    }));
  };

  entityData.executive_dept_id = props.data?.dept_id;
  entityData.executive_group = props.data?.group_name;
  entityData.executive_group_id = props.data?.group_id;


  async function getApplicationUser(searchStr: string) {
    let dbResult = await getBizAppUser(searchStr, true, true, false, false);
    // dbResult = [{ id: 0, name: "Send invite..." }, ...dbResult];
    // if (dbResult.length > 0) {
    return dbResult;
    // }
  }

  // function onDepartmentChange(event: React.SyntheticEvent, value: any) {
  //   setExecutiveDepartment(value);
  // }

  // useEffect(()=>{setDefaultState({id: 0, name: ""} as optionsDataT)},[selectValues.country])


  const handleSubmit = async (formData: FormData) => {
    try {
      const session = await getSession();
      let data: { [key: string]: any } = {}; // Initialize an empty object

      formData.append("call_type", "Enquiry");

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      formData = updateFormData(data);
      data["dob"] = data["dob"] != "" ? new Date(data["dob"]) : "";
      data["doa"] = data["doa"] != "" ? new Date(data["doa"]) : "";
      data["doj"] = data["doj"] != "" ? new Date(data["doj"]) : "";
      // if (parsed.success) {
      // const inviteUser = data.crm_user;
      // let inviteId;
      // if( session && inviteUser ){
      //   const invite = await getInviteDetailByContact(inviteUser,session?.user.dbInfo.id);
      //   inviteId = invite.id;
      // }

      const result = await persistEntity(data as executiveSchemaT, docData);
      if (result.status) {
        const newVal = {
          id: result.data[0].id,
          name: result.data[0].name,
        };
        // if(inviteId){
        //   await insertExecutiveIdToInviteUser(result.data[0].id,inviteId);
        // }
        props.setDialogValue ? props.setDialogValue(newVal) : null;
        setFormError({});
        setSnackOpen(true);
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
        }, 1000);
      } else {
        const issues = result.data;
        // show error on screen
        const errorState: Record<string, { msg: string; error: boolean }> = {};
        for (const issue of issues) {
          for (const path of issue.path) {
            errorState[path] = { msg: issue.message, error: true };
          }
        }
        errorState["form"] = { msg: "Error encountered", error: true };
        setFormError(errorState);
      }
    } catch (error) {
      throw error;
    }
  };

  const updateFormData = (data: any) => {
    data.executive_group_id = selectValues.executive_group
      ? selectValues.executive_group.id
      : entityData.executive_group_id
        ? entityData.executive_group_id
        : 0;
    data.role_id = selectValues.role
      ? selectValues.role.id
      : entityData.role_id
        ? entityData.role_id
        : 0;
    data.area_id = selectValues.area
      ? selectValues.area.id
      : entityData.area_id
        ? entityData.area_id
        : 0;
    data.crm_user_id = selectValues.crm_user
      ? selectValues.crm_user.id
      : entityData.crm_user_id
        ? entityData.crm_user_id
        : 0;
    data.executive_dept_id = selectValues.department
      ? selectValues.department.id
      : entityData.executive_dept_id
        ? entityData.executive_dept_id
        : 0;
    data.country_id = selectValues.country
      ? selectValues.country.id
      : entityData.country_id
        ? entityData.country_id
        : 0;
    data.state_id = selectValues.state
      ? selectValues.state.id
      : entityData.state_id
        ? entityData.state_id
        : 0;
    data.prev_crm_user_id = entityData.crm_user_id ? entityData.crm_user_id : 0;

    return data;
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
        <Box sx={{ mt: 2 }}>No Items Added</Box>
      </StyledGridOverlay>
    );
  }

  async function getStatesforCountry(stateStr: string) {
    const country = selectValues.country?.name || entityData.country;

    const states = await getStates(stateStr, country);
    if (states.length > 0) {
      return states;
    }
  }

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  function onSelectChange(
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any,
    name: string
  ) {
    let values = { ...selectValues };
    values[name] = val ? val : { id: 0, name: "" };
    if (name === "country") {
      values["state"] = {};
      setDefaultState(undefined);
      if(values.country.id === 0) setStateDisable(true);
      else setStateDisable(false);
      setStateKey(prev => 1-prev);
    }
    if (name === "department") {
      values["role"] = {};
      setDefaultRole(undefined);
      if(values.department.id === 0) setRoleDisable(true);
      else setRoleDisable(false);
      setRoleKey(prev => 1-prev);
    }
    setSelectValues(values);
  }

  async function persistEntity(data: executiveSchemaT, docData : any) {
    let result;
    if (props.data) {
      data["id"] = entityData.id;
      result = await updateExecutive(data, docData);
    } else {
      result = await createExecutive(data,docData);
    }
    return result;
  }

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };



  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: "0px",
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        {
          props.parentData ? (<></>) : (
            <Seperator>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {props.data ? "Update Executive" : "Add Executive"}
              <IconButton onClick={handleCancel} tabIndex={-1}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Seperator>
          )
        }
      </Box>
      <Collapse in={formError?.form ? true : false}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={clearFormError}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {formError?.form?.msg}
        </Alert>
      </Collapse>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        {/* {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )} */}
        <form action={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              autoFocus
              id="name"
              label="Name"
              name="name"
              required
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              defaultValue={entityData.name}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="alias"
              label="Alias"
              name="alias"
              error={formError?.alias?.error}
              helperText={formError?.alias?.msg}
              defaultValue={entityData.alias}
            />
            <SelectMasterWrapper
              name={"area"}
              id={"area"}
              label={"Area"}
              width={210}
              dialogTitle={"Add Area"}
              defaultValue={
                {
                  id: entityData.area_id,
                  name: entityData.area,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, area: val ? val : { id: 0, name: "" } })
              }
              fetchDataFn={getArea}
              fnFetchDataByID={getAreaById}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <AreaForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
            <SelectMasterWrapper
              name={"executive_dept"}
              id={"department"}
              label={"Department"}
              width={210}
              required
              dialogTitle={"Add Department"}
              defaultValue={
                {
                  id: entityData.executive_dept_id,
                  name: entityData.executive_dept,
                } as optionsDataT
              }
              disable={(props?.parentData === "profile" && entityData.role_id !== 1) ? true : false}
              onChange={(e, v, s) => onSelectChange(e, v, s, "department")}
              fetchDataFn={getExecutiveDept}
              fnFetchDataByID={getDeptById}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <ExecutiveDeptForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
            <SelectMasterWrapper
              key={roleKey}
              name={"role"}
              id={"role"}
              label={"Role"}
              width={210}
              dialogTitle={"Add Role"}
              fetchDataFn={(roleStr: string) =>
                getExecutiveRole(roleStr, selectValues.department?.id)
              }
              fnFetchDataByID={getExecutiveRoleById}
              defaultValue={defaultRole}

              onChange={(e, v, s) => onSelectChange(e, v, s, "role")}
              required
              disable={(props?.parentData === "profile" && entityData.role_id !== 1) ? true : (roleDisable) ? true : false}
              formError={formError?.role ?? formError.role}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <ExecutiveRoleForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                  parentData={selectValues.department.id}
                />
              )}
            />
            <SelectMasterWrapper
              name={"executive_group"}
              id={"group"}
              label={"Executive Group"}
              width={210}
              dialogTitle={"Add Executive Group"}
              disable={(props?.parentData === "profile" && entityData.role_id !== 1) ? true : false}
              defaultValue={
                {
                  id: entityData.executive_group_id,
                  name: entityData.executive_group,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, executive_group: val ? val : { id: 0, name: "" } })
              }
              fetchDataFn={getExecutiveGroup}
              fnFetchDataByID={getExecutiveGroupById}
              renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                <ExecutiveGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="pan"
              label="PAN"
              name="pan"
              error={formError?.pan?.error}
              helperText={formError?.pan?.msg}
              defaultValue={entityData.pan}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="aadhaar"
              label="AADHAAR"
              name="aadhaar"
              error={formError?.aadhaar?.error}
              helperText={formError?.aadhaar?.msg}
              defaultValue={entityData.aadhaar}
            />
            <SelectMasterWrapper
              name={"crm_user"}
              id={"crm_user"}
              label={"Map to App User"}
              width={210}
              dialogTitle={"Add App User"}
              defaultValue={
                {
                  id: entityData.crm_user_id,
                  name: entityData.crm_user,
                } as optionsDataT
              }
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, crm_user: val ? val : { id: 0, name: "" } })
              }
              fetchDataFn={getApplicationUser}
              formError={formError.crm_user}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <InviteUserForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                // isExecutive={true}
                />
              )}
            />
            <InputControl
              inputType={InputType.EMAIL}
              id="email"
              label="Email"
              name="email"
              placeholder="Email address"
              error={formError?.email?.error}
              helperText={formError?.email?.msg}
              defaultValue={entityData.email}
            />
            <InputControl
                inputType={InputType.PHONE}
                id="mobile"
                label="Phone No"
                name="mobile"
                error={formError?.mobile?.error}
                helperText={formError?.mobile?.msg}
                defaultValue={entityData.mobile}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { mobile, ...rest } = curr;
                    return rest;
                  });
                }}
              />
           <InputControl
                inputType={InputType.PHONE}
                id="whatsapp"
                label="Whatsapp No"
                name="whatsapp"
                // defaultCountry="FR"
                error={formError?.whatsapp?.error}
                helperText={formError?.whatsapp?.msg}
                defaultValue={entityData.whatsapp}
                slotProps={{
                  flagButton : {
                    tabIndex: -1
                  },
                }}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { whatsapp, ...rest } = curr;
                    return rest;
                  });
                }}
              />

            <InputControl
              inputType={InputType.DATEINPUT}
              id="dob"
              label="Date of Birth"
              name="dob"
              defaultValue={entityData.dob ? dayjs(entityData.dob) : null}
              slotProps={{
                textField: {
                  error: formError?.dob?.error,
                  helperText: formError?.dob?.msg,
                },
                openPickerButton: {
                  tabIndex: -1,
                }
              }}
            />
            <InputControl
              inputType={InputType.DATEINPUT}
              id="doa"
              label="Anniversary Date"
              name="doa"
              // defaultValue={entityData.doa}
              defaultValue={entityData.doa ? dayjs(entityData.doa) : null}
              slotProps={{
                textField: {
                  error: formError?.doa?.error,
                  helperText: formError?.doa?.msg,
                },
                openPickerButton: {
                  tabIndex: -1,
                }
              }}
            />
            <InputControl
              inputType={InputType.DATEINPUT}
              id="doj"
              label="Joining Date"
              name="doj"
              // defaultValue={entityData.doj}
              defaultValue={entityData.doj ? dayjs(entityData.doj) : null}
              slotProps={{
                textField: {
                  error: formError?.doj?.error,
                  helperText: formError?.doj?.msg,
                },
                openPickerButton: {
                  tabIndex: -1,
                }
              }}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 1"
              name="address1"
              id="address1"
              defaultValue={entityData.address1}
              error={formError?.address1?.error}
              helperText={formError?.address1?.msg}
              fullWidth
            />
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 2"
              name="address2"
              id="address2"
              defaultValue={entityData.address2}
              error={formError?.address2?.error}
              helperText={formError?.address2?.msg}
              fullWidth
            />
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 3"
              name="address3"
              id="address3"
              defaultValue={entityData.address3}
              error={formError?.address3?.error}
              helperText={formError?.address3?.msg}
              fullWidth
            />
            <SelectMasterWrapper
              name={"country"}
              id={"country"}
              label={"Country"}
              width={350}
              dialogTitle={"Add country"}
              defaultValue={
                {
                  id: entityData.country_id,
                  name: entityData.country,
                } as optionsDataT
              }
              onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
              fetchDataFn={getCountries}
              fnFetchDataByID={getCountryById}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <CountryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <SelectMasterWrapper
              key={stateKey}
              name={"state"}
              id={"state"}
              label={"State"}
              width={210}
              dialogTitle={"Add State"}
              // disable={selectValues.country || entityData.country_id ? false : true}
              disable={stateDisable}
              defaultValue={defaultState}
              onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
              fetchDataFn={getStatesforCountry}
              fnFetchDataByID={getStateById}
              renderForm={(fnDialogOpen, fnDialogValue, data) => (
                <StateForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                  parentData={selectValues.country?.id || entityData.country_id}
                />
              )}
            />

            <InputControl
              inputType={InputType.TEXT}
              name="city"
              id="city"
              label="City"
              defaultValue={entityData.city}
              error={formError?.city?.error}
              helperText={formError?.city?.msg}
            />

            <InputControl
              inputType={InputType.TEXT}
              name="pincode"
              id="pincode"
              label="Pin Code"
              defaultValue={entityData.pincode}
              error={formError?.pincode?.error}
              helperText={formError?.pincode?.msg}
            />
          </Box>
          {/* {enquiryMaintainItems && ( */}
          <Grid item xs={12} md={6} sx={{ marginY: "0.5%" }}>
            <Box
              sx={{
                height: 300,
              }}
            >
              <DataGrid
                columns={columns}
                rows={docData ? docData : []}
                disableRowSelectionOnClick
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                  toolbar: EditToolbar as GridSlots["toolbar"],
                }}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: "bold",
                    },
                  },
                }}
              />
            </Box>
          </Grid>
          {/* )} */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={()=>{
              if(props.parentData === 'profile'){
                router.push('/cap');
              }
              else{
                handleCancel();
              }
            }} tabIndex={-1}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
          </Box>
          {dialogOpen && (
          <AddDialog
            title=""
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <AddDocsForm
              setDialogOpen={setDialogOpen}
              setData={setDocData}
            />
          </AddDialog>
        )}
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Box>
  );
}
