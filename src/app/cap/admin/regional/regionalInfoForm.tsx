"use client";
import {
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import AutocompleteDB from "@/app/Widgets/AutocompleteDB";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Seperator from "@/app/Widgets/seperator";
import { Autocomplete, Box, Paper, Snackbar } from "@mui/material";
import { useState } from "react";
import {
  getCountryWithCurrency,
  getCurrencyCharacter,
  getCurrencyString,
  getCurrencySubString,
  getCurrencySymbol,
  getDateFormat,
} from "@/app/controllers/config.controller";
import { getStates } from "@/app/controllers/masters.controller";

const decimalPlacesList = ["Two Digits", "Three Digits"];
const timeFormatList = ["12 Hours", "24 Hours"];

export default function RegionalInfo({config,setConfig}:{config:any,setConfig:any}) {
  // const [formError, setFormError] = useState<
  //   Record<string, { msg: string; error: boolean }>
  // >({});
  const [displayNumber, setDisplayNumber] = useState<string>(config.regionalSetting.decimalPlaces === "Two Digits" ? "9,99,99,999.99" : "9,99,99,999.999");
  const [decimalPlaces, setDecimalPlaces] = useState(config.regionalSetting?.decimalPlaces);
  const [timeFormat, setTimeFormat] = useState(config.regionalSetting?.timeFormat);
  const [snackOpen, setSnackOpen] = useState(false);  

  const handleCountryChange = (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any
  ) => {
    if (val) {
      setConfig({
        ...config, ["regionalSetting"] : {
          ...config["regionalSetting"], ["country"] : val.name, ["country_id"] : val.id, ["state"] : null, ["state_id"] : null, ["currencyString"] : val.currencyString,
          ["currencySubString"] : val.currencySubString, ["currencySymbol"] : val.currencySymbol, ["currencyCharacter"] : val.currencyCharacter,
          ["dateFormat"] : val.date_format
        }
      })
    }
  };

  const handleDecimalPlacesChange = (e: any, newValue: string) => {
    setConfig({
      ...config, ["regionalSetting"] : {
        ...config["regionalSetting"], ["decimalPlaces"] : newValue
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
        <Box mb={2} sx={{ width: "80%%" }}>
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
                      id: config.regionalSetting.country?.id,
                      name: config.regionalSetting.country,
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
                return getStates(stateStr, country);
              }}
              disable={
                config.regionalSetting.country ||  config.regionalSetting.country_id !== 0
                  ? false
                  : true
              }
              diaglogVal={{
                      id: config.regionalSetting.state_id,
                      name: config.regionalSetting.state
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
            <AutocompleteDB
              name={"dateFormat"}
              id={"dateFormat"}
              label={"Date Format"}
              width={400}
              onChange={(e, val, s) => {
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["dateFormat"] : val.name
                  }
                })
              }}
              fetchDataFn={(stateStr: string) => {
                return getDateFormat(stateStr);
              }}
              diaglogVal={{
                      id: config.regionalSetting.dateFormat?.id,
                      name: config.regionalSetting.dateFormat,
                      detail: undefined,
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <Autocomplete
              value={timeFormat}
              onChange={(e: any, value)=>{
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["timeFormat"] : value
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
                  name="timeFormat"
                  label="Time Format"
                  // error={formError?.timeFormat?.error}
                  // helperText={formError?.timeFormat?.msg}
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
            <AutocompleteDB
              name={"currencySymbol"}
              id={"currencySymbol"}
              label={"Currency Symbol"}
              width={400}
              onChange={(e, val, s) => {
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencySymbol"] : val.name
                  }
                })
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencySymbol(stateStr);
              }}
              diaglogVal={{
                      id: config.regionalSetting.currencySymbol?.id,
                      name: config.regionalSetting.currencySymbol
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <AutocompleteDB
              name={"currencyString"}
              id={"currencyString"}
              label={"Currency String"}
              width={400}
              onChange={(e, val, s) => {
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencyString"] : val.name
                  }
                })
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencyString(stateStr);
              }}
              diaglogVal={{
                      id: config.regionalSetting.currencyString?.id,
                      name: config.regionalSetting.currencyString,
                      detail: undefined,
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <AutocompleteDB
              name={"currencySubString"}
              id={"currencySubString"}
              label={"Currency Sub String"}
              width={400}
              onChange={(e, val, s) => {
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencySubString"] : val.name
                  }
                })
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencySubString(stateStr);
              }}
              diaglogVal={{
                      id: config.regionalSetting.currencySubString?.id,
                      name: config.regionalSetting.currencySubString,
                      detail: undefined,
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <AutocompleteDB
              name={"currencyCharacter"}
              id={"currencyCharacter"}
              label={"Currency Character"}
              width={400}
              onChange={(e, val, s) => {
                setConfig({
                  ...config, ["regionalSetting"] : {
                    ...config["regionalSetting"], ["currencyCharacter"] : val.name
                  }
                })
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencyCharacter(stateStr);
              }}
              diaglogVal={{
                      id: config.regionalSetting.currencyCharacter?.id,
                      name: config.regionalSetting.currencyCharacter,
                      detail: undefined,
                    }
              }
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
            <Autocomplete
              value={decimalPlaces}
              options={decimalPlacesList}
              sx={{ maxWidth: 400 }}
              onChange={handleDecimalPlacesChange}
              renderInput={(params) => (
                <InputControl
                  {...params}
                  inputType={InputType.TEXT}
                  name="decimalPlaces"
                  label="Decimal Places"
                  // error={formError?.decimalPlaces?.error}
                  // helperText={formError?.decimalPlaces?.msg}
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