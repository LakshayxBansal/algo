"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import {
  companySchemaT,
  masterFormPropsT,
  masterFormPropsWithDataT,
  optionsDataT,
  selectKeyValueT,
} from "@/app/models/models";
import {
  createCompany,
  getCountryByIp,
  updateCompany,
} from "../controllers/company.controller";
import Seperator from "../Widgets/seperator";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import {
  getCountriesMaster,
  getStates,
  getStatesMaster,
} from "../controllers/masters.controller";
import { Collapse, IconButton, Grid, Portal } from "@mui/material";
import AutocompleteDB from "../Widgets/AutocompleteDB";

export default function CreateCompany(
  props: masterFormPropsWithDataT<companySchemaT>
) {
  const router = useRouter();
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [defaultCountry, setdefaultCountry] = useState("");
  const [defaultCountryId, setdefaultCountryId] = useState(0);
  const entityData: companySchemaT = props.data
    ? props.data
    : ({} as companySchemaT);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const countryData = await getCountryByIp();

        if (countryData) {
          setdefaultCountry(countryData.country);
          setdefaultCountryId(countryData.countryId);
        } else {
          setdefaultCountry("");
          setdefaultCountryId(0);
          setFormError({
            form: {
              msg: "Failed to fetch country data. Please insert data manually.",
              error: true,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
        setFormError({
          form: {
            msg: "Failed to fetch country data. Please try again later.",
            error: true,
          },
        });
      }
    };
    fetchCountryData();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    formData = updateFormData(data);

    const result = await persistEntity(data as companySchemaT);
    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };
      props.setDialogValue ? props.setDialogValue(newVal) : null;
      setFormError({});
      setSnackOpen(true);
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
        if (props?.setDialogOpen === undefined) {
          router.push("/company");
        }
      }, 1000);
    } else {
      const issues = result.data;
      // show error on screen
      const errorState: Record<string, { msg: string; error: boolean }> = {};
      for (const issue of issues) {
        for (const path of issue.path) {
          errorState[path] = { msg: issue.message, error: true };
        }
      }
      errorState["form"] = { msg: "Error encountered", error: true };
      setFormError(errorState);
    }
  };

  const handleCancel = () => {
    props.setDialogOpen ? props.setDialogOpen(false) : null;
  };

  const updateFormData = (data: any) => {
    data.country_id = selectValues.country
      ? selectValues.country.id
      : entityData.country
      ? entityData.country_id
      : 0;
    data.state_id = selectValues.state
      ? selectValues.state.id
      : entityData.state
      ? entityData.state_id
      : 0;

    return data;
  };

  async function persistEntity(data: companySchemaT) {
    let result;
    if (entityData?.id) {
      data = { ...data, id: entityData.id };

      result = await updateCompany(data);
    } else {
      result = await createCompany(data);
    }

    return result;
  }

  const clearFormError = () => {
    setFormError((curr) => {
      // remove form key from object
      const { form, ...rest } = curr;

      return rest;
    });
  };
  return (
    <>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "600px",
          },
          // padding: "10px",
        }}
      >
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
        <Box id="companyForm" sx={{ m: 1 }}>
          <form action={handleSubmit} noValidate>
            {/* <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
              paddingBottom: "10px",
            }}
          > */}
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InputControl
                  inputType={InputType.TEXT}
                  autoFocus
                  id="name"
                  label="Name"
                  name="name"
                  required
                  titleCase={true}
                  style={{ width: "100%" }}
                  error={formError?.name?.error}
                  helperText={formError?.name?.msg}
                  setFormError={setFormError}
                  defaultValue={entityData.name}
                  FormHelperTextProps={{
                    sx: { backgroundColor: "white", margin: 0 },
                  }}
                  sx={{ height: "fit-content" }}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { name, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InputControl
                  inputType={InputType.TEXT}
                  id="alias"
                  label="Alias"
                  name="alias"
                  style={{ width: "100%" }}
                  error={formError?.alias?.error}
                  helperText={formError?.alias?.msg}
                  setFormError={setFormError}
                  defaultValue={entityData.alias}
                  sx={{ height: "fit-content" }}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { alias, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InputControl
                  inputType={InputType.TEXT}
                  label="Address Line 1"
                  name="add1"
                  id="add1"
                  style={{ width: "100%" }}
                  error={formError?.add1?.error}
                  helperText={formError?.add1?.msg}
                  defaultValue={entityData.add1}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { add1, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InputControl
                  inputType={InputType.TEXT}
                  label="Address Line 2"
                  name="add2"
                  id="add2"
                  style={{ width: "100%" }}
                  error={formError?.add2?.error}
                  helperText={formError?.add2?.msg}
                  defaultValue={entityData.add2}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { add2, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InputControl
                  inputType={InputType.TEXT}
                  name="city"
                  id="city"
                  label="City"
                  style={{ width: "100%" }}
                  error={formError?.city?.error}
                  helperText={formError?.city?.msg}
                  defaultValue={entityData.city}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { city, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InputControl
                  inputType={InputType.TEXT}
                  name="pincode"
                  id="pincode"
                  label="Pin Code"
                  style={{ width: "100%" }}
                  error={formError?.pincode?.error}
                  helperText={formError?.pincode?.msg}
                  defaultValue={entityData.pincode}
                  onKeyDown={() => {
                    setFormError((curr) => {
                      const { pincode, ...rest } = curr;
                      return rest;
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AutocompleteDB
                  name={"country"}
                  id={"country"}
                  label={"Country"}
                  required
                  onChange={(e, val, s) => {
                    setSelectValues({ country: val, state: null });
                    entityData.country_id = undefined;
                    entityData.country = "";
                    entityData.state_id = undefined;
                    entityData.state = "";
                  }}
                  // width={352}
                  // width={{ xs: "100%", sm: 290, md: 290 }}
                  formError={formError?.country}
                  fetchDataFn={getCountriesMaster}
                  diaglogVal={
                    entityData.country
                      ? {
                          id: entityData.country_id,
                          name: entityData.country,
                        }
                      : selectValues.country
                      ? {
                          id: selectValues.country?.id,
                          name: selectValues.country?.name ?? "",
                        }
                      : ({
                          id: defaultCountryId,
                          name: defaultCountry,
                        } as optionsDataT)
                  }
                  setDialogVal={function (
                    value: React.SetStateAction<optionsDataT>
                  ): void {}}
                  fnSetModifyMode={function (id: string): void {}}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {/* <div style={{ width: '100%' }}> */}
                <AutocompleteDB
                  name={"state"}
                  id={"state"}
                  label={"State"}
                  // width={31.5rem}
                  // width="stretch"
                  // width={275}
                  // style={{ width: '100%' }}
                  // width={{ xs: "100%", sm: 290, md: 290 }}
                  onChange={(e, val, s) => {
                    setSelectValues({ ...selectValues, state: val });
                    entityData.state_id = undefined;
                    entityData.state = "";
                  }}
                  fetchDataFn={(stateStr: string) => {
                    const country =
                      selectValues.country?.name ?? entityData.country;
                    return getStatesMaster(stateStr, country);
                  }}
                  disable={
                    selectValues.country || entityData.country ? false : true
                  }
                  diaglogVal={
                    selectValues.state
                      ? {
                          id: selectValues.state?.id,
                          name: selectValues.state?.name ?? "",
                          detail: undefined,
                        }
                      : ({
                          id: entityData.state_id,
                          name: entityData.state,
                        } as optionsDataT)
                  }
                  setDialogVal={function (
                    value: React.SetStateAction<optionsDataT>
                  ): void {}}
                  fnSetModifyMode={function (id: string): void {}}
                />
                {/* </div> */}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 0.5,
                }}
              >
                <Button
                  onClick={() => {
                    if (props?.setDialogOpen === undefined) {
                      router.push("/signin");
                    } else {
                      handleCancel();
                    }
                  }}
                  tabIndex={-1}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
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
              autoHideDuration={1000}
              onClose={() => setSnackOpen(false)}
              message="Record Saved!"
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
          </Portal>
        </Box>
      </Box>
    </>
  );
}
