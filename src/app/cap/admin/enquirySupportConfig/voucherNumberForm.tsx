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
  const { setConfig, configName } = props;

  const getDisplayValue = () => {
    const numLength = Number(props.config.Length.value);

    if (numLength && numLength && !isNaN(numLength)) {
      const zeros = props.config.PrefillWithZero.value ? "0".repeat(numLength) : "";
      return `${props.config.Prefix.value}${zeros}${props.config.Suffix.value}`;
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
          id={props.config.Prefix.id}
          name={props.config.Prefix.name}
          label="Prefix"
          defaultValue={props.config.Prefix.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "Prefix", e.target.value);
          }}
        />
        <InputControl
          inputType={InputType.TEXT}
          id={props.config.Suffix.id}
          name={props.config.Suffix.name}
          label="Suffix"
          defaultValue={props.config.Suffix.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "Suffix", e.target.value);
          }}
          />
        <InputControl
          inputType={InputType.TEXT}
          id={props.config.Length.id}
          name={props.config.Length.name}
          label="Digit Length"
          defaultValue={props.config.Length.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "Length", e.target.value);
          }}
        />
        <InputControl
          inputType={InputType.CHECKBOX}
          id={props.config.PrefillWithZero.id}
          name={props.config.PrefillWithZero.name}
          custLabel="Prefill with Zero"
          checked={props.config.PrefillWithZero.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(configName, "PrefillWithZero", e.target.checked);
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