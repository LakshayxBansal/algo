"use client";

import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { updateEnquirySupportConfig } from "../../../controllers/enquirySupportConfig.controller";
import { enquiryConfigSchemaT, regionalSettingSchemaT, selectKeyValueT } from "@/app/models/models";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxForm from "./checkBoxForm";
import Dynamic from "./genericDynamicForm";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import RegionalInfo from "../regional/regionalInfoForm";

type configT = {
  regionalData: {
    id: number,
    object_id: number,
    enabled: number,
    config: regionalSettingSchemaT
  }
} & enquiryConfigSchemaT;

export default function EnquiryConfigForm(props: configT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const regionalData = props.regionalData;
  const [entityData, setEntityData] = useState(props.regionalData.config);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});


  const [enquiry, setEnquiry] = useState({
      checkBoxData: [
    { id: "enquiryCloseCall",name: "enquiryCloseCall",custLabel: "Can Close Call at the time of Call Receipt",checked: props.enquiryCloseCall as boolean ?? false, group: "enquiryCloseCall", disable: props.enquiryReqd},
    { id: "enquiryMaintainProducts",name: "enquiryMaintainProducts",custLabel: "Maintain Products in Call Receipt",checked: props.enquiryMaintainProducts as boolean ?? false ,group: "enquiryMaintainProducts", disable: props.enquiryReqd},
    { id: "enquirySaveFAQ",name: "enquirySaveFAQ",custLabel: "Ask to Save FAQ on Call Receipt and Report Saving",checked: props.enquirySaveFAQ as boolean ?? false, group: "enquirySaveFAQ", disable: props.enquiryReqd}, 
    { id: "enquiryMaintainAction",name: "enquiryMaintainAction",custLabel: "Maintain Action Taken for Call Receipt" ,checked: props.enquiryMaintainAction as boolean ?? false, group: "enquiryMaintainAction", disable: props.enquiryReqd},
    { id: "enquiryVoucherNumber",name: "enquiryVoucherNumber",custLabel: "Do you want to keep Voucher Number?" ,checked: props.enquiryVoucherNumber as boolean ?? false, group: "enquiryVoucherNumber", disable: props.enquiryReqd}
    ], 
    enquiryPrefix: {id: "enquiryPrefix", name: "enquiryPrefix", value: "" },
    enquirySuffix: {id: "enquirySuffix", name: "enquirySuffix", value: "" },
    enquiryLength: {id: "enquiryLength", name: "enquiryLength", value: "" },
    enquiryPrefillWithZero: {id: "enquiryPrefillWithZero", name: "enquiryPrefillWithZero", value: false },
    checked : props.enquiryReqd,
    } )
  const [support, setSupport] = useState({
    checkBoxData: [
    { id: "supportCloseCall",name: "supportCloseCall",custLabel: "Can Close Call at the time of Call Receipt",checked: props.supportCloseCall as boolean ?? false, group: "supportCloseCall", disable: props.supportReqd},
    { id: "supportMaintainProducts",name: "supportMaintainProducts",custLabel: "Maintain Products in Call Receipt",checked: props.supportMaintainProducts as boolean ?? false,group: "supportMaintainProducts", disable: props.supportReqd},
    { id: "supportSaveFAQ",name: "supportSaveFAQ",custLabel: "Ask to Save FAQ on Call Receipt and Report Saving",checked: props.supportSaveFAQ as boolean ?? false, group: "supportSaveFAQ", disable: props.supportReqd}, 
    { id: "supportMaintainAction",name: "supportMaintainAction",custLabel: "Maintain Action Taken for Call Receipt" ,checked: props.supportMaintainAction as boolean ?? false, group: "supportMaintainAction", disable: props.supportReqd},
    { id: "supportVoucherNumber",name: "supportVoucherNumber",custLabel: "Do you want to keep Voucher Number?" ,checked: props.supportVoucherNumber as boolean ?? false, group: "supportVoucherNumber", disable: props.supportReqd}
  ], 
  supportPrefix: {id: "supportPrefix", name: "supportPrefix", value: "" },
  supportSuffix: {id: "supportSuffix", name: "supportSuffix", value: "" },
  supportLength: {id: "supportLength", name: "supportLength", value: "" },
  supportPrefillWithZero: {id: "supportPrefillWithZero", name: "supportPrefillWithZero", value: false },
  checked : props.supportReqd,
  })
  const [contract, setContract] = useState({
    checkBoxData: [
     { id: "contractVoucherNumber",name: "contractVoucherNumber",custLabel: "Do you want to keep Voucher Number?" ,checked: props.contractVoucherNumber as boolean ?? false, group: "contractVoucherNumber", disable: props.contractReqd}
  ], 
  contractPrefix: {id: "contractPrefix", name: "contractPrefix", value: "" },
  contractSuffix: {id: "contractSuffix", name: "contractSuffix", value: "" },
  contractLength: {id: "contractLength", name: "contractLength", value: "" },
  contractPrefillWithZero: {id: "contractPrefillWithZero", name: "contractPrefillWithZero", value: false },
  checked : props.contractReqd,
  })
  const [enquiryGeneration, setEnquiryGeneration] = useState({
    checkBoxData: [
    { id: "enquiryGenerationVoucherNumber",name: "enquiryGenerationVoucherNumber",custLabel: "Do you want to keep Voucher Number?" ,checked: props.enquiryGenerationVoucherNumber as boolean ?? false, group: "enquiryGenerationVoucherNumber", disable: props.enquiryGenerationReqd}
 ], 
 enquiryGenerationPrefix: {id: "enquiryGenerationPrefix", name: "enquiryGenerationPrefix", value: "" },
 enquiryGenerationSuffix: {id: "enquiryGenerationSuffix", name: "enquiryGenerationSuffix", value: "" },
 enquiryGenerationLength: {id: "enquiryGenerationLength", name: "enquiryGenerationLength", value: "" },
 enquiryGenerationPrefillWithZero: {id: "enquiryGenerationPrefillWithZero", name: "enquiryGenerationPrefillWithZero", value: false },
 checked : props.enquiryGenerationReqd,
 })
 const [app, setApp] = useState({
  checkBoxData: [
  { id: "appVoucherNumber",name: "appVoucherNumber",custLabel: "Do you want to keep Voucher Number?" ,checked: props.appVoucherNumber as boolean ?? false, group: "appVoucherNumber", disable: props.appReqd}
], 

appPrefix: {id: "appPrefix", name: "appPrefix", value: "" },
appSuffix: {id: "appSuffix", name: "appSuffix", value: "" },
appLength: {id: "appLength", name: "appLength", value: "" },
appPrefillWithZero: {id: "appPrefillWithZero", name: "appPrefillWithZero", value: false },
checked : props.appReqd,
})
  
