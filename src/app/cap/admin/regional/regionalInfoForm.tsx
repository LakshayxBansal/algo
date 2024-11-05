"use client";
import { optionsDataT, regionalSettingSchemaT, selectKeyValueT } from "@/app/models/models";
import AutocompleteDB from "@/app/Widgets/AutocompleteDB";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Seperator from "@/app/Widgets/seperator";
import { Autocomplete, Box, Button, Paper, Snackbar } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { getCountryWithCurrency, getCurrencyCharacter, getCurrencyString, getCurrencySubString, getCurrencySymbol, getDateFormat, updateRegionalSetting } from "@/app/controllers/config.controller";
import { getStates } from "@/app/controllers/masters.controller";

const decimalPlacesList = ["Two Digits", "Three Digits"];
const timeFormatList = ["12 Hours", "24 Hours"];

export default function RegionalInfo(props: { data: any }) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [displayNumber, setDisplayNumber] = useState<string>("9,99,99,999.99");
  const [entityData, setEntityData] = useState(props.data.config);
  const [snackOpen, setSnackOpen] = useState(false);


  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    data = updateFormData(data as regionalSettingSchemaT);

    const result = await persistEntity(data as regionalSettingSchemaT);
    if (result.status) {
      setFormError({});
      setSnackOpen(true);
    } else {
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  const updateFormData = (data: regionalSettingSchemaT) => {
    data.country_id = entityData.country_id
      ? entityData.country_id
      : selectValues.country
      ? selectValues.country.id
      : 0;
    data.state_id = entityData.state_id
      ? entityData.state_id
      : selectValues.state
      ? selectValues.state.id
      : 0;

    return data;
  };

  async function persistEntity(data: regionalSettingSchemaT) {
    let result = await updateRegionalSetting(data, props.data.config_type_id);
    return result;
  }

  const handleCountryChange = (
    event: React.SyntheticEvent,
    val: any,
    setDialogValue: any
  ) => {
    if (val) {
      setEntityData({});
      setSelectValues({
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

  return (
    <>
      <Paper sx={{ margin: "0 20px", padding: "1%" }}>
        <Box mb={2} sx={{ width: "100%" }}>
          <Seperator>Regional Settings</Seperator>
        </Box>
        <Box sx={{ width: "100%" }}>
          <form action={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
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
                  selectValues.country
                    ? {
                        id: selectValues.country?.id,
                        name: selectValues.country?.name ?? "",
                        detail: undefined,
                      }
                    : ({
                        id: entityData?.country_id,
                        name: entityData?.country,
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
                  setSelectValues({ ...selectValues, state: val });
                }}
                fetchDataFn={(stateStr: string) => {
                  const country =
                    selectValues.country?.name || entityData.country;
                  return getStates(stateStr, country);
                }}
                disable={
                  selectValues.country || entityData?.country_id !== 0
                    ? false
                    : true
                }
                diaglogVal={
                  selectValues.state
                    ? {
                        id: selectValues.state?.id,
                        name: selectValues.state?.name ?? "",
                        detail: undefined,
                      }
                    : ({
                        id: entityData?.state_id,
                        name: entityData?.state,
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
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
                paddingBottom: "10px",
                flexWrap: "wrap",
              }}
            >
              <AutocompleteDB
                name={"dateformat"}
                id={"dateformat"}
                label={"Date Format"}
                width={400}
                onChange={(e, val, s) => {
                  setSelectValues({ ...selectValues, dateformat: val });
                }}
                fetchDataFn={(stateStr: string) => {
                  return getDateFormat(stateStr);
                }}
                diaglogVal={
                  selectValues.dateformat
                    ? {
                        id: selectValues.dateformat?.id,
                        name: selectValues.dateformat?.name ?? "",
                        detail: undefined,
                      }
                    : {
                        id: entityData?.country_id,
                        name: entityData?.dateformat,
                      }
                }
                setDialogVal={function (
                  value: React.SetStateAction<optionsDataT>
                ): void {}}
                fnSetModifyMode={function (id: string): void {}}
              />
              <Autocomplete
                defaultValue={entityData?.timeFormat}
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
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
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
                  setSelectValues({ ...selectValues, currencySymbol: val });
                }}
                fetchDataFn={(stateStr: string) => {
                  return getCurrencySymbol(stateStr);
                }}
                diaglogVal={
                  selectValues.currencySymbol
                    ? {
                        id: selectValues.currencySymbol?.id,
                        name: selectValues.currencySymbol?.name ?? "",
                        detail: undefined,
                      }
                    : {
                        id: entityData?.country_id,
                        name: entityData?.currencySymbol,
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
                  setSelectValues({ ...selectValues, currencyString: val });
                }}
                fetchDataFn={(stateStr: string) => {
                  return getCurrencyString(stateStr);
                }}
                diaglogVal={
                  selectValues.currencyString
                    ? {
                        id: selectValues.currencyString?.id,
                        name: selectValues.currencyString?.name ?? "",
                        detail: undefined,
                      }
                    : {
                        id: entityData?.country_id,
                        name: entityData?.currencyString,
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
                  setSelectValues({ ...selectValues, currencySubString: val });
                }}
                fetchDataFn={(stateStr: string) => {
                  return getCurrencySubString(stateStr);
                }}
                diaglogVal={
                  selectValues.currencySubString
                    ? {
                        id: selectValues.currencySubString?.id,
                        name: selectValues.currencySubString?.name ?? "",
                        detail: undefined,
                      }
                    : {
                        id: entityData?.country_id,
                        name: entityData?.currencySubString,
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
                  setSelectValues({ ...selectValues, currencyCharacter: val });
                }}
                fetchDataFn={(stateStr: string) => {
                  return getCurrencyCharacter(stateStr);
                }}
                diaglogVal={
                  selectValues.currencyCharacter
                    ? {
                        id: selectValues.currencyCharacter?.id,
                        name: selectValues.currencyCharacter?.name ?? "",
                        detail: undefined,
                      }
                    : {
                        id: entityData?.country_id,
                        name: entityData?.currencyCharacter,
                      }
                }
                setDialogVal={function (
                  value: React.SetStateAction<optionsDataT>
                ): void {}}
                fnSetModifyMode={function (id: string): void {}}
              />
              <Autocomplete
                defaultValue={entityData?.decimalPaces}
                options={decimalPlacesList}
                sx={{ maxWidth: 400 }}
                onChange={(event: any, newValue) => {
                  if (newValue === "Two Digits") {
                    setDisplayNumber("9,99,99,999.99");
                  } else {
                    setDisplayNumber("9,99,99,999.999");
                  }
                }}
                renderInput={(params) => (
                  <InputControl
                    {...params}
                    inputType={InputType.TEXT}
                    name="decimalPaces"
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
                  ((selectValues.currencyCharacter?.name ||
                    entityData.currencyCharacter) ??
                    "") +
                  " " +
                  displayNumber
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button sx={{ width: "10%", marginLeft: "5%" }}>
                <Link
                  href="/cap"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Quit
                </Link>
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "15%", marginLeft: "5%" }}
              >
                Submit
              </Button>
            </Box>
          </form>
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
