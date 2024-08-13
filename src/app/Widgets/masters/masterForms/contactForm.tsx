
"use client";
import React, { useState } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getOrganisation } from "@/app/controllers/organisation.controller";
import { getDepartment } from "@/app/controllers/department.controller";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import OrganisationForm from "./organisationForm";
import DepartmentForm from "./departmentForm";
import {
  createContact,
  updateContact,
} from "@/app/controllers/contact.controller";
import { getContactGroup } from "@/app/controllers/contactGroup.controller";
import ContactGroupForm from "@/app/Widgets/masters/masterForms/contactGroupForm";
import AreaForm from "./areaForm";
import { getArea } from "@/app/controllers/area.controller";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { contactSchemaT, optionsDataT, selectKeyValueT } from "@/app/models/models";
import CountryForm from "@/app/Widgets/masters/masterForms/countryForm";
import StateForm from "@/app/Widgets/masters/masterForms/stateForm";
import { getCountries, getStates } from "@/app/controllers/masters.controller";
import { masterFormPropsT } from "@/app/models/models";

export default function ContactForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  //const [entityData, setentityData] = React.useState<contactSchemaT>(props.data);
  const entityData: contactSchemaT = props.data ? props.data : {};

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };



  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as contactSchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      setSnackOpen(true);
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
      setFormError({});
    } else {
      const issues = result.data;
      // console.log(issues);
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      errorState["form"] = { msg: "Error encountered", error: true };
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  const updateFormData = (data: any) => {
    data.contactGroup_id = selectValues.contactGroup
      ? selectValues.contactGroup.id
      : 0;
    data.contactGroup_id = selectValues.contactGroup
      ? selectValues.contactGroup.id
      : 0;
    data.area_id = selectValues.area ? selectValues.area.id : 0;
    data.organisation_id = selectValues.organisation
      ? selectValues.organisation.id
      : 0;
    data.department_id = selectValues.department
      ? selectValues.department.id
      : 0;
    data.country_id = selectValues.country ? selectValues.country.id : 0;
    data.state_id = selectValues.state ? selectValues.state.id : 0;

    return data;
  };

  async function persistEntity(data: contactSchemaT) {
    let result;
    if (props.data) {
      Object.assign(data, { id: props.data.id });
      result = await updateContact(data);
    } else {
      result = await createContact(data);
    }
    return result;
  }

  return (
    <>
      <Seperator>{props.data ? "Update Contact" : "Add Contact"}</Seperator>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )}
        <form action={handleSubmit}>
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
            <InputControl
              inputType={InputType.TEXT}
              id="print_name"
              label="Print Name"
              name="print_name"
              error={formError?.print_name?.error}
              helperText={formError?.print_name?.msg}
              defaultValue={entityData.print_name}
            />
            <SelectMasterWrapper
              name={"contactGroup"}
              id={"contactGroup"}
              label={"Group"}
              width={210}
              dialogTitle={"Group"}
              fetchDataFn = {getContactGroup}
              defaultValue={{id: entityData.contactGroup_id, name: entityData.contactGroup} as optionsDataT}
              onChange={(e, val, s) => setSelectValues({...selectValues, "contactGroup": val})}
              renderForm={(fnDialogOpen, fnDialogValue, data?) => 
                <ContactGroupForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              }
            />
            <SelectMasterWrapper
              name={"area"}
              id={"area"}
              label={"Area"}
              width={210}
              dialogTitle={"Area"}
              fetchDataFn = {getArea}
              defaultValue={{id: entityData.area_id, name: entityData.area} as optionsDataT}
              onChange={(e, val, s) => setSelectValues({...selectValues, "area": val})}
              renderForm={(fnDialogOpen, fnDialogValue, data?) => 
                <AreaForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              }
            />
            <SelectMasterWrapper
              name={"organisation"}
              id={"organisation"}
              label={"Organisation"}
              width={210}
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, organisation: val })
              }
              dialogTitle={"Organisation"}
              fetchDataFn = {getOrganisation}
              defaultValue={{id: entityData.organisation_id, name: entityData.organisation} as optionsDataT}
              renderForm={(fnDialogOpen, fnDialogValue, data) => 
                <OrganisationForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              }
            />
            <SelectMasterWrapper
              name={"department"}
              id={"department"}
              label={"Department"}
              width={210}
              dialogTitle={"Department"}
              defaultValue={{id: entityData.department_id, name: entityData.department} as optionsDataT}
              onChange={(e, val, s) => setSelectValues({...selectValues, "department": val})}
              fetchDataFn = {getDepartment}
              renderForm={(fnDialogOpen, fnDialogValue, data) => 
                <DepartmentForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              }
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
              // defaultCountry="FR"
              error={formError?.whatsapp?.error}
              helperText={formError?.whatsapp?.msg}
              defaultValue={entityData.whatsapp}
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
              error={formError?.address1?.error}
              helperText={formError?.address1?.msg}
              defaultValue={entityData.address1}
              fullWidth
            />
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 2"
              name="address2"
              id="address2"
              error={formError?.address2?.error}
              helperText={formError?.address2?.msg}
              defaultValue={entityData.address2}
              fullWidth
            />
            <InputControl
              inputType={InputType.TEXT}
              label="Address Line 3"
              name="address3"
              id="address3"
              error={formError?.address3?.error}
              helperText={formError?.address3?.msg}
              defaultValue={entityData.address3}
              fullWidth
            />
            <InputControl
              inputType={InputType.TEXT}
              name="city"
              id="city"
              label="City"
              error={formError?.city?.error}
              helperText={formError?.city?.msg}
              defaultValue={entityData.city}
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
              dialogTitle={"country"}
              onChange={(e, val, s) => setSelectValues({...selectValues, "country": val})}
              fetchDataFn = {getCountries}
              defaultValue={{id: entityData.country_id, name: entityData.country} as optionsDataT}
              renderForm={(fnDialogOpen, fnDialogValue, data) => 
                <CountryForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                />
              }
            />
            <SelectMasterWrapper
              name={"state"}
              id={"state"}
              label={"State"}
              width={210}
              onChange={(e, val, s) =>
                setSelectValues({ ...selectValues, state: val })
              }
              dialogTitle={"State"}
              fetchDataFn = {(stateStr: string) => getStates(stateStr, selectValues.country?.name)}
              defaultValue={{id: entityData.state_id, name: entityData.state} as optionsDataT}
              renderForm={(fnDialogOpen, fnDialogValue, data) => 
                <StateForm
                  setDialogOpen={fnDialogOpen}
                  setDialogValue={fnDialogValue}
                  data={data}
                  parentData={selectValues.country?.id}
                />
              }
            />

            <InputControl
              inputType={InputType.TEXT}
              name="pincode"
              id="pincode"
              label="Pin Code"
              error={formError?.pincode?.error}
              helperText={formError?.pincode?.msg}
              defaultValue={entityData.pincode}
            />
          </Box>
          <Box sx={{
            mt:3,
            display: 'grid',
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}>
            <Button>Upload File</Button>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={()=>setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        />
      </Box>
    </>
  );
}
