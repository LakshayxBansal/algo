"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  getItemT,
  itemSchemaT,
  selectKeyValueT,
} from "../../../../../models/models";
import Grid from "@mui/material/Grid";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { SelectMasterWrapper } from "@/app/Widgets/masters/selectMasterWrapper";
import Seperator from "@/app/Widgets/seperator";
import { Snackbar } from "@mui/material";
import { getItemData } from "@/app/controllers/item.controller";
import { getUnit } from "@/app/controllers/unit.controller";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";
import { getItemGroup } from "@/app/controllers/itemGroup.controller";
import ItemGroupForm from "@/app/Widgets/masters/masterForms/itemGroupForm";
import { updateItem } from "@/app/controllers/item.controller";

export default function ModifyItemForm(props: {
  open: boolean;
  id: string;
  setDlgValue: Dispatch<SetStateAction<boolean>>;
}) {
  const [data, setData] = useState([{}] as any);

  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [snackOpen, setSnackOpen] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      const id: string = props.id;
      const con = await getItemData(id);
      setData(con.status ? con.data : ([{}] as getItemT));
    }
    if (JSON.stringify(data[0]) === "{}") {
      fetchData();
    }
  }, [data]);

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    formData = updateFormData(data);
    console.log("Update Form: ", formData);
    Object.assign(data, { id: props.id });
    // console.log(selectValues);

    const result = await updateEntity(data as itemSchemaT);

    if (result.status) {
      const newVal = { id: result.data[0].id, name: result.data[0].name };

      setTimeout(() => {
        props.setDlgValue ? props.setDlgValue(false) : null;
      }, 1000);
      setFormError({});
      setSnackOpen(true);
    } else {
      const issues = result.data;
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

  async function updateEntity(data: itemSchemaT) {
    const result = await updateItem(data);
    return result;
  }

  const updateFormData = (data: any) => {
    data.group = selectValues.itemGroup ? selectValues.itemGroup.id : 0;
    data.unit = selectValues.unit ? selectValues.unit.id : 0;
    return data;
  };

  const handleCancel = () => {
    props.setDlgValue(false);
  };

  if (JSON.stringify(data[0]) !== "{}") {
    return (
      <>
        <Seperator>Update Item</Seperator>
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
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <InputControl
                inputType={InputType.TEXT}
                autoFocus
                id="name"
                label="Name"
                name="name"
                required
                error={formError?.name?.error}
                helperText={formError?.name?.msg}
                defaultValue={data[0].name}
              />
              <InputControl
                inputType={InputType.TEXT}
                id="alias"
                label="Alias"
                name="alias"
                error={formError?.alias?.error}
                helperText={formError?.alias?.msg}
                defaultValue={data[0].alias}
              />
              <SelectMasterWrapper
                name={"itemGroup"}
                id={"itemGroup"}
                label={"Item"}
                width={210}
                dialogTitle={"Add Item"}
                fetchDataFn={getItemGroup}
                onChange={(e, val, s) =>
                  setSelectValues({ ...selectValues, itemGroup: val })
                }
                renderForm={(fnDialogOpen, fnDialogValue) => (
                  <ItemGroupForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                )}
              />
              <SelectMasterWrapper
                name={"unit"}
                id={"unit"}
                label={"Unit"}
                width={210}
                dialogTitle={"Add Unit"}
                // defaultValue={data[0].unit}
                onChange={(e, val, s) =>
                  setSelectValues({ ...selectValues, unit: val })
                }
                fetchDataFn={getUnit}
                renderForm={(fnDialogOpen, fnDialogValue) => (
                  <UnitForm
                    setDialogOpen={fnDialogOpen}
                    setDialogValue={fnDialogValue}
                  />
                )}
              />
              <InputControl
                inputType={InputType.TEXT}
                name="hsn_code"
                id="hsn_code"
                label="HSN Code"
                error={formError?.hsn_code?.error}
                helperText={formError?.hsn_code?.msg}
                defaultValue={data[0].hsn_code}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            ></Box>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            ></Box>
            <Box
              sx={{
                mt: 3,
                display: "grid",
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <Button>Upload File</Button>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
          <Snackbar
            open={snackOpen}
            autoHideDuration={1000}
            onClose={() => setSnackOpen(false)}
            message="Record Saved!"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Box>
      </>
    );
  }
  return (
    <>
      <h1>Data Not Found for selected ID</h1>
      <Button onClick={handleCancel}>Go Back</Button>
    </>
  );
}
