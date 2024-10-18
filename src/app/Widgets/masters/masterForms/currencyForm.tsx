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
import { Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function CurrencyForm(props: masterFormPropsT) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [currencySystem, setCurrencySystem] = useState(props.data ? props.data.currency_system : "ind");
  const [decimalPlaces, setDecimalPlaces] = useState(props.data ? props.data.decimal_places : "2");
  const [symbol, setSymbol] = useState("");
  const [sample, setSample] = useState("");
  const entityData: currencySchemaT = props.data ? props.data : {};

  // if (props.data) {
  //   setCurrencySystem(entityData.currency_system);
  //   setDecimalPlaces(entityData.decimal_places);
  // }

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const result = await persistEntity(data as currencySchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
      setFormError({});
      setSnackOpen(true);
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
    } else {
      const issues = result.data;

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
      console.log(entityData);
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

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };

  return (
    <Paper sx={{ margin: "auto", width: "37vw" }}>
      <Box
        sx={{
          position: "sticky",
          top: 2,
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {entityData.id ? "Update Currency" : "Add Currency"}
            <IconButton onClick={handleCancel} tabIndex={-1}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Seperator>
      </Box>
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
      <Box id="currencyForm" sx={{ mt: 2, p: 2 }}>
        <form action={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 0.5,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <InputControl
              autoFocus
              inputType={InputType.TEXT}
              id="Symbol"
              label="Currency Symbol"
              name="symbol"
              fullWidth
              required
              defaultValue={entityData.symbol}
              error={formError?.symbol?.error}
              helperText={formError?.symbol?.msg}
              onChange={onSymbolChange}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { symbol, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <InputControl
              inputType={InputType.TEXT}
              id="Name"
              label="Name"
              name="name"
              fullWidth
              required
              defaultValue={entityData.name}
              error={formError?.name?.error}
              helperText={formError?.name?.msg}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { name, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <InputControl
              id="shortForm"
              label="Currency Short Form"
              inputType={InputType.TEXT}
              name="shortForm"
              fullWidth
              defaultValue={entityData.shortForm}
              error={formError?.shortForm?.error}
              helperText={formError?.shortForm?.msg}
              onKeyDown={() => {
                setFormError((curr) => {
                  const { shortForm, ...rest } = curr;
                  return rest;
                });
              }}
            />
            <FormControl
              fullWidth
              size="small"
              sx={{
                marginTop: "0.9vh",
              }}
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
            <FormControl
              fullWidth
              size="small"
              sx={{
                marginTop: "1.3vh",
              }}
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
            <InputControl
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
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <Button onClick={handleCancel} tabIndex={-1}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", marginLeft: "5%" }}
            >
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
