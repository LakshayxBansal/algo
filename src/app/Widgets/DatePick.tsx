import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

/**
 * 
 * @param props props: 
 *  label for the control, 
 *  format for data format, 
 *  defaultValue for default value, 
 *  readOnly, 
 *  onChange function
 * @returns 
 */
export default function DatePick(props) {
  //const theme = useTheme();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        format={props.format}
        defaultValue={dayjs(props.defaultValue? props.defaultValue: null)}
        readOnly={props.readOnly? props.readOnly: false}
        disableOpenPicker={props.readOnly? props.readOnly: false}
        onChange={props.onChange}
        slotProps={{ textField: { variant: 'standard' } }}
      />
    </LocalizationProvider>
  );
}