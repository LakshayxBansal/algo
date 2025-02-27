"use client";
import React, { useState, useRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Dayjs } from "dayjs";
import "dayjs/locale/en";
import {
  DatePickerProps,
  DateTimePicker,
  DateTimePickerProps,
  DateTimeValidationError,
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
  TimeValidationError,
} from "@mui/x-date-pickers";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/useField/useField.types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  CustomTextField,
  StyledTelInput,
} from "@/app/utils/styles/styledComponents";

// for number
// inputtype = TEXT
// type="number"
// decPlaces=2 // for 2 decimal places
// inputProps: {
//   min: 0,
//   max: 10,
//   style: { textAlign: "right" },
// },

export enum InputType {
  TEXT,
  CHECKBOX,
  DATEINPUT,
  TIMEINPUT,
  DATETIMEINPUT,
  EMAIL,
  PHONE,
  TEXTFIELD,
}
// Define the additional props for the base control
interface BaseControlProps {
  inputType: InputType;
  custLabel?: string;
  decPlaces?: number;
  // Add any additional props here
}

// (TextFieldProps | CheckboxProps | DatePickerProps<Dayjs>  )
// Create a type for the new custom control props
type CustomControlProps<T> = BaseControlProps & T;

//function to remove error 

function updateFormError(setFormError: any, fieldName: string) {
  setFormError((prevFormError: Record<string, any>) => {
    const updatedFormError = { ...prevFormError };

    if (updatedFormError["form"]) {
      delete updatedFormError["form"]; // Remove the 'form' property
    }

    return {
      ...updatedFormError,
      [fieldName]: {
        error: false,
        msg: "",
      },
    };
  });
}


