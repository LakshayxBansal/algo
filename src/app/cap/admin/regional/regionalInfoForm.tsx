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

export default function RegionalInfo(props: {
  selectValues: selectKeyValueT;
  setSelectValues: any;
  entityData: any;
  setEntityData: any;
}) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [displayNumber, setDisplayNumber] = useState<string>(props.entityData.decimalPlaces === "Two Digits" ? "9,99,99,999.99" : "9,99,99,999.999");
  const [decimalPlaces, setDecimalPlaces] = useState(props.entityData?.decimalPlaces);
  const [timeFormat, setTimeFormat] = useState(props.entityData?.timeFormat);
  const [snackOpen, setSnackOpen] = useState(false);  

  const handleCountryChange = (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any
  ) => {
    if (val) {
      props.setEntityData({});
      props.setSelectValues({
        country: { id: val.id, name: val.name },
        state: null,
        currencyString: { id: val.id, name: val.currencyString },
        currencySubString: {
          id: val.id,
          name: val.currencySubString,
        },
        currencySymbol: { id: val.id, name: val.currencySymbol },
        currencyCharacter: { id: val.id, name: val.currencyCharacter },
        dateformat: { id: val.id, name: val.date_format },
      });
    }
  };

  const handleDecimalPlacesChange = (e: any, newValue: string) => {
    setDecimalPlaces(newValue);
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
              diaglogVal={
                props.selectValues.country
                  ? {
                      id: props.selectValues.country?.id,
                      name: props.selectValues.country?.name ?? "",
                      detail: undefined,
                    }
                  : ({
                      id:  props.entityData?.country_id,
                      name:  props.entityData?.country,
                    } as optionsDataT)
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
                props.setSelectValues({ ...props.selectValues, state: val });
              }}
              fetchDataFn={(stateStr: string) => {
                const country =
                  props.selectValues.country?.name ||  props.entityData.country;
                return getStates(stateStr, country);
              }}
              disable={
                props.selectValues.country ||  props.entityData?.country_id !== 0
                  ? false
                  : true
              }
              diaglogVal={
                props.selectValues.state
                  ? {
                      id: props.selectValues.state?.id,
                      name: props.selectValues.state?.name ?? "",
                      detail: undefined,
                    }
                  : ({
                      id:  props.entityData?.state_id,
                      name:  props.entityData?.state,
                    } as optionsDataT)
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
                props.setSelectValues({
                  ...props.selectValues,
                  dateFormat: val,
                });
              }}
              fetchDataFn={(stateStr: string) => {
                return getDateFormat(stateStr);
              }}
              diaglogVal={
                props.selectValues.dateFormat
                  ? {
                      id: props.selectValues.dateFormat?.id,
                      name: props.selectValues.dateFormat?.name ?? "",
                      detail: undefined,
                    }
                  : {
                      id:  props.entityData?.country_id,
                      name:  props.entityData?.dateFormat,
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
                setTimeFormat(value);
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
                  error={formError?.timeFormat?.error}
                  helperText={formError?.timeFormat?.msg}
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
                props.setSelectValues({
                  ...props.selectValues,
                  currencySymbol: val,
                });
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencySymbol(stateStr);
              }}
              diaglogVal={
                props.selectValues.currencySymbol
                  ? {
                      id: props.selectValues.currencySymbol?.id,
                      name: props.selectValues.currencySymbol?.name ?? "",
                      detail: undefined,
                    }
                  : {
                      id:  props.entityData?.country_id,
                      name:  props.entityData?.currencySymbol,
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
                props.setSelectValues({
                  ...props.selectValues,
                  currencyString: val,
                });
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencyString(stateStr);
              }}
              diaglogVal={
                props.selectValues.currencyString
                  ? {
                      id: props.selectValues.currencyString?.id,
                      name: props.selectValues.currencyString?.name ?? "",
                      detail: undefined,
                    }
                  : {
                      id:  props.entityData?.country_id,
                      name:  props.entityData?.currencyString,
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
                props.setSelectValues({
                  ...props.selectValues,
                  currencySubString: val,
                });
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencySubString(stateStr);
              }}
              diaglogVal={
                props.selectValues.currencySubString
                  ? {
                      id: props.selectValues.currencySubString?.id,
                      name: props.selectValues.currencySubString?.name ?? "",
                      detail: undefined,
                    }
                  : {
                      id:  props.entityData?.country_id,
                      name:  props.entityData?.currencySubString,
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
                props.setSelectValues({
                  ...props.selectValues,
                  currencyCharacter: val,
                });
              }}
              fetchDataFn={(stateStr: string) => {
                return getCurrencyCharacter(stateStr);
              }}
              diaglogVal={
                props.selectValues.currencyCharacter
                  ? {
                      id: props.selectValues.currencyCharacter?.id,
                      name: props.selectValues.currencyCharacter?.name ?? "",
                      detail: undefined,
                    }
                  : {
                      id:  props.entityData?.country_id,
                      name:  props.entityData?.currencyCharacter,
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
                  error={formError?.decimalPlaces?.error}
                  helperText={formError?.decimalPlaces?.msg}
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
                ((props.selectValues.currencyCharacter?.name || props.entityData.currencyCharacter) ?? "") + " " + displayNumber
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