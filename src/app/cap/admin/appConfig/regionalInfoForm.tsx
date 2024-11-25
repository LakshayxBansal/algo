"use client";
import {
  configSchemaT,
  optionsDataT,
} from "@/app/models/models";
import AutocompleteDB from "@/app/Widgets/AutocompleteDB";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Seperator from "@/app/Widgets/seperator";
import { Autocomplete, Box, Paper, Snackbar } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  getCountryWithCurrency,
} from "@/app/controllers/config.controller";
import { getStates } from "@/app/controllers/masters.controller";

const decimalPlacesList = ["Two Digits", "Three Digits"];
const timeFormatList = ["12 Hours", "24 Hours"];
const dateFormatList = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/DD/MM", "YYYY/MM/DD"];

export default function RegionalInfo({config,setConfig,formError,setFormError}:{config:configSchemaT,setConfig:React.Dispatch<React.SetStateAction<configSchemaT>>,formError : Record<string, { msg: string; error: boolean }>, setFormError : React.Dispatch<React.SetStateAction<Record<string, { msg: string; error: boolean }>>>}) {
  const [displayNumber, setDisplayNumber] = useState<string>(config?.regionalSetting?.decimalPlaces === "Two Digits" ? "9,99,99,999.99" : "9,99,99,999.999");
  const [snackOpen, setSnackOpen] = useState(false);  

  const handleCountryChange = (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any
  ) => {
    if (val) {
      setConfig({
        ...config, ["regionalSetting"] : {
          ...config["regionalSetting"], ["country"] : val.name, ["country_id"] : val.id, ["state"] : "", ["state_id"] : 0, ["currencyString"] : val.currencyString,
          ["currencySubString"] : val.currencySubString, ["currencySymbol"] : val.currencySymbol, ["currencyCharacter"] : val.currencyCharacter,
          ["dateFormat"] : val.date_format
        }
      })
    }
  };

  const handleDecimalPlacesChange = (e: SyntheticEvent<Element, Event>, newValue: string | null) => {
    setConfig({
      ...config, ["regionalSetting"] : {
        ...config["regionalSetting"], ["decimalPlaces"] : newValue as string
      }
    })
    if (newValue === "Two Digits") {
      setDisplayNumber("9,99,99,999.99");
    } else {
      setDisplayNumber("9,99,99,999.999");
    }
  };

  return (
    <>
      <Paper sx={{  padding: "1%" }}>
        <Box mb={2} sx={{ width: "80%" }}>
          <Seperator>Regional Settings</Seperator>
        </Box>
        <Box sx={{ width: "90%" }}>
          <Box
            sx={{
              display: "grid",
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
              paddingBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <AutocompleteDB
              name={"country"}
              id={"country"}
              label={"Country"}
              onChange={(e, val, s) => handleCountryChange(e, val, s)}
              width={400}
              fetchDataFn={getCountryWithCurrency}
              diaglogVal={{
                      id: config.regionalSetting.country_id as number,
                      name: config.regionalSetting.country as string,
                      detail: undefined,
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <AutocompleteDB
              name={"state"}
              id={"state"}
              label={"State"}
              width={400}
              onChange={(e, val, s) => {
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["state"] : val.name, ["state_id"] : val.id
                  }
                })
              }}
              fetchDataFn={(stateStr: string) => {
                const country =
                  config.regionalSetting.country;
                return getStates(stateStr, country as string);
              }}
              disable={
                config.regionalSetting.country ||  config.regionalSetting.country_id !== 0
                  ? false
                  : true
              }
              diaglogVal={{
                      id: config.regionalSetting.state_id,
                      name: config.regionalSetting.state as string
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
              paddingBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <Autocomplete
              value={config.regionalSetting?.dateFormat}
              onChange={(e: any, value)=>{
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["dateFormat"] : value as string
                  }
                })
              }}
              options={dateFormatList}
              id="dateFormat"
              sx={{ maxWidth: 400 }}
              renderInput={(params) => (
                <InputControl
                  {...params}
                  inputType={InputType.TEXT}
                  name="regionalSetting_dateFormat"
                  label="Date Format"
                  error={formError?.regionalSetting_dateFormat?.error}
                  helperText={formError?.regionalSetting_dateFormat?.error && "Required"}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { regionalSetting_dateFormat, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              )}
            />
            
            <Autocomplete
              value={config.regionalSetting?.timeFormat}
              onChange={(e: any, value)=>{
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["timeFormat"] : value as string
                  }
                })
              }}
              options={timeFormatList}
              id="timeFormat"
              sx={{ maxWidth: 400 }}
              renderInput={(params) => (
                <InputControl
                  {...params}
                  inputType={InputType.TEXT}
                  name="regionalSetting_timeFormat"
                  label="Time Format"
                  error={formError?.regionalSetting_timeFormat?.error}
                  helperText={formError?.regionalSetting_timeFormat?.error && "Required"}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { regionalSetting_timeFormat, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
              paddingBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <InputControl
              id="currencySymbol"
              label="Currency Symbol"
              inputType={InputType.TEXT}
              name="regionalSetting_currencySymbol"
              style={{width: "400px"}}
              error={formError?.regionalSetting_currencySymbol?.error}
              helperText={formError?.regionalSetting_currencySymbol?.msg}
              defaultValue={config.regionalSetting.currencySymbol}
              onKeyDown={() => {
                const { regionalSetting_currencySymbol, ...rest } = formError;
                console.log("rest : ",rest);
                setFormError(rest);
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencySymbol"] : e.target.value
                  }
                })
              }}
            />
            <InputControl
              id="currencyString"
              label="Currency String"
              inputType={InputType.TEXT}
              name="regionalSetting_currencyString"
              style={{width: "400px"}}
              error={formError?.regionalSetting_currencyString?.error}
              helperText={formError?.regionalSetting_currencyString?.msg}
              defaultValue={config.regionalSetting.currencyString}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { regionalSetting_currencyString, ...rest } = curr;
                  return rest;
                });
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencyString"] : e.target.value
                  }
                })
              }}
            />
            <InputControl
              id="currencySubString"
              label="Currency Sub String"
              inputType={InputType.TEXT}
              name="regionalSetting_currencySubString"
              style={{width: "400px"}}
              error={formError?.regionalSetting_currencySubString?.error}
              helperText={formError?.regionalSetting_currencySubString?.msg}
              defaultValue={config.regionalSetting.currencySubString}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { regionalSetting_currencySubString, ...rest } = curr;
                  return rest;
                });
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencySubString"] : e.target.value
                  }
                })
              }}
            />
            <InputControl
              id="currencyCharacter"
              label="Currency Character"
              inputType={InputType.TEXT}
              name="regionalSetting_currencyCharacter"
              style={{width: "400px"}}
              error={formError?.regionalSetting_currencyCharacter?.error}
              helperText={formError?.regionalSetting_currencyCharacter?.msg}
              defaultValue={config.regionalSetting.currencyCharacter}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { regionalSetting_currencyCharacter, ...rest } = curr;
                  return rest;
                });
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencyCharacter"] : e.target.value
                  }
                })
              }}
            />
          
            
            <Autocomplete
              value={config?.regionalSetting?.decimalPlaces}
              options={decimalPlacesList}
              sx={{ maxWidth: 400 }}
              onChange={handleDecimalPlacesChange}
              renderInput={(params) => (
                <InputControl
                  {...params}
                  inputType={InputType.TEXT}
                  name="regionalSetting_decimalPlaces"
                  label="Decimal Places"
                  error={formError?.regionalSetting_decimalPlaces?.error}
                  helperText={formError?.regionalSetting_decimalPlaces?.error && "Required"}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { regionalSetting_decimalPlaces, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              )}
            />
            <InputControl
              inputType={InputType.TEXT}
              autoFocus
              sx={{ maxWidth: 400 }}
              name="numberFormat"
              id="numberFormat"
              label="Format for displaying numbers"
              disabled
              value={
                config.regionalSetting.currencyCharacter + " " + displayNumber
              }
            />
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={() => setSnackOpen(false)}
        message="Record Saved!!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}