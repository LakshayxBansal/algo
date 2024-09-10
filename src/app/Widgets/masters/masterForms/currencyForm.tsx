"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { currencySchemaT, selectKeyValueT } from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsT } from "@/app/models/models";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  createCurrency,
  updateCurrency,
} from "@/app/controllers/currency.controller";

export default function CurrencyForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [currencySystem, setCurrencySystem] = useState("ind");
  const [decimalPlaces, setDecimalPlaces] = useState("2");
  const [symbol, setSymbol] = useState("");
  const [sample, setSample] = useState("");
  const entityData: currencySchemaT = props.data ? props.data : {};

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log(data);

    const result = await persistEntity(data as currencySchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal.name) : null;
      props.setDialogOpen ? props.setDialogOpen(false) : null;
      setFormError({});
      setSnackOpen(true);
    } else {
      // console.log(result);

      const issues = result.data;
      // console.log(issues);

      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        errorState[issue.path] = { msg: issue.message, error: true };
      }
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  async function persistEntity(data: currencySchemaT) {
    let result;

    if (entityData?.id) {
      data["id"] = entityData.id;
      result = await updateCurrency(data);
    } else {
      result = await createCurrency(data);
    }
    return result;
  }
  const handleSystemChange = (event: SelectChangeEvent) => {
    setCurrencySystem(event.target.value as string);
  };

  const handleDecimalChange = (event: SelectChangeEvent) => {
    setDecimalPlaces(event.target.value as string);
  };

  const onSymbolChange = (event: SelectChangeEvent) => {
    setSymbol(event.target.value as string);
  };

  useEffect(() => {
    let formattedNumber;
    if (currencySystem == "int") {
      let number = "1000000000";
      formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setSample(symbol + formattedNumber);
    } else {
      const formatIndianNumber = (number: string) => {
        let numberString = number.toString();
        let lastThreeDigits = numberString.slice(-3);
        let otherDigits = numberString.slice(0, -3);

        if (otherDigits !== "") {
          lastThreeDigits = "," + lastThreeDigits;
        }

        let formattedNumber =
          otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;
        return formattedNumber;
      };

      let number = "1000000000";
      formattedNumber = formatIndianNumber(number);
    }
    if (decimalPlaces == "2") {
      let finalString = symbol.trim() + formattedNumber + ".00";
      setSample(finalString);
    } else {
      let finalString = symbol + formattedNumber + ".000";
      setSample(finalString);
    }
  }, [symbol, decimalPlaces, currencySystem]);

  return (
    <Paper sx={{ margin: "auto", width: "37vw" }}>
      <Seperator>
        {entityData.id ? "Update Currency" : "Add Currency"}
      </Seperator>
      <Box id="sourceForm" sx={{ m: 2, p: 3 }}>
        {formError?.form?.error && (
          <p style={{ color: "red" }}>{formError?.form.msg}</p>
        )}
        <form action={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(1, 1fr)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <InputControl
                autoFocus
                id="Symbol"
                label="Currency Symbol"
                inputType={InputType.TEXT}
                name="Symbol"
                defaultValue={entityData.Symbol}
                error={formError?.Symbol?.error}
                helperText={formError?.Symbol?.msg}
                onChange={onSymbolChange}
              />
              <InputControl
                autoFocus
                id="Name"
                label="Name"
                inputType={InputType.TEXT}
                name="Name"
                // defaultValue={entityData.Name}
                // error={formError?.Name?.error}
                // helperText={formError?.Name?.msg}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                // border: "1px solid black",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <InputControl
                autoFocus
                id="shortForm"
                label="Currency Short Form"
                inputType={InputType.TEXT}
                name="ShortForm"
                // defaultValue={entityData.ShortForm}
                // error={formError?.ShortForm?.error}
                // helperText={formError?.ShortForm?.msg}
              />
              <FormControl
                fullWidth
                size="small"
                sx={{ marginTop: "0.9vh", width: "46.2%" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Currency System
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="currency_system"
                  value={currencySystem}
                  label="Currency System"
                  onChange={handleSystemChange}
                >
                  <MenuItem value="ind">Indian</MenuItem>
                  <MenuItem value="int">International</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <InputControl
              autoFocus
              id="placeValueSystem"
              label="Currency Place Value System"
              inputType={InputType.TEXT}
              name="placeValueSystem"
              defaultValue={entityData.name}
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
            /> */}

            <FormControl
              fullWidth
              size="small"
              sx={{ marginTop: "1.3vh", width: "46.2%" }}
            >
              <InputLabel id="decimal-places-label">Decimal Places</InputLabel>
              <Select
                labelId="decmal-place-label"
                id="decimal-place"
                datatype="number"
                name="decimal_places"
                value={decimalPlaces}
                label="Decimal Places"
                onChange={handleDecimalChange}
                sx={{ height: "6.1vh" }}
              >
                <MenuItem value={2}>Two Digits</MenuItem>
                <MenuItem value={3}>Three Digits</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {/* <Box
              sx={{
                mt: 1,
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                border: "1px solid blue",
                padding: "10px",
              }}
            >
              {sample}
            </Box> */}
            <InputControl
              autoFocus
              id="Sample"
              // label="Sample"
              inputType={InputType.TEXT}
              name="Sample"
              // defaultValue={sample}
              value={sample}
              // error={formError?.Name?.error}
              // helperText={formError?.Name?.msg}
              disabled
            />

            {/* sx={{
                mt: 3,
                display: "grid",
              }}
              defaultValue={sample}
              disabled
            > */}
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Record Saved!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Paper>
  );
}
