import React, {useState} from 'react';
import { getStates } from '@/app/controllers/masters.controller';
import Box from '@mui/material/Box';
import { InputControl, InputType } from '../input/InputControl';
import CountryStateComposite from '@/app/Widgets/composites/countryStateComposite';

export default function AddressComposite(formError: any){
  const [country, setCountry] = useState('');

  async function getStatesforCountry(stateStr: string) {
    const country = (document.getElementById("country") as HTMLInputElement).value;

    const states = await getStates(stateStr, country);
    if (states.length > 0){
      return states
    } 
  }

  return(
    <>
          <Box 
            sx={{ display: 'grid', 
                  columnGap: 3,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                }}>
            <InputControl
              inputType={InputType.TEXT} 
              label="Address Line 1" 
              name="address1"
              id="address1"
              error={formError?.address1?.error}
              helperText={formError?.address1?.msg} 
              fullWidth />
            <InputControl
              inputType={InputType.TEXT} 
              label="Address Line 2" 
              name="address2"
              id="address2"
              error={formError?.address2?.error}
              helperText={formError?.address2?.msg} 
              fullWidth/>
            <InputControl
              inputType={InputType.TEXT} 
              label="Address Line 3" 
              name="address3"
              id="address3"
              error={formError?.address3?.error}
              helperText={formError?.address3?.msg} 
              fullWidth/>
            <InputControl 
              inputType={InputType.TEXT} 
              name="city" 
              id="city" 
              label="City" 
              error={formError?.city?.error}
              helperText={formError?.city?.msg}  
            />
          </Box>
          <Box sx={{ display: 'grid', 
                  columnGap: 3,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                }}>
            <CountryStateComposite/>

            <InputControl 
              inputType={InputType.TEXT} 
              name="pincode" 
              id="pincode" 
              label="Pin Code" 
              error={formError?.pincode?.error}
              helperText={formError?.pincode?.msg}  
            />
          </Box>
    </>
  );
}