const handleEnquiryChange = (name: string, dataType: string, value: any) => {
  if(dataType==="checkBox"){setEnquiry((prev) => ({
    ...prev,
    checkBoxData: prev.checkBoxData.map((field) =>
      field.name === name ? { ...field, checked: value } : field
    ),
  }));
}else{
  console.log("enquiry : ",enquiry);
  setEnquiry(prev=>({
    ...prev, [name]: {id:name, name:name, value: value}

  }))
}
};
const handleSupportChange = (name: string, dataType: string, value: any) => {
  if(dataType==="checkBox"){setSupport((prev) => ({
    ...prev,
    checkBoxData: prev.checkBoxData.map((field) =>
      field.name === name ? { ...field, checked: value } : field
    ),
  }));}else{
    setSupport(prev=>({
      ...prev, [name]: {id:name, name:name, value: value}
    }))
  }
};
const handleContractChange = (name: string, dataType: string, value: any) => {
  if(dataType==="checkBox"){setContract((prev) => ({
    ...prev,
    checkBoxData: prev.checkBoxData.map((field) =>
      field.name === name ? { ...field, checked: value } : field
    ),
  }));}else{
    setContract(prev=>({
      ...prev, [name]: {id:name, name:name, value: value}
    }))
  }
};
const handleEnquiryGenerationChange = (name: string, dataType: string, value: any) => {
  if(dataType==="checkBox"){setEnquiryGeneration((prev) => ({
    ...prev,
    checkBoxData: prev.checkBoxData.map((field) =>
      field.name === name ? { ...field, checked: value } : field
    ),
  }));}else{
    setEnquiryGeneration(prev=>({
      ...prev, [name]: {id:name, name:name, value: value}
    }))
  }
};
const handleAppChange = (name: string, dataType: string, value: any) => {
  if(dataType==="checkBox"){setApp((prev) => ({
    ...prev,
    checkBoxData: prev.checkBoxData.map((field) =>
      field.name === name ? { ...field, checked: value } : field
    ),
  }));}else{
    setEnquiry(prev=>({
      ...prev, [name]: {id:name, name:name, value: value}

    }))
  }
};

