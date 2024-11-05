"use client";
import React from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import FormGroup from "@mui/material/FormGroup";
import { Typography } from "@mui/material";

interface field {
  id: string;
  name: string;
  value: any;
}

interface DynamicProps {
  prefix: field;
  suffix: field;
  length: field;
  prefillWithZero: field;
  onChange: (name: string, dataType: string, value: any) => void;
}

export default function Dynamic(props: DynamicProps) {
  const { prefix, suffix, length, prefillWithZero } = props;
  console.log("props : ", props);

  const getDisplayValue = () => {
    const numLength = Number(length.value);

    if (length && length.value && !isNaN(numLength)) {
      const zeros = prefillWithZero.value ? "0".repeat(numLength) : "";
      return `${prefix.value}${zeros}${suffix.value}`;
    }
    return "";
  };

  return (
    <FormGroup>
      <div style={{ display: "flex", alignItems: "left", gap: "8px" }}>
        <Typography>Prefix: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          id={prefix.id}
          name={prefix.name}
          custLabel="Prefix"
          value={prefix.value || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log("bbbb : ", prefix.name, e.target.value);
            props.onChange(prefix.name, "text", e.target.value);
          }}
        />
      </div>
      <div>
        <Typography>Suffix: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          id={suffix.id}
          name={suffix.name}
          custLabel="Suffix"
          value={suffix.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(suffix.name, "", e.target.value)
          }
        />
        <Typography>Length of Digits: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          id={length.id}
          name={length.name}
          custLabel="Length"
          value={length.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(length.name, "", e.target.value);
          }}
        />
        <Typography>Prefill with Zero: </Typography>
        <InputControl
          inputType={InputType.CHECKBOX}
          id={prefillWithZero.id}
          name={prefillWithZero.name}
          checked={prefillWithZero.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(prefillWithZero.name, "", e.target.checked);
            console.log("check : ", e.target.value);
          }}
        />
        <Typography>Display Value: </Typography>
        <InputControl
          id="displayValue"
          inputType={InputType.TEXT}
          name="Display Value:"
          value={getDisplayValue()}
          disabled
        />
      </div>
    </FormGroup>
  );
}
