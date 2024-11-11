"use client";

import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Snackbar from "@mui/material/Snackbar";
import Seperator from "../../../Widgets/seperator";
import { updateEnquirySupportConfig } from "../../../controllers/configData.controller";
import { enquirySupportConfig } from "../../../zodschema/zodschema";
import { enquiryConfigSchemaT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dynamic from "./prevGenericForm";

// interface EnquiryConfigFormProps {props: enquiryConfigSchemaT}

export default function EnquiryConfigForm(props: enquiryConfigSchemaT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);

  const [formState, setFormState] = useState<enquiryConfigSchemaT>({
    enquiryReqd: props.enquiryReqd ?? false,
    supportReqd: props.supportReqd ?? false,
    contractReqd: props.contractReqd ?? false,
    enquiryGenerationReqd: props.enquiryGenerationReqd ?? false,
    regionalSettingReqd: props.regionalSettingReqd ?? false,

    enquiryCloseCall: props.enquiryCloseCall ?? false,
    enquiryMaintainProducts: props.enquiryMaintainProducts ?? false,
    enquirySaveFAQ: props.enquirySaveFAQ ?? false,
    enquiryMaintainAction: props.enquiryMaintainAction ?? false,
    enquiryVoucherNumber: props.enquiryVoucherNumber ?? false,

    supportCloseCall: props.supportCloseCall ?? false,
    supportMaintainProducts: props.supportMaintainProducts ?? false,
    supportSaveFAQ: props.supportSaveFAQ ?? false,
    supportMaintainAction: props.supportMaintainAction ?? false,
    supportVoucherNumber: props.supportVoucherNumber ?? false,

    contractVoucherNumber: props.contractVoucherNumber ?? false,

    enquiryGenerationVoucherNumber:
      props.enquiryGenerationVoucherNumber ?? false,

    regionalSettingVoucherNumber: props.regionalSettingVoucherNumber ?? false,

    generalMaintainArea: props.generalMaintainArea ?? false,
    generalMaintainImage: props.generalMaintainImage ?? false,
    generalShowList: props.generalShowList ?? false,
  });

  const [enquiryVoucherSettings, setEnquiryVoucherSettings] = useState({
    prefix: "",
    suffix: "",
    length: 0,
    prefillWithZero: false,
    parent: "enquiry",
  });

  const [supportVoucherSettings, setSupportVoucherSettings] = useState({
    prefix: "",
    suffix: "",
    length: 0,
    prefillWithZero: false,
    parent: "support",
  });

  const [contractVoucherSettings, setContractVoucherSettings] = useState({
    prefix: "",
    suffix: "",
    length: 0,
    prefillWithZero: false,
    parent: "contract",
  });

  const [
    enquiryGenerationVoucherSettings,
    setEnquiryGenerationVoucherSettings,
  ] = useState({
    prefix: "",
    suffix: "",
    length: 0,
    prefillWithZero: false,
    parent: "enquiryGeneration",
  });

  const [appVoucherSettings, setappVoucherSettings] = useState({
    prefix: "",
    suffix: "",
    length: 0,
    prefillWithZero: false,
    parent: "app",
  });

  const handleSubmit = async (formData: FormData) => {
    console.log("formData : ", formData);
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value === "on" ? true : value;
    }
    console.log("data : ", data);
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

  async function persistEntity(data: enquiryConfigSchemaT) {
    let result;
    result = await updateEnquirySupportConfig(data);
    return result;
  }

  const handleCancel = () => {
    // Handle cancel action if necessary
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof enquiryConfigSchemaT
  ) => {
    if (name === "enquiryReqd" || name === "supportReqd") {
      const checked = event.target.checked;

      setFormState((prevState) => {
        let updatedState = { ...prevState, [name]: checked };

        if (!checked) {
          if (name === "enquiryReqd") {
            updatedState = {
              ...updatedState,
              enquiryCloseCall: false,
              enquiryMaintainProducts: false,
              enquirySaveFAQ: false,
              enquiryMaintainAction: false,
            };
          } else if (name === "supportReqd") {
            updatedState = {
              ...updatedState,
              supportCloseCall: false,
              supportMaintainProducts: false,
              supportSaveFAQ: false,
              supportMaintainAction: false,
            };
          }
          // else if (name === "contractReqd") {
          //   updatedState = {
          //     ...updatedState,
          //     supportCloseCall: false,
          //     supportMaintainProducts: false,
          //     supportSaveFAQ: false,
          //     supportMaintainAction: false,
          //   };
          // } else if (name === "supportReqd") {
          //   updatedState = {
          //     ...updatedState,
          //     supportCloseCall: false,
          //     supportMaintainProducts: false,
          //     supportSaveFAQ: false,
          //     supportMaintainAction: false,
          //   };
          // } else if (name === "supportReqd") {
          //   updatedState = {
          //     ...updatedState,
          //     supportCloseCall: false,
          //     supportMaintainProducts: false,
          //     supportSaveFAQ: false,
          //     supportMaintainAction: false,
          //   };
          // }
        }

        return updatedState;
      });
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: event.target.checked,
      }));
    }
  };

  function createCheckBox(
    id: string,
    name: string,
    custLabel: string,
    checked: boolean,
    group: keyof enquiryConfigSchemaT,
    disable: boolean | null
  ) {
    return (
      <InputControl
        inputType={InputType.CHECKBOX}
        id={id}
        name={name}
        custLabel={custLabel}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleCheckboxChange(e, group)
        }
        disabled={disable}
        error={formError?.enquiryMaintainProducts?.error}
        helperText={formError?.enquiryMaintainProducts?.msg}
      />
    );
  }

  return (
    <Paper>
      {/* <Seperator>Enquiry / Support Configuration </Seperator> */}
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
                {createCheckBox(
                  "enquiryReqd",
                  "enquiryReqd",
                  "Enquiry Management (Pre Sales)",
                  formState.enquiryReqd as boolean,
                  "enquiryReqd",
                  false
                )}
              </AccordionSummary>
              <AccordionDetails>
                <legend>Enquiry Management Options</legend>
                <FormGroup>
                  {createCheckBox(
                    "enquiryCloseCall",
                    "enquiryCloseCall",
                    "Can Close Call at the time of Call Receipt",
                    formState.enquiryCloseCall as boolean,
                    "enquiryCloseCall",
                    !formState.enquiryReqd
                  )}
                  {createCheckBox(
                    "enquiryMaintainProducts",
                    "enquiryMaintainProducts",
                    "Maintain Products in Call Receipt",
                    formState.enquiryMaintainProducts as boolean,
                    "enquiryMaintainProducts",
                    !formState.enquiryReqd
                  )}
                  {createCheckBox(
                    "enquirySaveFAQ",
                    "enquirySaveFAQ",
                    "Ask to Save FAQ on Call Receipt and Report Saving",
                    formState.enquirySaveFAQ as boolean,
                    "enquirySaveFAQ",
                    !formState.enquiryReqd
                  )}
                  {createCheckBox(
                    "enquiryMaintainAction",
                    "enquiryMaintainAction",
                    "Maintain Action Taken for Call Receipt",
                    formState.enquiryMaintainAction as boolean,
                    "enquiryMaintainAction",
                    !formState.enquiryReqd
                  )}
                  {createCheckBox(
                    "enquiryVoucherNumber",
                    "enquiryVoucherNumber",
                    "Do you want to keep Voucher Number?",
                    formState.enquiryVoucherNumber as boolean,
                    "enquiryVoucherNumber",
                    !formState.enquiryReqd
                  )}
                  {/* {formState.enquiryVoucherNumber && (  */}
                  {/* // <Dynamic /> */}
                  {formState.enquiryVoucherNumber && (
                    <Dynamic
                      settings={enquiryVoucherSettings}
                      setSettings={setEnquiryVoucherSettings}
                      label="Enquiry Voucher Details"
                      parent="enquiry"
                    />
                  )}
                  {/* )} */}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                {createCheckBox(
                  "supportReqd",
                  "supportReqd",
                  "Support Management (Post Sales)",
                  formState.supportReqd as boolean,
                  "supportReqd",
                  false
                )}
              </AccordionSummary>
              <AccordionDetails>
                <legend>Support Management Options</legend>
                <FormGroup>
                  {createCheckBox(
                    "supportCloseCall",
                    "supportCloseCall",
                    "Can Close Call at the time of Call Receipt",
                    formState.supportCloseCall as boolean,
                    "supportCloseCall",
                    !formState.supportReqd
                  )}
                  {createCheckBox(
                    "supportMaintainProducts",
                    "supportMaintainProducts",
                    "Maintain Products in Call Receipt",
                    formState.supportMaintainProducts as boolean,
                    "supportMaintainProducts",
                    !formState.supportReqd
                  )}
                  {createCheckBox(
                    "supportSaveFAQ",
                    "supportSaveFAQ",
                    "Ask to Save FAQ on Call Receipt and Report Saving",
                    formState.supportSaveFAQ as boolean,
                    "supportSaveFAQ",
                    !formState.supportReqd
                  )}
                  {createCheckBox(
                    "supportMaintainAction",
                    "supportMaintainAction",
                    "Maintain Action Taken for Call Receipt",
                    formState.supportMaintainAction as boolean,
                    "supportMaintainAction",
                    !formState.supportReqd
                  )}
                  {createCheckBox(
                    "supportMaintainContract",
                    "supportMaintainContract",
                    "Maintain Contracts for Support",
                    formState.supportMaintainContract as boolean,
                    "supportMaintainContract",
                    !formState.supportReqd
                  )}
                  {createCheckBox(
                    "supportVoucherNumber",
                    "supportVoucherNumber",
                    "Do you want to keep Voucher Number?",
                    formState.supportVoucherNumber as boolean,
                    "supportVoucherNumber",
                    !formState.supportReqd
                  )}
                  {formState.supportVoucherNumber && (
                    <Dynamic
                      settings={supportVoucherSettings}
                      setSettings={setSupportVoucherSettings}
                      label="Support Voucher Details"
                      parent="support"
                    />
                  )}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {createCheckBox(
                  "contractReqd",
                  "contractReqd",
                  "Contract Management",
                  formState.contractReqd as boolean,
                  "contractReqd",
                  false
                )}
              </AccordionSummary>
              <AccordionDetails>
                {createCheckBox(
                  "contractReqdVoucherNumber",
                  "contractReqdVoucherNumber",
                  "Do you want to keep Voucher Number?",
                  formState.contractVoucherNumber as boolean,
                  "contractVoucherNumber",
                  !formState.contractReqd
                )}
                {formState.contractVoucherNumber && (
                  <Dynamic
                    settings={contractVoucherSettings}
                    setSettings={setContractVoucherSettings}
                    label="Contract Voucher Details"
                    parent="contract"
                  />
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {createCheckBox(
                  "enquiryGenerationReqd",
                  "enquiryGenerationReqd",
                  "Enquiry Generation",
                  formState.enquiryGenerationReqd as boolean,
                  "enquiryGenerationReqd",
                  false
                )}
              </AccordionSummary>
              <AccordionDetails>
                {createCheckBox(
                  "enquiryGenerationReqdVoucherNumber",
                  "enquiryGenerationReqdVoucherNumber",
                  "Do you want to keep Voucher Number?",
                  formState.enquiryGenerationVoucherNumber as boolean,
                  "enquiryGenerationVoucherNumber",
                  !formState.enquiryGenerationReqd
                )}
                {formState.enquiryGenerationVoucherNumber && (
                  <Dynamic
                    settings={enquiryGenerationVoucherSettings}
                    setSettings={setEnquiryGenerationVoucherSettings}
                    label="Enquiry Generation Voucher Details"
                    parent="enquiryGeneration"
                  />
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {createCheckBox(
                  "regional_settingReqd",
                  "regional_settingReqd",
                  "Regional Setting",
                  formState.regional_settingReqd as boolean,
                  "regional_settingReqd",
                  false
                )}
              </AccordionSummary>
              <AccordionDetails>
                <legend>General Configuration Options</legend>
                <FormGroup
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    columnGap: 3,
                  }}
                >
                  {createCheckBox(
                    "generalMaintainArea",
                    "generalMaintainArea",
                    "Maintain Area / Region in Call Receipt",
                    formState.generalMaintainArea as boolean,
                    "generalMaintainArea",
                    false
                  )}
                  {createCheckBox(
                    "generalMaintainImage",
                    "generalMaintainImage",
                    "Maintain Image Information",
                    formState.generalMaintainImage as boolean,
                    "generalMaintainImage",
                    false
                  )}
                  {createCheckBox(
                    "generalShowList",
                    "generalShowList",
                    "Show List in Call Allocation",
                    formState.generalShowList as boolean,
                    "generalShowList",
                    false
                  )}
                  {createCheckBox(
                    "appReqdVoucherNumber",
                    "appReqdVoucherNumber",
                    "Do you want to keep Voucher Number?",
                    formState.appVoucherNumber as boolean,
                    "appVoucherNumber",
                    !formState.regional_settingReqd
                  )}
                  {formState.appVoucherNumber && (
                    <Dynamic
                      settings={appVoucherSettings}
                      setSettings={setappVoucherSettings}
                      label="App Voucher Details"
                      parent="app"
                    />
                  )}
                </FormGroup>
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
