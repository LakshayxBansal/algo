'use client'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';


/**
 * 
 * @param props props: 
 * @returns 
 */
export default function DateInput(props: DatePickerProps<Dayjs>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
      />
    </LocalizationProvider>
  );
}