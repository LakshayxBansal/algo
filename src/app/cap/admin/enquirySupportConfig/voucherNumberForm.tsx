"use client";

import React, { useState, useEffect } from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/material";

interface DynamicProps {
  config: any;  
  setConfig: any;
  configName: string; 
}

export default function Voucher(props: DynamicProps) {
  const { config, setConfig, configName } = props;

  const getDisplayValue = () => {
    const numLength = Number(config.Length.value);

    if (numLength && numLength && !isNaN(numLength)) {
      const zeros = config.PrefillWithZero.value ? "0".repeat(numLength) : "";
      return `${config.Prefix.value}${zeros}${config.Suffix.value}`;
    }
    return "";
  };

   const handleChange = (configName: string, inputName: string, value: any)=>{
    setConfig((prev: any)=>{
      const updatedConfig = { ...prev[configName][inputName] }; 
      return {
        ...prev,
        [configName]: {
          ...prev[configName],
          [inputName]: {...prev[configName][inputName], value: value}
        }
      }
    })
  }

  return (
    <FormGroup>
       <Box style={{ display: "grid", width:"31.25rem", gap: "8px", columnGap: 3, gridTemplateColumns: "repeat(2, 2fr)" }}>
         <InputControl
          inputType={InputType.TEXT}
          id={config.Prefix.id}
          name={config.Prefix.name}
          label="Prefix"
          defaultValue={config.Prefix.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "Prefix", e.target.value);
          }}
        />
        <InputControl
          inputType={InputType.TEXT}
          id={config.Suffix.id}
          name={config.Suffix.name}
          label="Suffix"
          defaultValue={config.Suffix.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "Suffix", e.target.value);
          }}
          />
        <InputControl
          inputType={InputType.TEXT}
          id={config.Length.id}
          name={config.Length.name}
          label="Digit Length"
          defaultValue={config.Length.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "Length", e.target.value);
          }}
        />
        <InputControl
          inputType={InputType.CHECKBOX}
          id={config.PrefillWithZero.id}
          name={config.PrefillWithZero.name}
          custLabel="Prefill with Zero"
          checked={config.PrefillWithZero.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "PrefillWithZero", e.target.value);
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
