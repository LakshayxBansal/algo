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
import CustomField from "@/app/cap/enquiry/CustomFields";
import { usePathname } from "next/navigation";

export default function ExecutiveForm(props: masterFormPropsWithDataT<executiveSchemaT>) {
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [docData, setDocData] = React.useState<docDescriptionSchemaT[]>(
    // props?.data ? props?.data?.docData : []
    props.data?.docData ? props?.data?.docData : []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const entityData: executiveSchemaT = props.data ? props.data : {} as executiveSchemaT;
  const pathName = usePathname();
  const [whatsappFn, setWhatsappFn] = useState(entityData.whatsapp?.length === 0 ? '+91' : entityData.whatsapp);
  const [formKey, setFormKey] = useState(0);

  const handleWhatsappChange = (val: string) => {
    setWhatsappFn(val);
  };

  let fieldArr: React.ReactElement[] = [];


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
  const [stateDisable, setStateDisable] = useState<boolean>(!entityData.country);
  const [roleDisable, setRoleDisable] = useState<boolean>(!entityData.executive_dept);

  const defaultComponentMap = new Map<string, React.ReactNode>([
    [
      "name",
      <InputControl
        key='name'
        inputType={InputType.TEXT}
        autoFocus
        id="name"
        label="Name"
        name="name"
        required
        fullWidth
        error={formError?.name?.error}
        helperText={formError?.name?.msg}
 setFormError={setFormError}
        defaultValue={entityData.name}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { name, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
    [
      "alias",
      <InputControl
        key='alias'
        inputType={InputType.TEXT}
        id="alias"
        label="Alias"
        name="alias"
        fullWidth
        error={formError?.alias?.error}
        helperText={formError?.alias?.msg}
 setFormError={setFormError}
        defaultValue={entityData.alias}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { alias, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      // fullWidth
      />
    ],
    [
      "area",
      <SelectMasterWrapper
        key='area'
        name={"area"}
        id={"area"}
        label={"Area"}
        dialogTitle={"Area"}
        width={365}
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
    ],
    [
      "executive_dept",
      <SelectMasterWrapper
        key='executive_dept'
        name={"executive_dept"}
        id={"department"}
        label={"Department"}
        required
        dialogTitle={"Department"}
        width={365}
        defaultValue={
          {
            id: entityData.executive_dept_id,
            name: entityData.executive_dept,
          } as optionsDataT
        }
        disabled={(props?.setDialogOpen === undefined && entityData.role_id !== 1) ? true : false}
        onChange={(e, v, s) => onSelectChange(e, v, s, "department")}
        fetchDataFn={getExecutiveDept}
        formError={formError?.executive_dept ?? formError.executive_dept}
 setFormError={setFormError}
        fnFetchDataByID={getDeptById}
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <ExecutiveDeptForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
      />
    ],
    [
      "role",
      <SelectMasterWrapper
        key="role"
        name={"role"}
        id={"role"}
        label={"Role"}
        dialogTitle={"Add Role"}
        width={365}
        fetchDataFn={getExecutiveRole}
        fnFetchDataByID={getExecutiveRoleById}
        defaultValue={defaultRole}
        allowModify={false}
        allowNewAdd={false}
        onChange={(e, v, s) => onSelectChange(e, v, s, "role")}
        required
        disabled={(props?.setDialogOpen === undefined && entityData.role_id !== 1) ? true : false}
        formError={formError?.role ?? formError.role}
 setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ExecutiveRoleForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
      />
    ],
    [
      "group",
      <SelectMasterWrapper
        key='executive_group'
        name={"executive_group"}
        id={"group"}
        label={"Executive Group"}
        dialogTitle={"Executive Group"}
        width={365}
        disabled={(props?.setDialogOpen === undefined && entityData.role_id !== 1) ? true : false}
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
    ],
    [
      "pan",
      <InputControl
        key='pan'
        inputType={InputType.TEXT}
        id="pan"
        label="PAN"
        name="pan"
        fullWidth
        error={formError?.pan?.error}
        helperText={formError?.pan?.msg}
 setFormError={setFormError}
        defaultValue={entityData.pan}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { pan, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      // fullWidth
      />
    ],
    [
      "aadhaar",
      <InputControl
        key='aadhaar'
        inputType={InputType.TEXT}
        id="aadhaar"
        label="AADHAAR"
        name="aadhaar"
        fullWidth
        error={formError?.aadhaar?.error}
        helperText={formError?.aadhaar?.msg}
 setFormError={setFormError}
        defaultValue={entityData.aadhaar}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { aadhaar, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      // fullWidth
      />
    ],
    [
      "crm_user",
      <SelectMasterWrapper
        key="crm_user"
        name={"crm_user"}
        id={"crm_user"}
        label={"Map to App User"}
        dialogTitle={"App User"}
        defaultValue={
          {
            id: entityData.crm_user_id,
            name: entityData.crm_user,
          } as optionsDataT
        }
        width={365}
        onChange={(e, val, s) =>
          setSelectValues({ ...selectValues, crm_user: val ? val : { id: 0, name: "" } })
        }
        fetchDataFn={getApplicationUser}
        formError={formError.crm_user}
        setFormError={setFormError}
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <InviteUserForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          // isExecutive={true}
          />
        )}
      />
    ],
    [
      "email",
      <InputControl
        key="email"
        inputType={InputType.EMAIL}
        id="email"
        label="Email"
        name="email"
        placeholder="Email address"
        fullWidth
        error={formError?.email?.error}
        helperText={formError?.email?.msg}
 setFormError={setFormError}
        defaultValue={entityData.email}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { email, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      // fullWidth
      />
    ],
    [
      "mobile",
      <InputControl
        key="mobile"
        inputType={InputType.PHONE}
        id="mobile"
        label="Phone No"
        name="mobile"
        fullWidth
        error={formError?.mobile?.error}
        helperText={formError?.mobile?.msg}
 setFormError={setFormError}
        defaultValue={entityData.mobile}
        onChange={handleWhatsappChange}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { mobile, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      // fullWidth
      />
    ],
    [
      "whatsapp",
      <InputControl
        key="whatsapp"
        inputType={InputType.PHONE}
        id="whatsapp"
        label="Whatsapp No"
        name="whatsapp"
        // defaultCountry="FR"
        defaultCountry={whatsappFn?.length===0? "": "IN"}
        fullWidth
        error={formError?.whatsapp?.error}
        helperText={formError?.whatsapp?.msg}
 setFormError={setFormError}
        // defaultValue={entityData.whatsapp}
        defaultValue={whatsappFn}
        slotprops={{
          flagButton: {
            tabIndex: -1
          },
        }}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { whatsapp, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      // fullWidth
      />

    ],
    [
      "doj",
      <InputControl
        key="doj"
        inputType={InputType.DATEINPUT}
        id="doj"
        label="Joining Date"
        name="doj"
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
        setFormError={setFormError}
        sx={{ width: "100%" }}
      />
    ],
    [
      "dob",
      <InputControl
        key="dob"
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
        sx={{ width: "100%" }}
        setFormError={setFormError}
      />
    ],
    [
      "doa",
      <InputControl
        key="doa"
        inputType={InputType.DATEINPUT}
        id="doa"
        label="Anniversary Date"
        name="doa"
        // defaultValue={entityData.doa}
        defaultValue={entityData.doa ? dayjs(entityData.doa) : null}
        fullWidth
        slotProps={{
          textField: {
            error: formError?.doa?.error,
            helperText: formError?.doa?.msg,
          },
          openPickerButton: {
            tabIndex: -1,
          }
        }}
        setFormError={setFormError}
        sx={{ width: "100%" }}
      />
    ],
    [
      "address1",
      <InputControl
        key='address1'
        inputType={InputType.TEXT}
        label="Address Line 1"
        name="address1"
        id="address1"
        fullWidth
        defaultValue={entityData.address1}
        error={formError?.address1?.error}
        helperText={formError?.address1?.msg}
 setFormError={setFormError}
      // fullWidth
      />
    ],
    [
      "address2",
      <InputControl
        key="address2"
        inputType={InputType.TEXT}
        label="Address Line 2"
        name="address2"
        id="address2"
        fullWidth
        defaultValue={entityData.address2}
        error={formError?.address2?.error}
        helperText={formError?.address2?.msg}
        setFormError={setFormError}
      // fullWidth
      />
    ],
    ["city",
      <InputControl
        key="city"
        inputType={InputType.TEXT}
        name="city"
        id="city"
        label="City"
        fullWidth
        defaultValue={entityData.city}
        error={formError?.city?.error}
        helperText={formError?.city?.msg}
 setFormError={setFormError}
      />
    ],
    [
      "country",
      <SelectMasterWrapper
        key="country"
        name={"country"}
        id={"country"}
        label={"Country"}
        dialogTitle={"Country"}
        width={365}
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
    ],
    [
      "state",
      <SelectMasterWrapper
        key={stateKey}
        name={"state"}
        id={"state"}
        label={"State"}
        dialogTitle={"State"}
        width={365}
        defaultValue={defaultState}
        allowModify={!stateDisable}
        allowNewAdd={!stateDisable}
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
    ],
    [
      "pincode",
      <InputControl
        key="pincode"
        inputType={InputType.TEXT}
        name="pincode"
        id="pincode"
        label="Pin Code"
        fullWidth
        defaultValue={entityData.pincode}
        error={formError?.pincode?.error}
        helperText={formError?.pincode?.msg}
 setFormError={setFormError}
      // onKeyDown={() => {
      //   setFormError((curr) => {
      //     const { pincode, ...rest } = curr;
      //     return rest;
      //   });
      // }}
      />
    ],
  ]);

  async function getApplicationUser(searchStr: string) {
    const mappedUser = { id: entityData.crm_user_id, name: entityData.crm_user };
    let dbResult = await getBizAppUser(searchStr, mappedUser, true, true, false, false);
    return dbResult;
  }

  const handleSubmit = async (formData: FormData) => {

    try {
      let data: { [key: string]: any } = {}; // Initialize an empty object

      formData.append("call_type", "Enquiry");

      for (let i = 1; i <= 10; ++i) {
        data[`c_col${i}`] = "";
      }

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
        // setTimeout(() => {
        //   props.setDialogOpen ? props.setDialogOpen(false) : null;
        // }, 1000); 
        if (pathName !== "/cap/admin/lists/executiveList" || entityData.id) {
          setTimeout(() => {
            props.setDialogOpen ? props.setDialogOpen(false) : null;
          }, 1000);
        } else {
          setFormKey(formKey + 1); 
          setWhatsappFn("");
          setDocData([]); 
        }
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
      setStateKey(prev => 1 - prev);
    }
    // if (name === "department") {
    //   values["role"] = {};
    //   setDefaultRole(undefined);
    //   if (values.department.id === 0) setRoleDisable(true);
    //   else setRoleDisable(false);
    //   setRoleKey(prev => 1 - prev);
    // }
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
  props.metaData?.fields.map((field: any) => {
    if (field.column_name_id === "address1" || field.column_name_id === "address2") {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-address-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false
      });
      fieldArr.push(fld);
    }
    else if (field.column_name_id === 'country' || field.column_name_id === 'state' || field.column_name_id === 'city' || field.column_name_id === 'pincode') {
      if (field.column_name_id === 'state') {
        const baseElement = defaultComponentMap.get(
          field.column_name_id
        ) as React.ReactElement;

        const fld = React.cloneElement(baseElement, {
          ...baseElement.props,
          label: field.column_label,
          required: field.is_mandatory === 1,
          key: `field-subAddress-${field.column_name_id}-${stateKey}`,
        });

        fieldArr.push(fld);
      } else {
        const baseElement = defaultComponentMap.get(
          field.column_name_id
        ) as React.ReactElement;

        const fld = React.cloneElement(baseElement, {
          ...baseElement.props,
          label: field.column_label,
          required: field.is_mandatory === 1,
          key: `field-subAddress-${field.column_name_id}`,
          disabled: field.is_disabled === 1 ? true : false
        });

        fieldArr.push(fld);
      }
    }
    else if (field.is_default_column) {
      if(field.column_name_id === 'whatsapp')
        {
          const baseElement = defaultComponentMap.get(
            field.column_name_id
          ) as React.ReactElement;
    
          const fld = React.cloneElement(baseElement, {
            ...baseElement.props,
            label: field.column_label,
            required: field.is_mandatory === 1,
            key: `field-default-${field.column_name_id}-${whatsappFn}`,
            disabled: field.is_disabled === 1 ? true : false,
          });
    
          fieldArr.push(fld);
        } else {
      const baseElement = defaultComponentMap.get(
        field.column_name_id
      ) as React.ReactElement;

      const fld = React.cloneElement(baseElement, {
        ...baseElement.props,
        label: field.column_label,
        required: field.is_mandatory === 1,
        key: `field-default-${field.column_name_id}`,
        disabled: field.is_disabled === 1 ? true : false
      });

      fieldArr.push(fld);
    }
    } else {
      const fld = (
        <CustomField
          key={`field-custom-${field.column_name_id}`}
          desc={field}
          defaultValue={entityData[field.column_name_id as keyof executiveSchemaT]}
        />
      );
      fieldArr.push(fld);
    }
  });

  return (
    <Box>
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
        <form key={formKey} action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            {fieldArr.map((field, index) => {
              const fieldKey = field.key as string;
              if (fieldKey.includes("field-address")) {
                return (
                  <Grid key={fieldKey}
                    item
                    xs={12}
                    sm={6}
                    md={6}

                  >
                    <div key={index}>
                      {field}
                    </div>
                  </Grid>
                )
              }
              else if (fieldKey.includes("field-subAddress")) {
                return (
                  <Grid key={fieldKey}
                    item
                    xs={12}
                    sm={6}
                    md={3}

                  >
                    <div key={index}>
                      {field}
                    </div>
                  </Grid>
                )
              }
              else {
                return (
                  <Grid key={fieldKey}
                    item
                    xs={12}
                    sm={6}
                    md={4}

                  >
                    <div key={index}>
                      {field}
                    </div>
                  </Grid>
                )
              }
            }

            )}
            <Grid xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
                paddingLeft: "2rem"
              }}
            >
                <Tooltip
                  title={docData?.length > 0 ? (
                    docData.map((file: any, index: any) => (
                      <Typography variant="body2" key={index}>
                        {file.description}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="white">
                      No files available
                    </Typography>
                  )}
                >
                  <IconButton
                    sx={{ marginRight: "3rem" }}
                    onClick={() => setDialogOpen(true)}
                    aria-label="file"
                    tabIndex={-1}
                  >
                    <Badge badgeContent={docData?.length} color="primary">
                      <AttachFileIcon></AttachFileIcon>
                    </Badge>
    
                  </IconButton>
                </Tooltip>
              <Button onClick={() => {
                if (props.setDialogOpen === undefined) {
                  router.push('/cap');
                }
                else {
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
            </Grid>
          </Grid>
          {dialogOpen && (
            <AddDialog
              title="Document List"
              open={dialogOpen}
              setDialogOpen={setDialogOpen}
            >
              <DocModal docData={docData} setDocData={setDocData} setDialogOpen={setDialogOpen} />
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