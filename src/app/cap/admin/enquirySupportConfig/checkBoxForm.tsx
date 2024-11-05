"use client";

import { enquiryConfigSchemaT } from "@/app/models/models";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { enquirySupportConfig } from "@/app/zodschema/zodschema";
import { Box, FormGroup } from "@mui/material";
import React, { ChangeEvent } from "react";

interface Field {
  id: string;
  name: string;
  custLabel: string;
  checked: boolean;
  // group: keyof typeof enquirySupportConfig,
  group: string;
  disable: boolean | undefined;
}

interface CheckboxFormProps {
  fields: Field[];
  type: string;
  onChange: (name: string, dataType: string, checked: boolean) => void;
}

export default function CheckBoxForm(props: CheckboxFormProps) {
  return (
    <Box sx={{}}>
      <FormGroup>
        {props.fields.map((field, index) => (
          <InputControl
            key={index}
            inputType={InputType.CHECKBOX}
            id={field.name}
            name={field.name}
            custLabel={field.custLabel}
            checked={field.checked}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              props.onChange(field.name, "checkBox", !field.checked)
            }
            disabled={!field.disable}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
