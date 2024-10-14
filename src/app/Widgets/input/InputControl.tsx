"use client";
import React, { ChangeEvent, useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Dayjs } from "dayjs";
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
// import ReactPhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-material-ui';
// import PhoneInput from 'react-phone-input-2';
// import "react-phone-input-2/lib/style.css";
import { MuiTelInput, MuiTelInputInfo } from "mui-tel-input";
import { AnyARecord } from "dns";

export enum InputType {
  TEXT,
  CHECKBOX,
  DATEINPUT,
  TIMEINPUT,
  DATETIMEINPUT,
  EMAIL,
  PHONE,
}
// Define the additional props for the base control
interface BaseControlProps {
  inputType: InputType;
  custLabel?: string;
  // Add any additional props here
}

// (TextFieldProps | CheckboxProps | DatePickerProps<Dayjs>  )
// Create a type for the new custom control props
type CustomControlProps<T> = BaseControlProps & T;

// Define the base control component
export const InputControl: React.FC<CustomControlProps<any>> = ({ inputType, custLabel = "", ...props }) => {
  const [ifEmail, setIfEmail] = useState({ status: true, msg: "" });
  const [value, setValue] = React.useState(props.defaultValue ? props.defaultValue : '')

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (inputType) {
      case InputType.TEXT: {
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
    }
  }

  function onDateChange(
    value: Dayjs | null,
    context: FieldChangeHandlerContext<DateValidationError>
  ) {
    console.log('datechange')
    console.log(value)
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
    const inputProps = props as DateTimePickerProps<Dayjs>;
    if (inputProps.onChange) {
      inputProps.onChange(value, context);
    }
  }

  function onPhoneChange(newValue: any, details: any) {
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
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
      return <TextField {...textFieldProps} onChange={onChange} />;
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker {...DataInputProps} onChange={onDateTimeChange} />
        </LocalizationProvider>
      );
      break;
    }
    case InputType.EMAIL: {
      // It's a TextField
      const textFieldProps = props as TextFieldProps;
      return <TextField {...textFieldProps} type="email" onChange={onChange} />;
      break;
    }
    case InputType.PHONE: {
      // It's a phone input
      return (
        <MuiTelInput
          defaultCountry="IN"
          {...props}
          value={value}
          onChange={onPhoneChange}
        />
      );
      break;
    }
  }
};
