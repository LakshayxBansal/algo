
import React, {FocusEventHandler, useState} from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Dayjs } from 'dayjs';
import { 
  DatePickerProps, 
  DateTimePicker, 
  DateTimePickerProps, 
  DateTimeValidationError, 
  DateValidationError, 
  LocalizationProvider, 
  PickerChangeHandlerContext, 
  TimeValidationError } from '@mui/x-date-pickers';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/useField/useField.types';
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export enum InputType {
  TEXT,
  CHECKBOX,
  DATEINPUT,
  TIMEINPUT,
  DATETIMEINPUT,
  EMAIL,
  PHONE,
}
// Define the mandatory props for the base control
interface BaseControlProps {
  type:InputType,
  custLabel?: string,
  // Add any mandatory props here
}

// (TextFieldProps | CheckboxProps | DatePickerProps<Dayjs>  )
// Create a type for the new custom control props
type CustomControlProps<T> = BaseControlProps & T;

// Define the base control component
export const InputControl: React.FC<CustomControlProps<any>> = ({type, custLabel="", ...props }) => {
  const [ifEmail, setIfEmail] = useState({status: true, msg: ""});

  function onChange(event: React.ChangeEvent<HTMLInputElement>){
    console.log(event.target.id, "event is :", event.type);
    switch (type){
      case InputType.TEXT: {
        const inputProps = props as TextFieldProps;
        if(inputProps.onChange) {
          inputProps.onChange(event)
        }
        break;
      }
      
      case InputType.CHECKBOX:{
        const inputProps = props as CheckboxProps;
        if(inputProps.onChange) {
          inputProps.onChange(event, event.target.checked)
        }
        break;
      }
    }
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement>){
    switch (type){
      case InputType.EMAIL: {
        const email = event.target.value;
        const inputProps = props as TextFieldProps;
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email !== '' && !emailRegex.test(email)) {
          setIfEmail({status: false, msg: "Please enter a valid email"});
        } else {
          setIfEmail({status: true, msg: ""});
        }
        if(inputProps.onBlur) {
          inputProps.onBlur(event)
        }
        break;
      }
    }
  }


  function onDateChange(value: Dayjs|null, context: FieldChangeHandlerContext<DateValidationError>){
    const inputProps = props as DatePickerProps<Dayjs>;
    if(inputProps.onChange) {
      inputProps.onChange(value, context)
    }
  }

  function onTimeChange(value: Dayjs|null, context: PickerChangeHandlerContext<TimeValidationError>){
    const inputProps = props as TimePickerProps<Dayjs>;
    if(inputProps.onChange) {
      inputProps.onChange(value, context)
    }
  }

  function onDateTimeChange(value: Dayjs|null, context: PickerChangeHandlerContext<DateTimeValidationError>){
    const inputProps = props as DateTimePickerProps<Dayjs>;
    if(inputProps.onChange) {
      inputProps.onChange(value, context)
    }
  }

  // Render either a TextField or a Checkbox based on the props
  switch (type) {
    case InputType.TEXT: {
      // It's a TextField
      const textFieldProps = props as TextFieldProps;
      return <TextField {...textFieldProps} onChange={onChange} />;
      break;
    } 
    case InputType.CHECKBOX: {
      // It's a Checkbox
      const CheckboxProps = props as CheckboxProps;
      return <FormControlLabel label={custLabel} control={<Checkbox {...CheckboxProps} onChange={onChange}/>}   />
      break;
    } 
    case InputType.DATEINPUT: {
      const DataInputProps = props as DatePickerProps<Dayjs>;
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...DataInputProps}
            onChange={onDateChange}
          />
        </LocalizationProvider>
      );
      break;
    }
    case InputType.TIMEINPUT: {
      const DataInputProps = props as TimePickerProps<Dayjs>;
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            {...DataInputProps}
            onChange={onTimeChange}
          />
        </LocalizationProvider>
      );
      break;
    }
    case InputType.DATETIMEINPUT: {
      const DataInputProps = props as DateTimePickerProps<Dayjs>;
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker 
            {...DataInputProps}
            onChange={onDateTimeChange}
          />
        </LocalizationProvider>
      );
      break;
    }
    case InputType.EMAIL: {
      // It's a TextField
      const textFieldProps = props as TextFieldProps;
      return <TextField {...textFieldProps} 
        type="email" 
        onBlur={onBlur} 
        onChange={onChange}
        error={!ifEmail.status}
        helperText={!ifEmail.status && ifEmail.msg} 
      />;
      break;
    }
    case InputType.PHONE: {
      // It's a TextField
      const textFieldProps = props as TextFieldProps;
      return <TextField {...textFieldProps} onChange={onChange} />;
      break;
    }
  }
};