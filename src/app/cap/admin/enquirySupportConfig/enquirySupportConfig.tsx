"use client";

import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Snackbar from "@mui/material/Snackbar";
import Seperator from "../../../Widgets/seperator";
import { updateEnquirySupportConfig } from "../../../controllers/enquirySupportConfig.controller";
import { enquirySupportConfig } from "../../../zodschema/zodschema";
import { enquiryConfigSchemaT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";

// interface EnquiryConfigFormProps {props: enquiryConfigSchemaT}

export default function EnquiryConfigForm(props: enquiryConfigSchemaT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);

  const [formState, setFormState] = useState<enquiryConfigSchemaT>({
    enquiryReqd: props.enquiryReqd ?? false,
    supportReqd: props.supportReqd ?? false,

    enquiryCloseCall: props.enquiryCloseCall ?? false,
    enquiryMaintainProducts: props.enquiryMaintainProducts ?? false,
    enquirySaveFAQ: props.enquirySaveFAQ ?? false,
    enquiryMaintainAction: props.enquiryMaintainAction ?? false,

    supportCloseCall: props.supportCloseCall ?? false,
    supportMaintainProducts: props.supportMaintainProducts ?? false,
    supportSaveFAQ: props.supportSaveFAQ ?? false,
    supportMaintainAction: props.supportMaintainAction ?? false,

    generalMaintainArea: props.generalMaintainArea ?? false,
    generalMaintainImage: props.generalMaintainImage ?? false,
    generalShowList: props.generalShowList ?? false,
  });

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value === "on" ? true : value;
    }

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
        // error={formError?.enquiryMaintainProducts?.error}
        // helperText={formError?.enquiryMaintainProducts?.msg}
      />
    );
  }

  return (
    <Paper>
      <Seperator>Enquiry / Support Configuration</Seperator>
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
          <Box
            sx={{
              mt: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 3,
            }}
          >
            {createCheckBox(
              "enquiryReqd",
              "enquiryReqd",
              "Enquiry Management (Pre Sales)",
              formState.enquiryReqd as boolean,
              "enquiryReqd",
              false
            )}
            {createCheckBox(
              "supportReqd",
              "supportReqd",
              "Support Management (Post Sales)",
              formState.supportReqd as boolean,
              "supportReqd",
              false
            )}
          </Box>

          <Box
            sx={{
              mt: 1,
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Box
              component={"fieldset"}
              sx={{ border: "1px solid grey", borderRadius: "4px", p: 2 }}
            >
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
              </FormGroup>
            </Box>

            <Box
              component={"fieldset"}
              sx={{ border: "1px solid grey", borderRadius: "4px", p: 2 }}
            >
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
                  "Can Close Call at the time of Call Receipt",
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
              </FormGroup>
            </Box>
          </Box>

          <Box
            component={"fieldset"}
            sx={{ mt: 2, border: "1px solid grey", borderRadius: "4px", p: 2 }}
          >
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
            </FormGroup>
          </Box>

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
        />
      </Box>
    </Paper>
  );
}
