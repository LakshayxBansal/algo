"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { updateConfigData } from "../../../controllers/configData.controller";
import {
  configSchemaT,
  enquiryConfigSchemaT,
  selectKeyValueT,
} from "@/app/models/models";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxForm from "./checkBoxForm";
import Voucher from "./voucherNumberForm";
import RegionalInfo from "../regional/regionalInfoForm";

export default function ConfigForm(props: configSchemaT) {
  const {
    enquiryConfig,
    supportConfig,
    contractConfig,
    enquiryGenerationConfig,
    regionalSettingConfig,
  } = props;

  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [entityData, setEntityData] = useState(props.regionalSettingConfig);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});

  const [config, setConfig] = useState({
    enquiryConfig: {
      enquiry: [
        {
          id: "enquiryReqd",
          name: "enquiryReqd",
          custLabel: "Enquiry Management (Pre Sales)",
          checked: (props.enquiryConfig?.reqd as boolean) ?? false,
          group: "enquiryReqd",
          disable: false,
        },
      ],
      checkBoxData: [
        {
          id: "enquiryCloseCall",
          name: "enquiryCloseCall",
          custLabel: "Can Close Call at the time of Call Receipt",
          checked: (props.enquiryConfig?.closeCall as boolean) ?? false,
          group: "enquiryCloseCall",
          disable: !props.enquiryConfig?.reqd,
        },
        {
          id: "enquiryMaintainProducts",
          name: "enquiryMaintainProducts",
          custLabel: "Maintain Products in Call Receipt",
          checked: (props.enquiryConfig?.maintainProducts as boolean) ?? false,
          group: "enquiryMaintainProducts",
          disable: !props.enquiryConfig?.reqd,
        },
        {
          id: "enquirySaveFAQ",
          name: "enquirySaveFAQ",
          custLabel: "Ask to Save FAQ on Call Receipt and Report Saving",
          checked: (props.enquiryConfig?.saveFAQ as boolean) ?? false,
          group: "enquirySaveFAQ",
          disable: !props.enquiryConfig?.reqd,
        },
        {
          id: "enquiryMaintainAction",
          name: "enquiryMaintainAction",
          custLabel: "Maintain Action Taken for Call Receipt",
          checked: (props.enquiryConfig?.maintainAction as boolean) ?? false,
          group: "enquiryMaintainAction",
          disable: !props.enquiryConfig?.reqd,
        },
        {
          id: "enquiryVoucherNumber",
          name: "enquiryVoucherNumber",
          custLabel: "Do you want to keep Voucher Number?",
          checked: (props.enquiryConfig?.voucherNumber as boolean) ?? false,
          group: "enquiryVoucherNumber",
          disable: !props.enquiryConfig?.reqd,
        },
      ],
      Prefix: {
        id: "enquiryPrefix",
        name: "enquiryPrefix",
        value: props.enquiryConfig?.prefix,
      },
      Suffix: {
        id: "enquirySuffix",
        name: "enquirySuffix",
        value: props.enquiryConfig?.suffix,
      },
      Length: {
        id: "enquiryLength",
        name: "enquiryLength",
        value: props.enquiryConfig?.length,
      },
      PrefillWithZero: {
        id: "enquiryPrefillWithZero",
        name: "enquiryPrefillWithZero",
        value: props.enquiryConfig?.prefillWithZero,
      },
    },
    supportConfig: {
      support: [
        {
          id: "supportReqd",
          name: "supportReqd",
          custLabel: "Support Management (Post Sales)",
          checked: (props.supportConfig?.reqd as boolean) ?? false,
          group: "supportReqd",
          disable: false,
        },
      ],
      checkBoxData: [
        {
          id: "supportCloseCall",
          name: "supportCloseCall",
          custLabel: "Can Close Call at the time of Call Receipt",
          checked: (props.supportConfig?.closeCall as boolean) ?? false,
          group: "supportCloseCall",
          disable: !props.supportConfig?.reqd,
        },
        {
          id: "supportMaintainProducts",
          name: "supportMaintainProducts",
          custLabel: "Maintain Products in Call Receipt",
          checked: (props.supportConfig?.maintainProducts as boolean) ?? false,
          group: "supportMaintainProducts",
          disable: !props.supportConfig?.reqd,
        },
        {
          id: "supportSaveFAQ",
          name: "supportSaveFAQ",
          custLabel: "Ask to Save FAQ on Call Receipt and Report Saving",
          checked: (props.supportConfig?.saveFAQ as boolean) ?? false,
          group: "supportSaveFAQ",
          disable: !props.supportConfig?.reqd,
        },
        {
          id: "supportMaintainAction",
          name: "supportMaintainAction",
          custLabel: "Maintain Action Taken for Call Receipt",
          checked: (props.supportConfig?.maintainAction as boolean) ?? false,
          group: "supportMaintainAction",
          disable: !props.supportConfig?.reqd,
        },
        {
          id: "supportVoucherNumber",
          name: "supportVoucherNumber",
          custLabel: "Do you want to keep Voucher Number?",
          checked: (props.supportConfig?.voucherNumber as boolean) ?? false,
          group: "supportVoucherNumber",
          disable: !props.supportConfig?.reqd,
        },
      ],
      Prefix: {
        id: "supportPrefix",
        name: "supportPrefix",
        value: props.supportConfig?.prefix,
      },
      Suffix: {
        id: "supportSuffix",
        name: "supportSuffix",
        value: props.supportConfig?.suffix,
      },
      Length: {
        id: "supportLength",
        name: "supportLength",
        value: props.supportConfig?.length,
      },
      PrefillWithZero: {
        id: "supportPrefillWithZero",
        name: "supportPrefillWithZero",
        value: props.supportConfig?.prefillWithZero,
      },
    },
    contractConfig: {
      contract: [
        {
          id: "contractReqd",
          name: "contractReqd",
          custLabel: "Contract Management",
          checked: (props.contractConfig?.reqd as boolean) ?? false,
          group: "contractReqd",
          disable: false,
        },
      ],
      checkBoxData: [
        {
          id: "contractVoucherNumber",
          name: "contractVoucherNumber",
          custLabel: "Do you want to keep Voucher Number?",
          checked: (props.contractConfig?.voucherNumber as boolean) ?? false,
          group: "contractVoucherNumber",
          disable: !props.contractConfig?.reqd,
        },
      ],
      Prefix: {
        id: "contractPrefix",
        name: "contractPrefix",
        value: props.contractConfig?.prefix,
      },
      Suffix: {
        id: "contractSuffix",
        name: "contractSuffix",
        value: props.contractConfig?.suffix,
      },
      Length: {
        id: "contractLength",
        name: "contractLength",
        value: props.contractConfig?.length,
      },
      PrefillWithZero: {
        id: "contractPrefillWithZero",
        name: "contractPrefillWithZero",
        value: props.contractConfig?.prefillWithZero,
      },
    },
    enquiryGenerationConfig: {
      enquiryGeneration: [
        {
          id: "enquiryGenerationReqd",
          name: "enquiryGenerationReqd",
          custLabel: "Enquiry Generation",
          checked: (props.enquiryGenerationConfig?.reqd as boolean) ?? false,
          group: "enquiryGenerationReqd",
          disable: false,
        },
      ],
      checkBoxData: [
        {
          id: "enquiryGenerationVoucherNumber",
          name: "enquiryGenerationVoucherNumber",
          custLabel: "Do you want to keep Voucher Number?",
          checked:
            (props.enquiryGenerationConfig?.voucherNumber as boolean) ?? false,
          group: "enquiryGenerationVoucherNumber",
          disable: !props.enquiryGenerationConfig?.reqd,
        },
      ],
      Prefix: {
        id: "enquiryGenerationPrefix",
        name: "enquiryGenerationPrefix",
        value: props.enquiryGenerationConfig?.prefix,
      },
      Suffix: {
        id: "enquiryGenerationSuffix",
        name: "enquiryGenerationSuffix",
        value: props.enquiryGenerationConfig?.suffix,
      },
      Length: {
        id: "enquiryGenerationLength",
        name: "enquiryGenerationLength",
        value: props.enquiryGenerationConfig?.length,
      },
      PrefillWithZero: {
        id: "enquiryGenerationPrefillWithZero",
        name: "enquiryGenerationPrefillWithZero",
        value: props.enquiryGenerationConfig?.prefillWithZero,
      },
    },
    regionalSettingConfig: {
      regionalSetting: [
        {
          id: "regionalSettingReqd",
          name: "regionalSettingReqd",
          custLabel: "Regional Settings",
          checked: (props.regionalSettingConfig?.reqd as boolean) ?? false,
          group: "regionalSettingReqd",
          disable: false,
        },
      ],
      checkBoxData: [
        {
          id: "regionalSettingVoucherNumber",
          name: "regionalSettingVoucherNumber",
          custLabel: "Do you want to keep Voucher Number?",
          checked:
            (props.regionalSettingConfig?.voucherNumber as boolean) ?? false,
          group: "regionalSettingVoucherNumber",
          disable: !props.regionalSettingConfig?.reqd,
        },
      ],
      Prefix: {
        id: "regionalSettingPrefix",
        name: "regionalSettingPrefix",
        value: props.regionalSettingConfig?.prefix ?? "",
      },
      Suffix: {
        id: "regionalSettingSuffix",
        name: "regionalSettingSuffix",
        value: props.regionalSettingConfig?.suffix ?? "",
      },
      Length: {
        id: "regionalSettingLength",
        name: "regionalSettingLength",
        value: props.regionalSettingConfig?.length,
      },
      PrefillWithZero: {
        id: "regionalSettingPrefillWithZero",
        name: "regionalSettingPrefillWithZero",
        value: props.regionalSettingConfig?.prefillWithZero ?? false,
      },
      country_id: props.regionalSettingConfig?.country_id,
      state_id: props.regionalSettingConfig?.state_id,
      dateFormat: props.regionalSettingConfig?.dateFormat,
      timeFormat: props.regionalSettingConfig?.timeFormat,
      currencySymbol: props.regionalSettingConfig?.currencySymbol,
      currencyString: props.regionalSettingConfig?.currencyString,
      currencySubString: props.regionalSettingConfig?.currencySubString,
      currencyCharacter: props.regionalSettingConfig?.currencyCharacter,
      decimalPlaces: props.regionalSettingConfig?.decimalPlaces,
    },
  });

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value === "on" ? true : value;
    }

    data = updateFormData(data);
    const result = await persistEntity(data as configSchemaT);

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
    data.country_id = entityData?.country_id
      ? entityData.country_id
      : selectValues.country
      ? selectValues.country.id
      : 0;
    data.state_id = entityData?.state_id
      ? entityData.state_id
      : selectValues.state
      ? selectValues.state.id
      : 0;

    return data;
  };

  async function persistEntity(data: configSchemaT) {
    let result;
    result = await updateConfigData(data);
    return result;
  }

  const handleCancel = () => {};

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
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"enquiryConfig"}
                  parentName={"enquiry"}
                  isParent={true}
                />
              </AccordionSummary>
              <AccordionDetails style={{ marginLeft: "1.3rem" }}>
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"enquiryConfig"}
                  parentName={"checkBoxData"}
                  isParent={false}
                />
                {config.enquiryConfig.checkBoxData[
                  config.enquiryConfig.checkBoxData.length - 1
                ].checked && (
                  <Voucher
                    config={config.enquiryConfig}
                    setConfig={setConfig}
                    configName={"enquiryConfig"}
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
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"supportConfig"}
                  parentName={"support"}
                  isParent={true}
                />
              </AccordionSummary>
              <AccordionDetails style={{ marginLeft: "1.3rem" }}>
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"supportConfig"}
                  parentName={"checkBoxData"}
                  isParent={false}
                />
                {config.supportConfig.checkBoxData[
                  config.supportConfig.checkBoxData.length - 1
                ].checked && (
                  <Voucher
                    config={config.supportConfig}
                    setConfig={setConfig}
                    configName={"supportConfig"}
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
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"contractConfig"}
                  parentName={"contract"}
                  isParent={true}
                />
              </AccordionSummary>
              <AccordionDetails style={{ marginLeft: "1.3rem" }}>
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"contractConfig"}
                  parentName={"checkBoxData"}
                  isParent={false}
                />
                {config.contractConfig.checkBoxData[
                  config.contractConfig.checkBoxData.length - 1
                ].checked && (
                  <Voucher
                    config={config.contractConfig}
                    setConfig={setConfig}
                    configName={"contractConfig"}
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
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"enquiryGenerationConfig"}
                  parentName={"enquiryGeneration"}
                  isParent={true}
                />
              </AccordionSummary>
              <AccordionDetails style={{ marginLeft: "1.3rem" }}>
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"enquiryGenerationConfig"}
                  parentName={"checkBoxData"}
                  isParent={false}
                />
                {config.enquiryGenerationConfig.checkBoxData[
                  config.enquiryGenerationConfig.checkBoxData.length - 1
                ].checked && (
                  <Voucher
                    config={config.enquiryGenerationConfig}
                    setConfig={setConfig}
                    configName={"enquiryGenerationConfig"}
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
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"regionalSettingConfig"}
                  parentName={"regionalSetting"}
                  isParent={true}
                />
              </AccordionSummary>
              <AccordionDetails style={{ marginLeft: "1.3rem" }}>
                <RegionalInfo
                  selectValues={selectValues}
                  setSelectValues={setSelectValues}
                  entityData={entityData}
                  setEntityData={setEntityData}
                />
                <CheckBoxForm
                  config={config}
                  onChange={setConfig}
                  configName={"regionalSettingConfig"}
                  parentName={"checkBoxData"}
                  isParent={false}
                />
                {config.regionalSettingConfig.checkBoxData[
                  config.regionalSettingConfig.checkBoxData.length - 1
                ].checked && (
                  <Voucher
                    config={config.regionalSettingConfig}
                    setConfig={setConfig}
                    configName={"regionalSettingConfig"}
                  />
                )}
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