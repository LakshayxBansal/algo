"use client";

import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Snackbar from "@mui/material/Snackbar";
import { updateEnquirySupportConfig } from "../../../controllers/enquirySupportConfig.controller";
import { enquirySupportConfig } from "../../../zodschema/zodschema";
import { enquiryConfigSchemaT } from "@/app/models/models"; // Ensure this import matches your actual model
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dynamic from "./form"; 

// Configuration map for different object types
const configMap = {
  enquiry: [
    { name: "enquiryCloseCall", label: "Can Close Call at the time of Call Receipt" },
    { name: "enquiryMaintainItems", label: "Maintain Items in Call Receipt" },
    { name: "enquirySaveFAQ", label: "Ask to Save FAQ on Call Receipt and Report Saving" },
    { name: "enquiryMaintainAction", label: "Maintain Action Taken for Call Receipt" },
    { name: "enquiryVoucherNumber", label: "Do you want to keep Voucher Number?" },
  ],
  support: [
    { name: "supportCloseCall", label: "Can Close Call at the time of Call Receipt" },
    { name: "supportMaintainItems", label: "Maintain Items in Call Receipt" },
    { name: "supportSaveFAQ", label: "Ask to Save FAQ on Call Receipt and Report Saving" },
    { name: "supportMaintainAction", label: "Maintain Action Taken for Call Receipt" },
    { name: "supportVoucherNumber", label: "Do you want to keep Voucher Number?" },
  ],
  contract: [
    { name: "contractReqdVoucherNumber", label: "Do you want to keep Voucher Number?" },
  ],
  app: [
    { name: "appReqdVoucherNumber", label: "Do you want to keep Voucher Number?" },
  ],
};

export default function EnquiryConfigForm(props: enquiryConfigSchemaT) {
  const [formError, setFormError] = useState<Record<string, { msg: string; error: boolean }> >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [dynamicData, setDynamicData] = useState<{ [key: string]: string }>({
    enquiry: "{}",
    support: "{}",
    contract: "{}",
    app: "{}",
  });

  const [formState, setFormState] = useState<enquiryConfigSchemaT>({
    enquiryReqd: props.enquiryReqd ?? false,
    supportReqd: props.supportReqd ?? false,
    contractReqd: props.contractReqd ?? false,
    enquiryGenerationReqd: props.enquiryGenerationReqd ?? false,
    appReqd: props.appReqd ?? false,

    enquiryCloseCall: props.enquiryCloseCall ?? false,
    enquiryMaintainItems: props.enquiryMaintainItems ?? false,
    enquirySaveFAQ: props.enquirySaveFAQ ?? false,
    enquiryMaintainAction: props.enquiryMaintainAction ?? false,
    enquiryVoucherNumber: props.enquiryVoucherNumber ?? false,

    supportCloseCall: props.supportCloseCall ?? false,
    supportMaintainItems: props.supportMaintainItems ?? false,
    supportSaveFAQ: props.supportSaveFAQ ?? false,
    supportMaintainAction: props.supportMaintainAction ?? false,
    supportVoucherNumber: props.supportVoucherNumber ?? false,

    contractReqdVoucherNumber: props.contractReqdVoucherNumber ?? false,
    enquiryGenerationReqdVoucherNumber: props.enquiryGenerationReqdVoucherNumber ?? false,
    appReqdVoucherNumber: props.appReqdVoucherNumber ?? false,

    generalMaintainArea: props.generalMaintainArea ?? false,
    generalMaintainImage: props.generalMaintainImage ?? false,
    generalShowList: props.generalShowList ?? false,
  });

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value === "on" ? true : value;
    }

    data.enquiryOptions = dynamicData.enquiry;
    data.supportOptions = dynamicData.support;
    data.contractOptions = dynamicData.contract;
    data.appOptions = dynamicData.app;

    const parsed = enquirySupportConfig.safeParse(data);

    if (!parsed.success) {
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      parsed.error.errors.forEach((issue) => {
        issue.path.forEach((path) => {
          errorState[path] = { msg: issue.message, error: true };
        });
      });
      errorState["form"] = { msg: "Validation failed", error: true };
      setFormError(errorState);
      return;
    }

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
    let result = await updateEnquirySupportConfig(data);
    return result;
  }

  const handleCancel = () => {
    // Handle cancel action if necessary
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const dynamicKey = `${name}VoucherNumber` as keyof typeof formState;
    setFormState((prevState) => ({
      ...prevState,
      [dynamicKey]: event.target.checked,
    }));
  };

  const createCheckBoxes = (type: keyof typeof configMap) => {
    return configMap[type].map(({ name, label }) => (
      <InputControl
        inputType={InputType.CHECKBOX}
        key={name}
        id={name}
        name={name}
        custLabel={label}
        checked={formState[name] as boolean}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleCheckboxChange(e, name)
        }
        disabled={type === "contract" && !formState.contractReqd}
      />
    ));
  };

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
          {Object.keys(configMap).map((type) => (
            <Accordion key={type}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${type}-content`}
                id={`${type}-header`}
              >
                <InputControl
                  inputType={InputType.CHECKBOX}
                  id={`${type}Reqd`}
                  name={`${type}Reqd`}
                  custLabel={`${type.charAt(0).toUpperCase() + type.slice(1)} Management`}
                  checked={formState[`${type}Reqd`] as boolean}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, `${type}Reqd`)}
                  disabled={false}
                />
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {createCheckBoxes(type as keyof typeof configMap)}
                  {formState[`${type}VoucherNumber`] && (
                    <Dynamic
                      onChange={(data) =>
                        setDynamicData((prev) => ({ ...prev, [type]: data }))
                      }
                    />
                  )}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          ))}
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