const handleSubmit = async (formData: FormData) => {
  console.log("formData : ",formData);
  let data: { [key: string]: any } = {};
  
  
  for (const [key, value] of formData.entries()) {
    data[key] = value === "on" ? true : value;
  }
  console.log("data : ",data);
  const updatePrefixSuffixData = (prefix: any, data: any) => {
    return {
      [`${prefix}Prefix`]: data[`${prefix}Prefix`].value,
      [`${prefix}Suffix`]: data[`${prefix}Suffix`].value,
      [`${prefix}Length`]: data[`${prefix}Length`].value,
      [`${prefix}PrefillWithZero`]: data[`${prefix}PrefillWithZero`].value,
    };
  };
  
  Object.assign(data, 
    updatePrefixSuffixData('enquiry', enquiry),
    updatePrefixSuffixData('support', support),
    updatePrefixSuffixData('contract', contract),
    updatePrefixSuffixData('enquiryGeneration', enquiryGeneration),
    updatePrefixSuffixData('app', app)
  );
  data = updateFormData(data as enquiryConfigSchemaT);
  console.log(data);
  
  const result = await persistEntity(data as enquiryConfigSchemaT);

  if (result.status) {
    setSnackOpen(true);
    setFormError({});
  } else {
    const issues = result.data;
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

const updateFormData = (data: enquiryConfigSchemaT) => {
  data.country_id = entityData.country_id
    ? entityData.country_id
    : selectValues.country
    ? selectValues.country.id
    : 0;
  data.state_id = entityData.state_id
    ? entityData.state_id
    : selectValues.state
    ? selectValues.state.id
    : 0;

  return data;
};

async function persistEntity(data: enquiryConfigSchemaT) {
  let result;
  console.log("Data at client", data);
  
  result = await updateEnquirySupportConfig(data);
  return result;
} 

const handleCancel = () => {
};

// const fetchRegionalData = async () =>{
//   const data = (await getRegionalSetting())[0];
//   data["config"] = JSON.parse(data["config"]);
//   setRegionalData(data["config"]);
// }

  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
        >
          <div>
           <Accordion>
           <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <InputControl
                inputType={InputType.CHECKBOX}
                id="enquiryReqd"
                name="enquiryReqd"
                custLabel="Enquiry Management"
                checked={enquiry.checked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;
                  // console.log("checked : ", isChecked)
                  setEnquiry((prev) => ({
                    ...prev,
                    checked: isChecked,
                    checkBoxData: prev.checkBoxData.map((field) => ({
                      ...field,
                      disable: isChecked,
                      checked: isChecked
                    }))
                  }));
                }}
              />
              </AccordionSummary>
            <AccordionDetails>
              <CheckBoxForm fields={enquiry.checkBoxData} type="checkBox" onChange={handleEnquiryChange}/>
              {
               (enquiry.checkBoxData[enquiry.checkBoxData.length-1].checked)&&
                <Dynamic prefix={enquiry.enquiryPrefix} suffix={enquiry.enquirySuffix} length={enquiry.enquiryLength} prefillWithZero={enquiry.enquiryPrefillWithZero} onChange={handleEnquiryChange}/>
              }
            </AccordionDetails>
           </Accordion>
           <Accordion>
           <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
              <InputControl
                inputType={InputType.CHECKBOX}
                id="supportReqd"
                name="supportReqd"
                custLabel="Support Management"
                checked={support.checked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;
                  setSupport((prev) => ({
                    ...prev,
                    checked: isChecked,
                    checkBoxData: prev.checkBoxData.map((field) => ({
                      ...field,
                      disable: isChecked,
                      checked: isChecked
                    }))
                  }));
                }}
              />
              </AccordionSummary>
            <AccordionDetails>
              <CheckBoxForm fields={support.checkBoxData} type="checkBox" onChange={handleSupportChange}/>
              {
               (support.checkBoxData[support.checkBoxData.length-1].checked)&&
                <Dynamic prefix={support.supportPrefix} suffix={support.supportSuffix} length={support.supportLength} prefillWithZero={support.supportPrefillWithZero} onChange={handleSupportChange}/>
              }
            </AccordionDetails>
           </Accordion>
           <Accordion>
           <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
              <InputControl
                inputType={InputType.CHECKBOX}
                id="contractReqd"
                name="contractReqd"
                custLabel="Contract Management"
                checked={contract.checked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;
                  setContract((prev) => ({
                    ...prev,
                    checked: isChecked,
                    checkBoxData: prev.checkBoxData.map((field) => ({
                      ...field,
                      disable: isChecked,
                      checked: isChecked
                    }))
                  }));
                }}
              />
              </AccordionSummary>
            <AccordionDetails>
              <CheckBoxForm fields={contract.checkBoxData} type="checkBox" onChange={handleContractChange}/>
              {
               (contract.checkBoxData[contract.checkBoxData.length-1].checked)&&
                <Dynamic prefix={contract.contractPrefix} suffix={contract.contractSuffix} length={contract.contractLength} prefillWithZero={contract.contractPrefillWithZero} onChange={handleContractChange}/>
              }
            </AccordionDetails>
           </Accordion>
           <Accordion>
           <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
              <InputControl
                inputType={InputType.CHECKBOX}
                id="enquiryGenerationctReqd"
                name="enquiryGenerationReqd"
                custLabel="Enquiry Generation"
                checked={enquiryGeneration.checked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;
                  setEnquiryGeneration((prev) => ({
                    ...prev,
                    checked: isChecked,
                    checkBoxData: prev.checkBoxData.map((field) => ({
                      ...field,
                      disable: isChecked,
                      checked: isChecked
                    }))
                  }));
                }}
              />
              </AccordionSummary>
            <AccordionDetails>
              <CheckBoxForm fields={enquiryGeneration.checkBoxData} type="checkBox" onChange={handleEnquiryGenerationChange}/>
              {
               (enquiryGeneration.checkBoxData[enquiryGeneration.checkBoxData.length-1].checked)&&
                <Dynamic prefix={enquiryGeneration.enquiryGenerationPrefix} suffix={enquiryGeneration.enquiryGenerationSuffix} length={enquiryGeneration.enquiryGenerationLength} prefillWithZero={enquiryGeneration.enquiryGenerationPrefillWithZero} onChange={handleEnquiryGenerationChange}/>
              }
            </AccordionDetails>
           </Accordion>
           <Accordion>
           <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <InputControl
                inputType={InputType.CHECKBOX}
                id="appReqd"
                name="appReqd"
                custLabel="Regional Settings"
                checked={app.checked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;
                  setApp((prev) => ({
                    ...prev,
                    checked: isChecked,
                    checkBoxData: prev.checkBoxData.map((field) => ({
                      ...field,
                      disable: isChecked,
                      checked: isChecked
                    }))
                  }));
                }}
              />
              </AccordionSummary>
            <AccordionDetails>
            <RegionalInfo data={regionalData} selectValues={selectValues} setSelectValues={setSelectValues} entityData={entityData} setEntityData={setEntityData}/>
              <CheckBoxForm fields={app.checkBoxData} type="checkBox" onChange={handleAppChange}/>
              {
               (app.checkBoxData[app.checkBoxData.length-1].checked)&&
                <Dynamic prefix={app.appPrefix} suffix={app.appSuffix} length={app.appLength} prefillWithZero={app.appPrefillWithZero} onChange={handleAppChange}/>
              }
            </AccordionDetails>
           </Accordion>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              columnGap: 2,
            }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={() => setSnackOpen(false)}
          message={"Configuration saved successfully!"}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}