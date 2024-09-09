"use client";
import React, { useEffect, useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import AreaForm from "./areaForm";
import { getArea, getAreaById } from "@/app/controllers/area.controller";
import {
  getExecutiveRole,
  getExecutiveRoleById,
} from "@/app/controllers/executiveRole.controller";
import {
  getExecutiveGroup,
  getExecutiveGroupById,
} from "@/app/controllers/executiveGroup.controller";
import { getBizAppUser } from "@/app/controllers/user.controller";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import ExecutiveRoleForm from "./executiveRoleForm";
import ExecutiveGroupForm from "./executiveGroupForm";
import ExecutiveDeptForm from "./executiveDeptForm";
import CountryForm from "@/app/Widgets/masters/masterForms/countryForm";
import StateForm from "@/app/Widgets/masters/masterForms/stateForm";
import { getCountries, getStates } from "@/app/controllers/masters.controller";
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
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import dayjs from "dayjs";
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function ExecutiveForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const entityData: executiveSchemaT = props.data ? props.data : {};

  async function getApplicationUser(searchStr: string) {
    let dbResult = await getBizAppUser(searchStr, true, true, false, false);
    dbResult = [{ id: 0, name: "Send invite..." }, ...dbResult];
    if (dbResult.length > 0) {
      return dbResult;
    }
  }

  // function onDepartmentChange(event: React.SyntheticEvent, value: any) {
  //   setExecutiveDepartment(value);
  // }

  const handleSubmit = async (formData: FormData) => {
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
    const result = await persistEntity(data as executiveSchemaT);

    if (result.status) {
      const newVal = {
        id: result.data[0].id,
        name: result.data[0].name,
      };
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
    data.executive_dept_id = selectValues.executive_dept
      ? selectValues.executive_dept.id
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

    return data;
  };

  async function getStatesforCountry(stateStr: string) {
    const country = selectValues.country?.name;

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
    values[name] = val;

    setSelectValues(values);
  }

  async function persistEntity(data: executiveSchemaT) {
    let result;
    let flag;
    if (props.data) {
      data["id"] = entityData.id;
      result = await updateExecutive(data);
    } else {
      result = await createExecutive(data);
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
        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {entityData ? "Update Executive" : "Add Executive"}
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Seperator>
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
              // required
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
              onChange={(e, v, s) => onSelectChange(e, v, s, "area")}
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
              dialogTitle={"Add Department"}
              defaultValue={
                {
                  id: entityData.executive_dept_id,
                  name: entityData.executive_dept,
                } as optionsDataT
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
            <SelectMasterWrapper
              name={"role"}
              id={"role"}
              label={"Role"}
              width={210}
              dialogTitle={"Add Role"}
              fetchDataFn={(roleStr: string) =>
                getExecutiveRole(roleStr, selectValues.department?.id)
              }
              fnFetchDataByID={getExecutiveRoleById}
              defaultValue={
                {
                  id: entityData.role_id,
                  name: entityData.role,
                } as optionsDataT
              }
              onChange={(e, v, s) => onSelectChange(e, v, s, "role")}
              required
              disable={selectValues.department ? false : true}
              formError={formError?.executiveRole ?? formError.executiveRole}
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
              defaultValue={
                {
                  id: entityData.executive_group_id,
                  name: entityData.executive_group,
                } as optionsDataT
              }
              onChange={(e, v, s) => onSelectChange(e, v, s, "group")}
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
              onChange={(e, v, s) => onSelectChange(e, v, s, "crm_user")}
              fetchDataFn={getApplicationUser}
              formError={formError.crm_user}
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <ExecutiveGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
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
            />
            <InputControl
              inputType={InputType.PHONE}
              id="whatsapp"
              label="Whatsapp No"
              name="whatsapp"
              error={formError?.whatsapp?.error}
              helperText={formError?.whatsapp?.msg}
              defaultValue={entityData.whatsapp}
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
            <InputControl
              inputType={InputType.TEXT}
              name="city"
              id="city"
              label="City"
              defaultValue={entityData.city}
              error={formError?.city?.error}
              helperText={formError?.city?.msg}
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
              name={"country"}
              id={"country"}
              label={"Country"}
              width={210}
              dialogTitle={"Add country"}
              defaultValue={
                {
                  id: entityData.country_id,
                  name: entityData.country,
                } as optionsDataT
              }
              onChange={(e, v, s) => onSelectChange(e, v, s, "country")}
              fetchDataFn={getCountries}
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <CountryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              )}
            />
            <SelectMasterWrapper
              name={"state"}
              id={"state"}
              label={"State"}
              width={210}
              dialogTitle={"Add State"}
              disable={selectValues.country ? false : true}
              defaultValue={
                {
                  id: entityData.state_id,
                  name: entityData.state,
                } as optionsDataT
              }
              onChange={(e, v, s) => onSelectChange(e, v, s, "state")}
              fetchDataFn={getStatesforCountry}
              renderForm={(fnDialogOpen, fnDialogValue) => (
                <StateForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                />
              )}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
              Submit
            </Button>
          </Box>
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
