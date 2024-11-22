"use client";

import React, { useState, useEffect } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/material";
import { configSchemaT } from "@/app/models/models";

export default function Voucher({config,setConfig,parentKey,formError,setFormError}:{config:configSchemaT,setConfig:React.Dispatch<React.SetStateAction<configSchemaT>>,parentKey: keyof configSchemaT,formError : Record<string, { msg: string; error: boolean }>, setFormError : React.Dispatch<React.SetStateAction<Record<string, { msg: string; error: boolean }>>>}) {

  const getDisplayValue = () => {
    const numLength = Number(config[parentKey]["voucher"]?.["length"]);

    if (numLength && numLength && !isNaN(numLength)) {
      const zeros = config[parentKey]["voucher"]?.["prefillWithZero"] ? "0".repeat(numLength) : "";
      return `${config[parentKey]["voucher"]?.["prefix"]}${zeros}${config[parentKey]["voucher"]?.["suffix"]}`;
    }
    return "";
  };

  return (
    <FormGroup>
       <Box style={{ display: "grid", width:"31.25rem", gap: "8px", columnGap: 3, gridTemplateColumns: "repeat(2, 2fr)" }}>
         <InputControl
          inputType={InputType.TEXT}
          id={`${parentKey}_voucher_prefix`}
          name={`${parentKey}_voucher_prefix`}
          label="Prefix"
          error={formError?.[`${parentKey}_voucher_prefix`]?.error}
          helperText={formError?.[`${parentKey}_voucher_prefix`]?.msg}
          defaultValue={config[parentKey]["voucher"]?.["prefix"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                  { ...config[parentKey]["voucher"], ["prefix"]: e.target.value }
              }
            })
          }}
          disabled={!config[parentKey]["reqd"]}
        />
        <InputControl
          inputType={InputType.TEXT}
          id={`${parentKey}_voucher_suffix`}
          name={`${parentKey}_voucher_suffix`}
          label="Suffix"
          error={formError?.[`${parentKey}_voucher_suffix`]?.error}
          helperText={formError?.[`${parentKey}_voucher_suffix`]?.msg}
          defaultValue={config[parentKey]["voucher"]?.["suffix"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                  { ...config[parentKey]["voucher"], ["suffix"]: e.target.value }
              }
            })
          }}
          disabled={!config[parentKey]["reqd"]}
          />
        <InputControl
          inputType={InputType.TEXT}
          id={`${parentKey}_voucher_length`}
          name={`${parentKey}_voucher_length`}
          label="Digit Length"
          error={formError?.[`${parentKey}_voucher_length`]?.error}
          helperText={formError?.[`${parentKey}_voucher_length`]?.msg}
          defaultValue={config[parentKey]["voucher"]?.["length"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                  { ...config[parentKey]["voucher"], ["length"]: e.target.value }
              }
            })
          }}
          disabled={!config[parentKey]["reqd"]}
        />
        <InputControl
          inputType={InputType.CHECKBOX}
          id={`${parentKey}_voucher_prefillWithZero`}
          name={`${parentKey}_voucher_prefillWithZero`}
          custLabel="Prefill with Zero"
          checked={config[parentKey]["voucher"]?.["prefillWithZero"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                { ...config[parentKey]["voucher"], ["prefillWithZero"]: e.target.checked}
              }
            })
          }}
          disabled={!config[parentKey]["reqd"]}
        />
        <InputControl
          inputType={InputType.TEXT}
          id={`${parentKey}_voucher_displayValue`}
          name={`${parentKey}_voucher_displayValue`}
          label="Display Value"
          value={getDisplayValue()}
          disabled
        />
    </Box>
    </FormGroup>
  );
}