"use client";

import React, { useState, useEffect } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/material";

export default function Voucher({config,setConfig,parentKey}:{config:any,setConfig:any,parentKey:string}) {

  const getDisplayValue = () => {
    const numLength = Number(config[parentKey]["voucher"]["length"]);

    if (numLength && numLength && !isNaN(numLength)) {
      const zeros = config[parentKey]["voucher"]["prefillWithZero"] ? "0".repeat(numLength) : "";
      return `${config[parentKey]["voucher"]["prefix"]}${zeros}${config[parentKey]["voucher"]["suffix"]}`;
    }
    return "";
  };

  return (
    <FormGroup>
       <Box style={{ display: "grid", width:"31.25rem", gap: "8px", columnGap: 3, gridTemplateColumns: "repeat(2, 2fr)" }}>
         <InputControl
          inputType={InputType.TEXT}
          id="Prefix"
          name="Prefix"
          label="Prefix"
          defaultValue={config[parentKey]["voucher"]["prefix"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                  { ...config[parentKey]["voucher"], ["prefix"]: e.target.value }
              }
            })
          }}
        />
        <InputControl
          inputType={InputType.TEXT}
          id="Suffix"
          name="Suffix"
          label="Suffix"
          defaultValue={config[parentKey]["voucher"]["suffix"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                  { ...config[parentKey]["voucher"], ["suffix"]: e.target.value }
              }
            })
          }}
          />
        <InputControl
          inputType={InputType.TEXT}
          id="Length"
          name="Length"
          label="Digit Length"
          defaultValue={config[parentKey]["voucher"]["length"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                  { ...config[parentKey]["voucher"], ["length"]: e.target.value }
              }
            })
          }}
        />
        <InputControl
          inputType={InputType.CHECKBOX}
          id="PrefillWithZero"
          name="PrefillWithZero"
          custLabel="Prefill with Zero"
          checked={config[parentKey]["voucher"]["prefillWithZero"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config, [parentKey]: {
                ...config[parentKey], ["voucher"]:
                { ...config[parentKey]["voucher"], ["prefillWithZero"]: e.target.checked}
              }
            })
          }}
        />
        <InputControl
          inputType={InputType.TEXT}
          id="displayValue"
          name="Display Value:"
          label="Display Value"
          value={getDisplayValue()}
          disabled
        />
    </Box>
    </FormGroup>
  );
}