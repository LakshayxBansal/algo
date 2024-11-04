"use client";
import React from "react";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import FormGroup from "@mui/material/FormGroup";
import { Typography } from "@mui/material";

interface VoucherSettings {
  prefix: string;
  suffix: string;
  length: number;
  prefillWithZero: boolean;
  parent: string;
}

interface DynamicProps {
  settings: VoucherSettings;
  setSettings: React.Dispatch<React.SetStateAction<VoucherSettings>>;
  label: string;
  parent: string;
}
// const getDisplayValue = () => {
//   if (numberLength) {
//     const zeros = prefillWithZero ? "0".repeat(Number(numberLength)) : "";
//     return `${prefix}${zeros}${suffix}`;
//   }
//   return "";
// };

const Dynamic: React.FC<DynamicProps> = ({ settings, setSettings, label }) => {
  const { prefix, suffix, length, prefillWithZero, parent } = settings;

  const getDisplayValue = () => {
    if (length) {
      const zeros = prefillWithZero ? "0".repeat(Number(length)) : "";
      return `${prefix}${zeros}${suffix}`;
    }
    return "";
  };
  return (
    <FormGroup>
      <h3>{label}</h3>
      <div style={{ display: "flex", alignItems: "left", gap: "8px" }}>
        <Typography>Prefix: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          id="prefix"
          name={`${parent}Prefix`}
          custLabel="Prefix"
          value={settings.prefix}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({ ...settings, prefix: e.target.value })
          }
        />
      </div>
      <div>
        <Typography>Suffix: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          id="suffix"
          name={`${parent}Suffix`}
          custLabel="Suffix"
          value={settings.suffix}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({ ...settings, suffix: e.target.value })
          }
        />
        <Typography>Length of Digits: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          id="length"
          name={`${parent}Length`}
          custLabel="Length of Digits"
          value={settings.length}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({ ...settings, length: Number(e.target.value) })
          }
        />
        <Typography>Prefill with Zero: </Typography>
        <InputControl
          inputType={InputType.CHECKBOX}
          id="prefillWithZero"
          name={`${parent}PrefillWithZero`}
          // custLabel="Prefill with Zero"
          checked={settings.prefillWithZero}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({ ...settings, prefillWithZero: e.target.checked })
          }
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
};

export default Dynamic;
