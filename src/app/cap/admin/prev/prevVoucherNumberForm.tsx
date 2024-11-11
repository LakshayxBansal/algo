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
      <div style={{ display: "grid", width:"31.25rem", gap: "8px", columnGap: 3, gridTemplateColumns: "repeat(2, 2fr)" }}>
         <InputControl
          inputType={InputType.TEXT}
          id={prefix.id}
          name={prefix.name}
          label="Prefix"
          value={prefix.value || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log("bbbb : ", prefix.name, e.target.value);
            props.onChange(prefix.name, "text", e.target.value);
          }}
        />
        <InputControl
          inputType={InputType.TEXT}
          id={suffix.id}
          name={suffix.name}
          label="Suffix"
          value={suffix.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(suffix.name, "", e.target.value)
          }
          />
        <InputControl
          inputType={InputType.TEXT}
          id={length.id}
          name={length.name}
          label="Digit Length"
          value={length.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(length.name, "", e.target.value);
          }}
        />
        {/* <Typography>Prefill With Zero:</Typography> */}
        <InputControl
          inputType={InputType.CHECKBOX}
          id={prefillWithZero.id}
          name={prefillWithZero.name}
          custLabel="Prefill with Zero"
          checked={prefillWithZero.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(prefillWithZero.name, "", e.target.checked);
            console.log("check : ", e.target.value);
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
      </div>
    </FormGroup>
  );
}