// Define the base control component
export const InputControl: React.FC<CustomControlProps<any>> = ({
  inputType,
  custLabel = "",
  decPlaces,
  titleCase = false,
  setFormError,
  ...props
}) => {
  const [ifEmail, setIfEmail] = useState({ status: true, msg: "" });
  const [value, setValue] = React.useState(
    props.defaultValue ? props.defaultValue : ""
  );
  const inputRef = useRef<HTMLDivElement | null>(null);

  const prevKey = useRef("");
  const currentKey = useRef("")
   let  first = true;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    prevKey.current = currentKey.current;
    currentKey.current = event.key;    
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
  };

  if (inputRef.current) {
    const flagButton = inputRef.current.getElementsByClassName(
      "MuiTelInput-IconButton"
    )[0] as HTMLElement;
    
    if (flagButton) {
      flagButton.tabIndex = -1;
      flagButton.style.width = "2.188rem";
      flagButton.style.height = "0.813rem";
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (setFormError && props.error) {
      updateFormError(setFormError, props.name);
    }

    switch (inputType) {
      case InputType.TEXT: {
        const inputProps = props as TextFieldProps;
        if (titleCase && props.type !== "number") {
          //  event.target.value = capitalizeFirstChar(event.target.value);
          const currValue = event.target.value;
          const position = event.target.selectionStart;
          
          if (
            currValue.length === 1 ||
            (prevKey.current === " " &&
              position === currValue.length &&
              currentKey.current !== "Backspace")
          ) {
            const newChar = currValue
              .charAt(currValue.length - 1)
              .toUpperCase();
            event.target.value = currValue.slice(0, -1) + newChar;
          }
        }
        if (props.type === "number") {
          const value = event.target.value;
          if (value.includes(".") && decPlaces > 0) {
            const [integerPart, decimalPart] = value.split(".");
            if (decimalPart.length > decPlaces) {
              event.target.value = `${integerPart}.${decimalPart.slice(
                0,
                decPlaces
              )}`;
            }
          }
        }
        if (inputProps.onChange) {
          inputProps.onChange(event);
        }
        break;
      }
      case InputType.EMAIL: {
        const inputProps = props as TextFieldProps;
        if (inputProps.onChange) {
          inputProps.onChange(event);
        }
        break;
      }

      case InputType.CHECKBOX: {
        const inputProps = props as CheckboxProps;
        if (inputProps.onChange) {
          inputProps.onChange(event, event.target.checked);
        }
        break;
      }

      case InputType.TEXTFIELD: {
        const inputProps = props as TextFieldProps;

        if (event.target.value.length === 1 && first) {
          event.target.value = event.target.value.toUpperCase();
          first = false;
        }
      }
    }
  }

  function onDateChange(
    value: Dayjs | null,
    context: FieldChangeHandlerContext<DateValidationError>
  ) {
    const inputProps = props as DatePickerProps<Dayjs>;
    if (inputProps.onChange) {
      inputProps.onChange(value, context);
    }
  }

  function onTimeChange(
    value: Dayjs | null,
    context: PickerChangeHandlerContext<TimeValidationError>
  ) {
    const inputProps = props as TimePickerProps<Dayjs>;
    if (inputProps.onChange) {
      inputProps.onChange(value, context);
    }
  }

  function onDateTimeChange(
    value: Dayjs | null,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) {
    if (setFormError && props.slotProps?.textField.error) {
      updateFormError(setFormError, props.name);
    }
    const inputProps = props as DateTimePickerProps<Dayjs>;
    if (inputProps.onChange) {
      inputProps.onChange(value, context);
    }
  }

  function onPhoneChange(newValue: any, details: any) {
    if(setFormError && props.error) {
      updateFormError(setFormError, props.name);
    }
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
  }

  function handleFocus() {
    switch (inputType) {
      case InputType.PHONE: {
        const inputElement = inputRef.current?.querySelector("input");
        if (inputElement) {
          const value = inputElement.value;
          const countryCodeLength = value.indexOf(" ") + 1;
          if (countryCodeLength > 0) {
            inputElement.setSelectionRange(countryCodeLength, value.length);
          }
        }
        break;
      }
      case InputType.TEXTFIELD: {
        first = true;
        break;
      }
    }
  }

  // function onPhoneChange(value: string, data: {} | CountryData, event: ChangeEvent<HTMLInputElement>, formattedValue: string) {
  //   const inputProps = props as PhoneInputProps;
  //   if(inputProps.onChange) {
  //     inputProps.onChange(value, data, event, formattedValue)
  //   }
  // }

  // Render either a TextField or a Checkbox based on the props

  switch (inputType) {
    case InputType.TEXT: {
      // It's a TextField
      const textFieldProps = props as TextFieldProps;
      return (
        <CustomTextField
          {...textFieldProps}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      );
      break;
    }
    case InputType.CHECKBOX: {
      // It's a Checkbox
      const CheckboxProps = props as CheckboxProps;
      return (
        <FormControlLabel
          label={custLabel}
          control={<Checkbox {...CheckboxProps} onChange={onChange} />}
        />
      );
      break;
    }
    case InputType.DATEINPUT: {
      const DataInputProps = props as DatePickerProps<Dayjs>;
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker {...DataInputProps} onChange={onDateChange} />
        </LocalizationProvider>
      );
      break;
    }
    case InputType.TIMEINPUT: {
      const DataInputProps = props as TimePickerProps<Dayjs>;
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker {...DataInputProps} onChange={onTimeChange} />
        </LocalizationProvider>
      );
      break;
    }
    case InputType.DATETIMEINPUT: {
      const DataInputProps = props as DateTimePickerProps<Dayjs>;
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateTimePicker {...DataInputProps} onChange={onDateTimeChange} />
        </LocalizationProvider>
      );
      break;
    }
    case InputType.EMAIL: {
      // It's a TextField
      const textFieldProps = props as TextFieldProps;
      return (
        <CustomTextField
          {...textFieldProps}
          onChange={onChange}
          type="email"
          onKeyDown={handleKeyDown}
        />
      );
      // return <TextField {...textFieldProps} type="email" onChange={onChange} />;
      break;
    }
    case InputType.PHONE: {
      // It's a phone input
      return (
        <StyledTelInput
          ref={inputRef}
          defaultCountry="IN"
          {...props}
          value={value}
          onChange={onPhoneChange}
          onFocus={handleFocus}
        />
      );
      break;
    }
    case InputType.TEXTFIELD: {
      // It's a TextField
      const textFieldProps = props as TextFieldProps;
      return (
        <TextField
          {...textFieldProps}
          onChange={onChange}
          onFocus={handleFocus}
        />
      );
      break;
    }
  }
};
