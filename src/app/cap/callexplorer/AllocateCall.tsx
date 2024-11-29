import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import AutocompleteDB from "../../Widgets/AutocompleteDB";
import { getExecutive } from "../../controllers/executive.controller";
import {
  masterFormPropsT,
  optionsDataT,
  selectKeyValueT,
} from "../../models/models";
import { useEffect, useState } from "react";
import Seperator from "../../Widgets/seperator";
import CloseIcon from "@mui/icons-material/Close";
import {
  getCallEnquiryDetails,
  getCallSupportDetails,
  updateCallAllocation,
  updateSupportCallAllocation,
} from "../../controllers/callExplorer.controller";
import { handleRefresh } from "./AutoGrid";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { adjustToLocal } from "@/app/utils/utcToLocal";
import { set } from "lodash";

interface customprop extends masterFormPropsT {
  setRefresh: (props: any) => void;
  formName: string;
}

export default function AllocateCall(props: customprop) {
  const [selectValues, setSelectValues] = useState<selectKeyValueT>({});
  const [formError, setFormError] = useState<
    Record<string, { msg: string; error: boolean }>
  >({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [remarkHistory, setRemarkHistroy] = useState("");

  useEffect(() => {
    async function getEnquiries() {
      let ledgerData;
      let suggested_action_remark = "";

      if (props.formName === "enquiry") {
        ledgerData = await getCallEnquiryDetails(props.data[0]);
      } else {
        ledgerData = await getCallSupportDetails(props.data[0]);
      }
      for (let i = 0; i < ledgerData.length; i++) {
        if (ledgerData[i].suggested_action_remark) {
          suggested_action_remark += `Suggested Action Remarks:- ${adjustToLocal(
            ledgerData[i].date
          )
            .toDate()
            .toString()
            .slice(0, 15)} ; ${ledgerData[i].suggested_action_remark} \n`;
        }
        if (ledgerData[i].action_taken_remark) {
          suggested_action_remark += `Action Taken Remarks:- ${adjustToLocal(
            ledgerData[i].date
          )
            .toDate()
            .toString()
            .slice(0, 15)} ; ${ledgerData[i].action_taken_remark} \n`;
        }
      }

      setRemarkHistroy(suggested_action_remark);
    }
    if (props?.data.length > 1) {
      setRemarkHistroy("Multiple Calls are Selected");
    } else {
      getEnquiries();
    }
  }, [props.formName]);

  const handleSubmit = async (formData: FormData) => {
    let data: { [key: string]: any } = {}; // Initialize an empty object

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data.contactGroup_id = selectValues.contactGroup
      ? selectValues.contactGroup.id
      : 0;
    let result;
    if (props.formName === "enquiry") {
      result = await updateCallAllocation(
        selectValues.executive.id,
        data.remark,
        props.data
      );
    } else {
      result = await updateSupportCallAllocation(
        selectValues.executive.id,
        data.remark,
        props.data
      );
    }
    if (result > 0) {
      setSnackOpen(true);
      handleRefresh();
      setTimeout(() => {
        props.setDialogOpen ? props.setDialogOpen(false) : null;
      }, 1000);
      setFormError({});
      props.setRefresh((prev: boolean) => {
        !prev;
      });
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

  const clearFormError = () => {
    setFormError((curr) => {
      const { form, ...rest } = curr;
      return rest;
    });
  };
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: "0px",
          width: { xs: "100%", sm: "90%", md: "700px" },
          zIndex: 2,
          paddingY: "10px",
          bgcolor: "white",
        }}
      >
        <Seperator>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>Remark History</Box>
            <IconButton onClick={handleCancel} tabIndex={-1}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Seperator>
        {/* InputControl for Remarks */}
        <InputControl
          multiline
          inputType={InputType.TEXTFIELD}
          name="remarks_history"
          id="remarks_history"
          value={remarkHistory}
          rows={6}
          fullWidth
          disabled
        />

        <Seperator>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            Allocate Executive
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
      <Box id="sourceForm" sx={{ p: 3 }}>
        <form action={handleSubmit}>
          <Paper elevation={3} sx={{ p: 2 }} square={false}>
            <Box>
              <AutocompleteDB
                name={"executive"}
                id={"executive"}
                label={"Executive"}
                onChange={(e, val, s) =>
                  setSelectValues({ ...selectValues, executive: val })
                }
                width={"100%"}
                fetchDataFn={getExecutive}
                diaglogVal={{
                  id: selectValues.executive?.id,
                  name: selectValues.executive?.name,
                  detail: undefined,
                }}
                setDialogVal={function (
                  value: React.SetStateAction<optionsDataT>
                ): void {}}
                fnSetModifyMode={function (id: string): void {}}
              />
              {/* <InputControl
                            inputType={InputType.TEXT}
                            name="remark"
                            id="remark"
                            label="Remark"
                            fullWidth
                            value={remark}
                            onChange={(e: any) => setRemark(e.target.value)}
                        /> */}
              {props.data.length <= 1 && (
                <TextField
                  name="remark"
                  id="remark"
                  label="Remark"
                  fullWidth
                  rows={3}
                  value={remark}
                  onChange={(e: any) => setRemark(e.target.value)}
                  multiline={true}
                  maxRows={3}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleCancel} tabIndex={-1}>
                Cancel
              </Button>
              {
                <Tooltip
                  title={
                    selectValues.executive && remark
                      ? ""
                      : "Please fill both fields"
                  }
                  placement="top"
                >
                  <span>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: "15%", marginLeft: "5%" }}
                      disabled={!selectValues.executive}
                    >
                      Submit
                    </Button>
                  </span>
                </Tooltip>
              }
            </Box>
          </Paper>
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
