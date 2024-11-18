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
import { Accordion, AccordionDetails, AccordionSummary, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxForm from "./checkBoxForm";
import Voucher from "./voucherNumberForm";
import RegionalInfo from "../regional/regionalInfoForm";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Theme, useTheme } from '@mui/material/styles';

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

// function getStyles(id: number, configDept: readonly number[], theme: Theme) {
//   // console.log("style id : ", id);
//   // console.log("style array : ", configDept);
//   return {
//     fontWeight: configDept.includes(id)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }


export default function ConfigForm({configData,allDepts,configDeptMap}:{configData: any,allDepts : any, configDeptMap : any}) {
  const theme = useTheme();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [configDept, setConfigDept] = React.useState(configDeptMap);

  const handleChange = (event: SelectChangeEvent<typeof configDept>) => {
    const {
      target: { value },
    } = event;
    console.log("value : ",value);
    setConfigDept(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [config, setConfig] = useState(configData);
  console.log("configDept : ", configDept);
  const handleSubmit = async (formData: FormData) => {
    
    const result = await updateConfigData(config,configDept);
    if(result){
      setSnackOpen(true);
    }else{
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  // async function persistEntity(data: any) {
  //   let result;
  //   result = await updateConfigData(data);
  //   return result;
  // }

  const handleCancel = () => { };

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
            {Object.keys({ ...config }).map((key, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {/* <Box> */}
                  <InputControl
                    key={index}
                    inputType={InputType.CHECKBOX}
                    id={"field.name"}
                    name={"field.name"}
                    custLabel={key}
                    checked={config[key]["reqd"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setConfig({ ...config, [key]: { ...config[key], ["reqd"]: e.target.checked } })

                    }
                  // disabled={field.disable}
                  />
                  {/* </Box> */}
                </AccordionSummary>
                <AccordionDetails style={{ marginLeft: "1.3rem" }}>
                  {key === "regionalSetting" ? <>
                    <RegionalInfo config={config} setConfig={setConfig} />
                    <InputControl
                      key={index}
                      inputType={InputType.CHECKBOX}
                      id={`${key} Voucher`}
                      name={`${key} Voucher`}
                      custLabel={`${key} Voucher`}
                      checked={config[key]["voucher"]["voucherNumber"]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfig({
                          ...config, [key]: {
                            ...config[key], ["voucher"]:
                              { ...config[key]["voucher"], ["voucherNumber"]: e.target.checked }
                          }
                        })
                      }
                      disabled={!config[key]["reqd"]}
                    />
                    {config[key]["voucher"]["voucherNumber"] && <Voucher config={config} setConfig={setConfig} parentKey={key} />}
                  </>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>{
                          Object.keys({ ...config[key] }).map((k, index) => {
                            if (k !== "reqd" && typeof (config[key][k]) === "boolean") {
                              return (
                                <InputControl
                                  key={index}
                                  inputType={InputType.CHECKBOX}
                                  id={`${key}${k}`}
                                  name={`${key}${k}`}
                                  custLabel={`${key}${k}`}
                                  checked={config[key][k]}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setConfig({ ...config, [key]: { ...config[key], [k]: e.target.checked } })
                                  }
                                  disabled={!config[key]["reqd"]}
                                />
                              )
                            }

                          })}
                        </Box>
                        {["enquiry","support","contract","enquiryGeneration"].includes(key) && 
                        <Box>
                          <Typography>Select Department to Allocate : </Typography>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Select Departments</InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={configDept[key]}
                              onChange={(e: SelectChangeEvent<typeof configDept>) =>
                                setConfigDept({...configDept, [key] : e.target.value})
                              }
                              input={<OutlinedInput id="select-multiple-chip" label=">Select Departments" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((value : any) => (
                                    <Chip key={value} label={allDepts.filter((dept:any)=>dept.id === value)[0].name} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {allDepts.map((dept : any) => (
                                <MenuItem
                                  key={dept.name}
                                  value={dept.id}
                                  // style={getStyles(dept.id, configDept[key], theme)}
                                >
                                  {dept.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        }
                      </Box>
                      {config[key]["voucher"] !== undefined && <InputControl
                        key={index}
                        inputType={InputType.CHECKBOX}
                        id={`${key} Voucher`}
                        name={`${key} Voucher`}
                        custLabel={`${key} Voucher`}
                        checked={config[key]["voucher"]["voucherNumber"]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setConfig({
                            ...config, [key]: {
                              ...config[key], ["voucher"]:
                                { ...config[key]["voucher"], ["voucherNumber"]: e.target.checked }
                            }
                          })
                        }
                        disabled={!config[key]["reqd"]}
                      />}
                      {key !== undefined && config[key]["voucher"] !== undefined && config[key]["voucher"]["voucherNumber"] && <Voucher config={config} setConfig={setConfig} parentKey={key} />}
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
          autoHideDuration={6000}
          onClose={() => setSnackOpen(false)}
          message={"Configuration saved successfully!"}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}