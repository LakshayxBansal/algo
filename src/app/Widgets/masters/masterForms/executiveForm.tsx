"use client";
import React, { useEffect, useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import AreaForm from "./areaForm";
import { getArea, getAreaById } from "@/app/controllers/area.controller";
import { getInviteDetailByContact } from "@/app/controllers/user.controller";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
import {
  getCountries,
  getCountryById,
  getStateById,
  getStates,
} from "@/app/controllers/masters.controller";
import {
  getDeptById,
  getExecutiveDept,
} from "@/app/controllers/executiveDept.controller";
import {
  createExecutive,
  updateExecutive,
} from "@/app/controllers/executive.controller";
import {
  docDescriptionSchemaT,
  executiveSchemaT,
  masterFormPropsWithDataT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import dayjs from "dayjs";
import {
  Badge,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { getSession } from "@/app/services/session.service";
import { AddDialog } from "../addDialog";
import { useRouter } from "next/navigation";
import DocModal from "@/app/utils/docs/DocModal";

export default function ExecutiveForm(props: masterFormPropsWithDataT) {
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>(
    props?.data ? props?.data?.docData : []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
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
  const [stateDisable, setStateDisable] = useState<boolean>(
    !entityData.country
  );
  const [roleDisable, setRoleDisable] = useState<boolean>(
    !entityData.executive_dept
  );
  const [whatsappFn, setWhatsappFn] = useState(entityData.whatsapp);

  entityData.executive_dept_id = props.data?.dept_id;
  entityData.executive_group = props.data?.group_name;
  entityData.executive_group_id = props.data?.group_id;

  const handleWhatsappChange = (val: string) => {
    setWhatsappFn(val);
  };

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

      const result = await persistEntity(data as executiveSchemaT);
      if (result?.status) {
        const newVal = {
          id: result?.data[0].id,
          name: result?.data[0].name,
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
        const issues = result?.data;
        // show error on screen
        const errorState: Record<string, { msg: string; error: boolean }> = {};
        errorState["form"] = { msg: "Error encountered", error: true };
        for (const issue of issues) {
          for (const path of issue.path) {
            errorState[path] = { msg: issue.message, error: true };
            if (path === "refresh") {
              errorState["form"] = { msg: issue.message, error: true };
            }
          }
        }
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

    data.role = selectValues.role
      ? selectValues.role.name
      : entityData.role
        ? entityData.role
        : "";
    return data;
  };

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
      if (values.country.id === 0) setStateDisable(true);
      else setStateDisable(false);
      setStateKey((prev) => 1 - prev);
    }
    if (name === "department") {
      values["role"] = {};
      setDefaultRole(undefined);
      if (values.department.id === 0) setRoleDisable(true);
      else setRoleDisable(false);
      setRoleKey((prev) => 1 - prev);
    }
    setSelectValues(values);
  }

  async function persistEntity(data: executiveSchemaT) {
    let result;
    const newDocsData = docData.filter((row: any) => row.type !== "db");
    if (props.data) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
      result = await updateExecutive(data, newDocsData);
    } else {
      result = await createExecutive(data, newDocsData);
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
    <>
      <Box
        sx={{
          position: "sticky",
          top: "0px",
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        {props.parentData ? (
          <></>
        ) : (
          <>
            <Seperator>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {props.data ? "Update Executive" : "Add Executive"}
                <IconButton onClick={handleCancel} tabIndex={-1}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Seperator>
          </>
        )}
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
      <Box id="sourceForm">
        {/* {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )} */}
        <form action={handleSubmit} noValidate>
          <Grid container spacing={2} rowGap={1}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                autoFocus
                id="name"
                label="Name"
                name="name"
                required
                titleCase={true}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
                defaultValue={entityData.name}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="alias"
                label="Alias"
                name="alias"
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
                defaultValue={entityData.alias}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"area"}
                id={"area"}
                label={"Area"}
                width={352}
                dialogTitle={"Add Area"}
                defaultValue={
                  {
                    id: entityData.area_id,
                    name: entityData.area,
                  } as optionsDataT
                }
                onChange={(e, val, s) =>
                  setSelectValues({
                    ...selectValues,
                    area: val ? val : { id: 0, name: "" },
                  })
                }
                fetchDataFn={getArea}
                fnFetchDataByID={getAreaById}
                formError={formError.area}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <AreaForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"executive_dept"}
                id={"department"}
                label={"Department"}
                width={352}
                required
                dialogTitle={"Add Department"}
                formError={formError.executive_dept}
                defaultValue={
                  {
                    id: entityData.executive_dept_id,
                    name: entityData.executive_dept,
                  } as optionsDataT
                }
                disable={
                  props?.parentData === "profile" && entityData.role_id !== 1
                    ? true
                    : false
                }
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
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                key={roleKey}
                name={"role"}
                id={"role"}
                label={"Role"}
                width={352}
                dialogTitle={"Add Role"}
                fetchDataFn={(roleStr: string) =>
                  getExecutiveRole(roleStr, selectValues.department?.id)
                }
                fnFetchDataByID={getExecutiveRoleById}
                defaultValue={defaultRole}
                onChange={(e, v, s) => onSelectChange(e, v, s, "role")}
                required
                disable={
                  props?.parentData === "profile" && entityData.role_id !== 1
                    ? true
                    : roleDisable
                      ? true
                      : false
                }
                formError={formError?.role ?? formError.role}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <ExecutiveRoleForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                    parentData={
                      selectValues.department?.id ||
                      entityData.executive_dept_id
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"executive_group"}
                id={"group"}
                label={"Executive Group"}
                width={352}
                dialogTitle={"Add Executive Group"}
                disable={
                  props?.parentData === "profile" && entityData.role_id !== 1
                    ? true
                    : false
                }
                defaultValue={
                  {
                    id: entityData.executive_group_id,
                    name: entityData.executive_group,
                  } as optionsDataT
                }
                onChange={(e, val, s) =>
                  setSelectValues({
                    ...selectValues,
                    executive_group: val ? val : { id: 0, name: "" },
                  })
                }
                fetchDataFn={getExecutiveGroup}
                fnFetchDataByID={getExecutiveGroupById}
                formError={formError.group}
                renderForm={(fnDialogOpen, fnDialogValue, data?) => (
                  <ExecutiveGroupForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="pan"
                label="PAN"
                name="pan"
                error={formError?.pan?.error}
                helperText={formError?.pan?.msg}
                defaultValue={entityData.pan}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="aadhaar"
                label="AADHAAR"
                name="aadhaar"
                error={formError?.aadhaar?.error}
                helperText={formError?.aadhaar?.msg}
                defaultValue={entityData.aadhaar}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SelectMasterWrapper
                name={"crm_user"}
                id={"crm_user"}
                label={"Map to App User"}
                width={352}
                dialogTitle={"Add App User"}
                defaultValue={
                  {
                    id: entityData.crm_user_id,
                    name: entityData.crm_user,
                  } as optionsDataT
                }
                onChange={(e, val, s) =>
                  setSelectValues({
                    ...selectValues,
                    crm_user: val ? val : { id: 0, name: "" },
                  })
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
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.EMAIL}
                id="email"
                label="Email"
                name="email"
                placeholder="Email address"
                error={formError?.email?.error}
                helperText={formError?.email?.msg}
                defaultValue={entityData.email}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.PHONE}
                id="mobile"
                label="Phone No"
                name="mobile"
                error={formError?.mobile?.error}
                helperText={formError?.mobile?.msg}
                defaultValue={entityData.mobile}
                onChange={handleWhatsappChange}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { mobile, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.PHONE}
                id="whatsapp"
                label="Whatsapp No"
                name="whatsapp"
                // defaultCountry="FR"
                error={formError?.whatsapp?.error}
                helperText={formError?.whatsapp?.msg}
                defaultValue={whatsappFn}
                key={whatsappFn}
                slotProps={{
                  flagButton: {
                    tabIndex: -1,
                  },
                }}
                onKeyDown={() => {
                  setFormError((curr) => {
                    const { whatsapp, ...rest } = curr;
                    return rest;
                  });
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.DATEINPUT}
                id="dob"
                label="Date of Birth"
                name="dob"
                style={{ width: "100%" }}
                defaultValue={entityData.dob ? dayjs(entityData.dob) : null}
                slotProps={{
                  textField: {
                    error: formError?.dob?.error,
                    helperText: formError?.dob?.msg,
                  },
                  openPickerButton: {
                    tabIndex: -1,
                  },
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.DATEINPUT}
                id="doa"
                label="Anniversary Date"
                name="doa"
                style={{ width: "100%" }}
                // defaultValue={entityData.doa}
                defaultValue={entityData.doa ? dayjs(entityData.doa) : null}
                slotProps={{
                  textField: {
                    error: formError?.doa?.error,
                    helperText: formError?.doa?.msg,
                  },
                  openPickerButton: {
                    tabIndex: -1,
                  },
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
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
                  },
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 1"
                name="address1"
                id="address1"
                defaultValue={entityData.address1}
                error={formError?.address1?.error}
                helperText={formError?.address1?.msg}
                style={{ width: "100%" }}
              // fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputControl
                inputType={InputType.TEXT}
                label="Address Line 2"
                name="address2"
                id="address2"
                defaultValue={entityData.address2}
                error={formError?.address2?.error}
                helperText={formError?.address2?.msg}
                style={{ width: "100%" }}
              // fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <SelectMasterWrapper
                name={"country"}
                id={"country"}
                label={"Country"}
                width={352}
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
                formError={formError.country}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <CountryForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <SelectMasterWrapper
                key={stateKey}
                name={"state"}
                id={"state"}
                label={"State"}
                width={352}
                dialogTitle={"Add State"}
                // disable={selectValues.country || entityData.country_id ? false : true}
                disable={stateDisable}
                defaultValue={defaultState}
                onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
                fetchDataFn={getStatesforCountry}
                fnFetchDataByID={getStateById}
                formError={formError.state}
                renderForm={(fnDialogOpen, fnDialogValue, data) => (
                  <StateForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                    data={data}
                    parentData={
                      selectValues.country?.id || entityData.country_id
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <InputControl
                inputType={InputType.TEXT}
                name="city"
                id="city"
                label="City"
                defaultValue={entityData.city}
                error={formError?.city?.error}
                helperText={formError?.city?.msg}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <InputControl
                inputType={InputType.TEXT}
                name="pincode"
                id="pincode"
                label="Pin Code"
                defaultValue={entityData.pincode}
                error={formError?.pincode?.error}
                helperText={formError?.pincode?.msg}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Box>
                <Tooltip
                  title={
                    docData.length > 0 ? (
                      docData.map((file: any, index: any) => (
                        <Typography variant="body2" key={index}>
                          {file.description}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" color="white">
                        No files available
                      </Typography>
                    )
                  }
                >
                  <IconButton
                    sx={{ float: "left", position: "relative", m: 1 }}
                    onClick={() => setDialogOpen(true)}
                    aria-label="file"
                  >
                    <Badge badgeContent={docData.length} color="primary">
                      <AttachFileIcon></AttachFileIcon>
                    </Badge>
                  </IconButton>
                </Tooltip>
                {/* <Box> */}
                <Button
                  onClick={() => {
                    if (props.parentData === "profile") {
                      router.push("/cap");
                    } else {
                      handleCancel();
                    }
                  }}
                  tabIndex={-1}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "15%", marginLeft: "5%" }}
                >
                  Submit
                </Button>
                {/* </Box> */}
              </Box>
            </Grid>
            {dialogOpen && (
              <AddDialog
                title=""
                open={dialogOpen}
                setDialogOpen={setDialogOpen}
              >
                <DocModal
                  docData={docData}
                  setDocData={setDocData}
                  setDialogOpen={setDialogOpen}
                />
              </AddDialog>
            )}
          </Grid>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </>
  );
}