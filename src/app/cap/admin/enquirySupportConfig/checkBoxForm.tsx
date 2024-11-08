"use client";

import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import { Box, FormGroup } from "@mui/material";
import React, { ChangeEvent } from "react";

interface Field {
  id: string;
  name: string;
  custLabel: string;
  checked: boolean;
  group: string;
  disable: boolean | undefined;
}

interface CheckboxFormProps {
  config: any;
  onChange: any;
  parentName: string;
  configName: string;
  isParent: boolean;
}

const handleChange = (
  name: string,
  e: any,
  configName: string,
  parentName: string,
  isParent: boolean,
  onChange: any
) => {
  console.log("CHEKK : ", e.target.checked);

  if (isParent) {
    onChange((prev: any) => {
      const updatedConfig = { ...prev[configName] }; 
      const updatedParent = { ...updatedConfig[parentName], checked: e.target.checked }; 

      return {
        ...prev,
        [configName]: {
          ...updatedConfig,
          [parentName]: prev[configName][parentName].map((field: Field) =>
            ({ ...field, checked: e.target.checked })
          ),
          checkBoxData: updatedConfig.checkBoxData.map((field: Field) => ({
            ...field,
            checked: e.target.checked, 
            disable: !e.target.checked
          })),
        },
      };
    });
  } else {
    onChange((prev: any) => ({
      ...prev,
      [configName]: {
        ...prev[configName],
        checkBoxData: prev[configName].checkBoxData.map((field: Field) =>
          field.name === name ? { ...field, checked: e.target.checked } : field
        ),
      },
    }));
  }
};

export default function CheckBoxForm(props: CheckboxFormProps) {
  return (
    <Box sx={{}}>
      <FormGroup>
        {props.config[props.configName][props.parentName].map((field: Field, index: number) => (
          <InputControl
            key={index}
            inputType={InputType.CHECKBOX}
            id={field.name}
            name={field.name}
            custLabel={field.custLabel}
            checked={field?.checked || false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                field.name,
                e,
                props.configName,
                props.parentName,
                props.isParent,
                props.onChange
              )
            }
            disabled={field.disable}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
