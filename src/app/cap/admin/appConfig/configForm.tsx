"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { updateConfigData } from "../../../controllers/configData.controller";
import { Accordion, AccordionDetails, AccordionSummary, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Voucher from "./voucherNumberForm";
import RegionalInfo from "../regional/regionalInfoForm";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Theme, useTheme } from '@mui/material/styles';


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
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}

// styling for dept select
function getStyles(id: number, configDept: readonly number[], theme: Theme) {
  return {
    fontWeight: configDept.includes(id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


export default function ConfigForm({ configData, allDepts, configDeptMap }: { configData: any, allDepts: any, configDeptMap: any }) {
  const theme = useTheme();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [configDept, setConfigDept] = React.useState(configDeptMap);

  const [config, setConfig] = useState(configData);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateConfigData(config, configDept);
    if (result) {
      setSnackOpen(true);
    } else {
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  const handleCancel = () => {
    setConfig(configData);
    setConfigDept(configDeptMap);
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
          <Box>
            {/* iterate object keys to make accordion for each config type */}
            {Object.keys({ ...config }).map((key, index) => (
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{height: "50px"}}
                >
                  {/* check out only visible for non mandatory config type */}
                  {["enquiry","support","contract"].includes(key) ?
                    <InputControl
                      key={index}
                      inputType={InputType.CHECKBOX}
                      id={`${key}`}
                      name={`${key}`}
                      custLabel={camelCaseToNormal(key)}
                      checked={config[key]["reqd"]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setConfig({ ...config, [key]: { ...config[key], ["reqd"]: e.target.checked } })
                        // empty config data for that particular config type while unchecking "reqd"
                        if (e.target.checked === false) {
                          let updatedKeyValues = { ...config[key] };
                          Object.keys({ ...config[key] }).forEach((k, index) => {

                            if (typeof (config[key][k]) === "boolean") {
                              updatedKeyValues[k] = false;
                            }
                            else if (typeof (config[key][k]) === "string") {
                              updatedKeyValues[k] = "";
                            } else if (typeof (config[key][k]) === "number") {
                              updatedKeyValues[k] = 0;
                            }
                          });
                          if (config[key]["voucher"] !== undefined) {
                            updatedKeyValues["voucher"]["voucherNumber"] = false;
                            updatedKeyValues["voucher"]["prefix"] = "";
                            updatedKeyValues["voucher"]["suffix"] = "";
                            updatedKeyValues["voucher"]["length"] = "0";
                            updatedKeyValues["voucher"]["prefillWithZero"] = false;
                          }
                          setConfig({
                            ...config,
                            [key]: updatedKeyValues
                          })
                          setConfigDept({
                            ...configDept,
                            [key]: []
                          })
                        }
                      }

                      }
                    /> : 
                    <Typography sx={{marginLeft: "30px"}}>{camelCaseToNormal(key)}</Typography>
                  }
                </AccordionSummary>
                <AccordionDetails style={{ marginLeft: "1.3rem" }} >
                  {key === "regionalSetting" ? <>
                    <RegionalInfo config={config} setConfig={setConfig} />
                  </>
                    :
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {
                          // iterate object keys to make keys for each config type
                          Object.keys({ ...config[key] }).map((k, index) => {
                            if (k !== "reqd" && typeof (config[key][k]) === "boolean") {
                              return (
                                <InputControl
                                  key={index}
                                  inputType={InputType.CHECKBOX}
                                  id={`${key}${k}`}
                                  name={`${key}${k}`}
                                  custLabel={`${camelCaseToNormal(k)}`}
                                  checked={config[key][k]}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setConfig({ ...config, [key]: { ...config[key], [k]: e.target.checked } })
                                  }
                                  disabled={!config[key]["reqd"]}
                                />
                              )
                            }

                          })}
                        {/* show voucher checkbox and voucher form only if voucher key is present */}
                        {config[key]["voucher"] !== undefined && <InputControl
                          key={index}
                          inputType={InputType.CHECKBOX}
                          id={`${key} Voucher`}
                          name={`${key} Voucher`}
                          custLabel={`${camelCaseToNormal(key)} Voucher`}
                          checked={config[key]["voucher"]["voucherNumber"]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setConfig({
                              ...config, [key]: {
                                ...config[key], ["voucher"]:
                                  { ...config[key]["voucher"], ["voucherNumber"]: e.target.checked }
                              }
                            })
                            if (e.target.checked === false) {
                              setConfig({
                                ...config, [key]: {
                                  ...config[key], ["voucher"]:
                                    { ...config[key]["voucher"], ["voucherNumber"]: e.target.checked, ["prefix"]: "", ["suffix"]: "", ["length"]: "0", ["prefillWithZero"]: false }
                                }
                              })
                            }
                          }
                          }
                          disabled={!config[key]["reqd"]}
                        />}
                        {key !== undefined && config[key]["voucher"] !== undefined && config[key]["voucher"]["voucherNumber"] && <Voucher config={config} setConfig={setConfig} parentKey={key} />}
                      </Box>
                      {/* select department is only for these config */}
                      {["enquiry", "support", "contract"].includes(key) &&
                        <Box>
                          <Typography>Select Department to Allocate</Typography>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Select Departments</InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={configDept[key]}
                              onChange={(e: SelectChangeEvent<typeof configDept>) =>
                                setConfigDept({ ...configDept, [key]: e.target.value })
                              }
                              input={<OutlinedInput id="select-multiple-chip" label=">Select Departments" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((value: any) => (
                                    <Chip key={value} label={allDepts.filter((dept: any) => dept.id === value)[0].name} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {allDepts.map((dept: any) => (
                                <MenuItem
                                  key={dept.name}
                                  value={dept.id}
                                  style={getStyles(dept.id, configDept[key], theme)}
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
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message={"Configuration saved successfully!"}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}