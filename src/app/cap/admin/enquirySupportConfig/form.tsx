"use client";

import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Typography } from "@mui/material";
import React, { useState } from "react";

export default function Dynamic() {
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [numberLength, setNumberLength] = useState<number | "">("");
  const [prefillWithZero, setPrefillWithZero] = useState<boolean>(false);
  // const [data, setData] = useState<object>({});

  // const obj = {prefix: String, suffix: String, numberLength: Number, prefillWithZero: Boolean}

  // setData(obj);

  const getDisplayValue = () => {
    if (numberLength) {
      const zeros = prefillWithZero ? "0".repeat(Number(numberLength)) : "";
      return `${prefix}${zeros}${suffix}`;
    }
    return "";
  };

  return (
    <form>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography>Prefix: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          label="Prefix"
          custLabel="Prefix"
          value={prefix}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrefix(e.target.value)
          }
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography>Suffix: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          label="Suffix"
          custLabel="Suffix"
          value={suffix}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSuffix(e.target.value)
          }
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography>Length of Digits: </Typography>
        <InputControl
          inputType={InputType.TEXT}
          custLabel="Number Length"
          type="number"
          value={numberLength}
          width="30px"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (!isNaN(Number(value)) || value === "") {
              setNumberLength(value === "" ? "" : Number(value));
            }
          }}
        />
        <Typography>Prefill with Zeros: </Typography>
        <InputControl
          inputType={InputType.CHECKBOX}
          //   custLabel="Prefill with Zeros"
          checked={prefillWithZero}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrefillWithZero(e.target.checked)
          }
        />
      </div>
      {/* <div>
        <InputControl
          inputType={InputType.CHECKBOX}
          custLabel="Prefill with Zeros"
          checked={prefillWithZero}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrefillWithZero(e.target.checked)}
        />
      </div> */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* <h3>Display Value:</h3> */}
        <Typography>Display Value: </Typography>
        {/* <div>{getDisplayValue()}</div> */}
        <InputControl
          id="displayValue"
          inputType={InputType.TEXT}
          name="Display Value:"
          value={getDisplayValue()}
          disabled
        />
      </div>
    </form>
  );
}
