"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { updateConfigData } from "../../../controllers/configData.controller";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Chip, Collapse, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography, Portal } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Voucher from "./voucherNumberForm";
import RegionalInfo from "./regionalInfoForm";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Theme, useTheme } from '@mui/material/styles';
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { configDeptMapSchemaT, configSchemaT } from "@/app/models/models";

const customLabel: any = {
  enquiry: "Enquiry Management",
  support: "Support Management",
  amcWarranty: "AMC Warranty",
  closeCall: "Can Close Call at the time of Call Receipt",
  maintainProducts: "Maintain Products in Call Receipt",
  saveFAQ: "Ask to Save FAQ on Call Receipt and Report Saving",
  allowReallocation: "Allow Re-allocation to Executive",
  maintainAction: "Maintain Action Taken for Call Receipt",
  voucher: "Do you want to keep Voucher Number?"
}

// menu props for the multi-select control for choosing depts
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// convert camelcase json keys to label
function camelCaseToNormal(camelCaseStr: string) {
  return camelCaseStr
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

// styling for dept select
function getStyles(id: number, configDept: readonly number[], theme: Theme) {
  return {
    fontWeight: configDept?.includes(id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


export default function ConfigForm({ configData, allDepts, configDeptMap }: { configData: configSchemaT, allDepts: Array<{ id: number, name: string }>, configDeptMap: configDeptMapSchemaT }) {
  const theme = useTheme();
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [configDept, setConfigDept] = React.useState(configDeptMap);

  const [config, setConfig] = useState(configData);

  const handleSubmit = async (formData: FormData) => {
    setFormError({});
    const result = await updateConfigData(config, configDept);
    if (result?.status) {
      setSnackOpen(true);
    } else {
      // const errorState: Record<string, { msg: string; error: boolean }> = {};
      // errorState["form"] = { msg: "Error encountered", error: true };
      // setFormError(errorState);
      const issues = result?.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues!) {
        let customPath : string = "";
        for (const path of issue.path) {
          customPath += path;
          customPath += "_";
        }
        customPath = customPath.slice(0,-1);
        errorState[issue.path[0]] = {msg: "error",error:true};
        errorState[customPath] = { msg: issue.message, error: true };
      }
      console.log("error state : ",errorState);
      setFormError(errorState);
    }
  };

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Paper>
      <Box sx={{ p: 3 }}>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
        >
          <Box>
            {/* iterate object keys to make accordion for each config type */}
            {Object.keys({ ...config }).map((key, index) => (
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id={`${key}-panel1-content`}
                  sx={{ height: "50px",border: formError?.[key]?.error ? "1px solid red" : "" }}
                >
                  {/* check out only visible for non mandatory config type */}
                  {["enquiry", "support", "amcWarranty"].includes(key) ?
                    <InputControl
                      key={index}
                      inputType={InputType.CHECKBOX}
                      id={`${key}`}
                      name={`${key}`}
                      custLabel={customLabel[key] || camelCaseToNormal(key)}
                      sx={{
                        '&, & + .MuiFormControlLabel-label': {
                          color: formError?.[key]?.error ? "red" : "",
                        },
                      }}
                      checked={config[key as keyof configSchemaT]["reqd"]}
                      // componentProps={{
                      //   typography: {color: formError?.[key]?.error ? "1px solid red" : ""}
                      // }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setConfig({ ...config, [key]: { ...config[key as keyof configSchemaT], ["reqd"]: e.target.checked } })
                        // empty config data for that particular config type while unchecking "reqd"
                        // if (e.target.checked === false) {
                        //   let updatedKeyValues = { ...config[key as keyof configSchemaT] };
                        //   Object.keys({ ...config[key as keyof configSchemaT] }).forEach((k, index) => {
                        //     let configDataObj = config[key as keyof configSchemaT];
                        //     if (typeof (config[key as keyof configSchemaT][k as keyof typeof configDataObj]) === "boolean") {
                        //       updatedKeyValues[k as keyof typeof configDataObj] = false;
                        //     }
                        //     else if (typeof (configDataObj[k as keyof typeof configDataObj]) === "string") {
                        //       updatedKeyValues[k as keyof typeof configDataObj] = "";
                        //     } else if (typeof (configDataObj[k as keyof typeof configDataObj]) === "number") {
                        //       updatedKeyValues[k as keyof typeof configDataObj] = 0;
                        //     }
                        //   });
                        //   if (config[key as keyof configSchemaT]["voucher"] !== undefined) {
                        //     updatedKeyValues["voucher"]["voucherNumber"] = false;
                        //     updatedKeyValues["voucher"]["prefix"] = "";
                        //     updatedKeyValues["voucher"]["suffix"] = "";
                        //     updatedKeyValues["voucher"]["length"] = "0";
                        //     updatedKeyValues["voucher"]["prefillWithZero"] = false;
                        //   }
                        //   setConfig({
                        //     ...config,
                        //     [key]: updatedKeyValues
                        //   })
                        //   setConfigDept({
                        //     ...configDept,
                        //     [key]: []
                        //   })
                        // }
                      }
                      }
                    /> :
                    <Typography sx={{ marginLeft: "30px",color: formError?.[key]?.error ? "red" : "" }}>{customLabel[key] || camelCaseToNormal(key)}</Typography>
                  }
                </AccordionSummary>
                <AccordionDetails style={{ marginLeft: "1.3rem" }} >
                  {key === "regionalSetting" ? <>
                    <RegionalInfo config={config} setConfig={setConfig} formError={formError} setFormError={setFormError} />
                  </>
                    :
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {
                          // iterate object keys to make keys for each config type

                          Object.keys({ ...config[key as keyof configSchemaT] }).map((k, index) => {
                            let configDataObj = config[key as keyof configSchemaT];
                            if (k !== "reqd" && typeof (config[key as keyof configSchemaT][k as keyof typeof configDataObj]) === "boolean") {
                              return (
                                <InputControl
                                  key={index}
                                  inputType={InputType.CHECKBOX}
                                  id={`${key}${k}`}
                                  name={`${key}${k}`}
                                  custLabel={customLabel[k] || camelCaseToNormal(k)}
                                  checked={config[key as keyof configSchemaT][k as keyof typeof configDataObj]}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setConfig({ ...config, [key]: { ...config[key as keyof configSchemaT], [k]: e.target.checked } })
                                  }
                                  disabled={!config[key as keyof configSchemaT]["reqd"]}
                                />
                              )
                            }

                          })}
                        {/* show voucher checkbox and voucher form only if voucher key is present */}
                        {config[key as keyof configSchemaT].hasOwnProperty('voucher') && <InputControl
                          key={index}
                          inputType={InputType.CHECKBOX}
                          id={`${key}Voucher`}
                          name={`${key}Voucher`}
                          custLabel={customLabel["voucher"]}
                          checked={config[key as keyof configSchemaT]?.voucher?.voucherNumber}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setConfig({
                              ...config, [key]: {
                                ...config[key as keyof configSchemaT], ["voucher"]:
                                  { ...config[key as keyof configSchemaT]["voucher"], ["voucherNumber"]: e.target.checked }
                              }
                            })
                            if (e.target.checked === false) {
                              setConfig({
                                ...config, [key]: {
                                  ...config[key as keyof configSchemaT], ["voucher"]:
                                    { ...config[key as keyof configSchemaT]["voucher"], ["voucherNumber"]: e.target.checked, ["prefix"]: "", ["suffix"]: "", ["length"]: "0", ["prefillWithZero"]: false }
                                }
                              })
                            }
                          }
                          }
                          disabled={!config[key as keyof configSchemaT]["reqd"]}
                        />}
                        {config[key as keyof configSchemaT].hasOwnProperty('voucher') && config[key as keyof configSchemaT]?.voucher?.voucherNumber && <Voucher config={config} setConfig={setConfig} parentKey={key as keyof configSchemaT} formError={formError} setFormError={setFormError} />}
                      </Box>
                      {/* select department is only for these config */}
                      {["enquiry", "support", "amcWarranty"].includes(key) &&
                        <Box>
                          <Typography>Select Department to Allocate</Typography>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id={`${key}-demo-multiple-chip-label`}>Select Departments</InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id={`${key}-demo-multiple-chip`}
                              multiple
                              value={configDept[key as keyof configDeptMapSchemaT]}
                              onChange={(e: SelectChangeEvent<number[]>) =>
                                setConfigDept({ ...configDept, [key]: e.target.value })
                              }
                              input={<OutlinedInput id={`${key}-select-multiple-chip`} label=">Select Departments" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((value: number) => (
                                    <Chip key={value} label={allDepts.filter((dept: { id: number, name: string }) => dept.id === value)[0].name} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {allDepts.map((dept: any) => (
                                <MenuItem
                                  key={dept.name}
                                  value={dept.id}
                                  style={getStyles(dept.id, configDept[key as keyof configDeptMapSchemaT], theme)}
                                >
                                  {dept.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      }
                    </Box>
                  }
                </AccordionDetails>
              </Accordion>
            ))
            }
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
        <Portal>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            message={"Configuration saved successfully!"}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Portal>
      </Box>
    </Paper>
  );
}