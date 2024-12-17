"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import { currencySchemaT, selectKeyValueT } from "@/app/models/models";
import Seperator from "../../seperator";
import Snackbar from "@mui/material/Snackbar";
import { masterFormPropsWithDataT } from "@/app/models/models";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Portal,
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
import { usePathname } from "next/navigation";

export default function CurrencyForm(props: masterFormPropsWithDataT<currencySchemaT>) {
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [currencySystem, setCurrencySystem] = useState(props.data ? props.data.currency_system : "ind");
  const [decimalPlaces, setDecimalPlaces] = useState(props.data ? props.data.decimal_places : "2");
  const [symbol, setSymbol] = useState("");
  const [sample, setSample] = useState("");
  const entityData: currencySchemaT = props.data ? props.data : {} as currencySchemaT;
  const pathName = usePathname();
  const [formKey, setFormKey] = useState(0);
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
      // setTimeout(() => {
      //   props.setDialogOpen ? props.setDialogOpen(false) : null;
      // }, 1000);
      if (pathName !== "/cap/admin/lists/currencyList" || entityData.id) {
        setTimeout(() => {
          props.setDialogOpen ? props.setDialogOpen(false) : null;
        }, 1000);
      } else {
        setFormKey(formKey + 1); 
        setSample("");
        // setFormError({});
      }
    } else {
      const issues = result.data;

      const errorState: Record<string, { msg: string; error: boolean }> = {};
      errorState["form"] = { msg: "Error encountered", error: true };
      for (const issue of issues) {
        errorState[issue.path] = { msg: issue.message, error: true };
        if (issue.path === 'refresh') {
          errorState["form"] = { msg: issue.message, error: true };
        }
      }
      setFormError(errorState);
    }
  };

  async function persistEntity(data: currencySchemaT) {
    let result;

    if (entityData?.id) {
      data["id"] = entityData.id;
      data["stamp"] = entityData.stamp;
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
    <>
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
      <Box id="currencyForm" sx={{m : 1, p : 3}}>
        <form key={formKey} action={handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                autoFocus
                inputType={InputType.TEXT}
                id="Symbol"
                label="Currency Symbol"
                name="symbol"
                fullWidth
                required
                titleCase={true}
                defaultValue={entityData.symbol}
                error={formError?.symbol?.error}
                helperText={formError?.symbol?.msg}
 setFormError={setFormError}
                onChange={onSymbolChange}
                // onKeyDown={() => {
                //   setFormError((curr) => {
                //     const { symbol, ...rest } = curr;
                //     return rest;
                //   });
                // }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                inputType={InputType.TEXT}
                id="Name"
                label="Name"
                name="name"
                required
                defaultValue={entityData.name}
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
 setFormError={setFormError}
                // onKeyDown={() => {
                //   setFormError((curr) => {
                //     const { name, ...rest } = curr;
                //     return rest;
                //   });
                // }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                id="shortForm"
                label="Currency Short Form"
                inputType={InputType.TEXT}
                name="shortForm"
                style={{ width: "100%" }}
                defaultValue={entityData.shortForm}
                error={formError?.shortForm?.error}
                helperText={formError?.shortForm?.msg}
 setFormError={setFormError}
                // onKeyDown={() => {
                //   setFormError((curr) => {
                //     const { shortForm, ...rest } = curr;
                //     return rest;
                //   });
                // }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
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
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <FormControl
                size="small"
                sx={{
                  marginTop: "1.3vh",
                  width: "100%"
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
                >
                  <MenuItem value={2}>Two Digits</MenuItem>
                  <MenuItem value={3}>Three Digits</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputControl
                id="Sample"
                inputType={InputType.TEXT}
                name="Sample"
                value={sample}
                disabled
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button onClick={handleCancel} tabIndex={-1}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "15%", marginLeft: "5%" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Portal>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Portal>
      </Box>
    </>
  );
}
