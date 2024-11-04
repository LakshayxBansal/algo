"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Box,
  Paper,
  FormGroup,
  Snackbar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Seperator from "../../../Widgets/seperator";
import { updateEnquirySupportConfig } from "../../../controllers/enquirySupportConfig.controller";
import { enquiryConfigSchemaT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Dynamic from "./genericDynamicForm";

interface EnquiryConfigFormProps {
  props: enquiryConfigSchemaT;
}

const initialVoucherSettings = (parent: string) => ({
  prefix: "",
  suffix: "",
  length: 0,
  prefillWithZero: false,
  parent,
});

const EnquiryConfigForm: React.FC<EnquiryConfigFormProps> = ({ props }) => {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  const initialState: enquiryConfigSchemaT = {
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
    enquiryGenerationReqdVoucherNumber:
      props.enquiryGenerationReqdVoucherNumber ?? false,
    appReqdVoucherNumber: props.appReqdVoucherNumber ?? false,
    generalMaintainArea: props.generalMaintainArea ?? false,
    generalMaintainImage: props.generalMaintainImage ?? false,
    generalShowList: props.generalShowList ?? false,
  };

  const [formState, setFormState] =
    useState<enquiryConfigSchemaT>(initialState);
  const [voucherSettings, setVoucherSettings] = useState<{
    enquiry: ReturnType<typeof initialVoucherSettings>;
    support: ReturnType<typeof initialVoucherSettings>;
    contract: ReturnType<typeof initialVoucherSettings>;
    enquiryGeneration: ReturnType<typeof initialVoucherSettings>;
    app: ReturnType<typeof initialVoucherSettings>;
  }>({
    enquiry: initialVoucherSettings("enquiry"),
    support: initialVoucherSettings("support"),
    contract: initialVoucherSettings("contract"),
    enquiryGeneration: initialVoucherSettings("enquiryGeneration"),
    app: initialVoucherSettings("app"),
  });

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as enquiryConfigSchemaT;
    const result = await updateEnquirySupportConfig(data);

    if (result.status) {
      setSnackOpen(true);
      setFormError({});
    } else {
      const errors = result.data.reduce(
        (acc: Record<string, { msg: string; error: boolean }>, issue: any) => {
          issue.path.forEach((path: string) => {
            acc[path] = { msg: issue.message, error: true };
          });
          return acc;
        },
        {}
      );
      setFormError({
        form: { msg: "Error encountered", error: true },
        ...errors,
      });
    }
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: keyof enquiryConfigSchemaT
  ) => {
    const checked = event.target.checked;
    setFormState((prevState) => {
      const updatedState = { ...prevState, [name]: checked };
      if (name === "enquiryReqd" && !checked) {
        return {
          ...updatedState,
          enquiryCloseCall: false,
          enquiryMaintainItems: false,
          enquirySaveFAQ: false,
          enquiryMaintainAction: false,
        };
      }
      if (name === "supportReqd" && !checked) {
        return {
          ...updatedState,
          supportCloseCall: false,
          supportMaintainItems: false,
          supportSaveFAQ: false,
          supportMaintainAction: false,
        };
      }
      return updatedState;
    });
  };

  const createCheckBox = (
    id: string,
    name: keyof enquiryConfigSchemaT,
    label: string,
    checked: boolean,
    disable: boolean | null
  ) => (
    <InputControl
      inputType={InputType.CHECKBOX}
      id={id}
      name={name}
      custLabel={label}
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleCheckboxChange(e, name)
      }
      disabled={disable}
    />
  );

  const renderVoucherDetails = (
    settings: ReturnType<typeof initialVoucherSettings>,
    parent: keyof typeof voucherSettings
  ) => (
    <Dynamic
      settings={settings}
      setSettings={(newSettings) =>
        setVoucherSettings((prev) => ({ ...prev, [parent]: newSettings }))
      }
      label={`${
        parent.charAt(0).toUpperCase() + parent.slice(1)
      } Voucher Details`}
      parent={parent}
    />
  );

  const handleCancel = () => {
    // Handle cancel action if necessary
  };

  return (
    <Paper>
      <Seperator>Enquiry / Support Configuration</Seperator>
      <Box sx={{ p: 3 }}>
        {formError.form?.error && (
          <p style={{ color: "red" }}>{formError.form.msg}</p>
        )}
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit(new FormData(e.currentTarget));
          }}
        >
          <div>
            {["enquiry", "support", "contract", "enquiryGeneration", "app"].map(
              (parent) => (
                <Accordion key={parent}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${parent}-content`}
                    id={`${parent}-header`}
                  >
                    {createCheckBox(
                      `${parent}Reqd`,
                      `${parent}Reqd` as keyof enquiryConfigSchemaT,
                      `${
                        parent.charAt(0).toUpperCase() + parent.slice(1)
                      } Management`,
                      formState[`${parent}Reqd` as keyof enquiryConfigSchemaT],
                      false
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {[
                        "CloseCall",
                        "MaintainItems",
                        "SaveFAQ",
                        "MaintainAction",
                        "VoucherNumber",
                      ].map((option) =>
                        createCheckBox(
                          `${parent}${option}`,
                          `${parent}${option}` as keyof enquiryConfigSchemaT,
                          `Can ${option
                            .replace(/([A-Z])/g, " $1")
                            .trim()} at the time of Call Receipt`,
                          formState[
                            `${parent}${option}` as keyof enquiryConfigSchemaT
                          ],
                          !formState[
                            `${parent}Reqd` as keyof enquiryConfigSchemaT
                          ]
                        )
                      )}
                      {formState[
                        `${parent}VoucherNumber` as keyof enquiryConfigSchemaT
                      ] &&
                        renderVoucherDetails(
                          voucherSettings[
                            parent as keyof typeof voucherSettings
                          ],
                          parent as keyof typeof voucherSettings
                        )}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              )
            )}
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
          message="Configuration saved successfully!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
};

export default EnquiryConfigForm;
