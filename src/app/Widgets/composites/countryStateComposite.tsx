import React, {useState} from 'react';
import { SelectMasterWrapper } from '@/app/Widgets/masters/selectMasterWrapper';
import CountryForm from '@/app/Widgets/masters/masterForms/countryForm';
import StateForm from '@/app/Widgets/masters/masterForms/stateForm';
import { getCountries, getStates } from '@/app/controllers/masters.controller';

export default function CountryStateComposite(){
  const [country, setCountry] = useState('');

  async function getStatesforCountry(stateStr: string) {
    const country = (document.getElementById("country") as HTMLInputElement).value;

    const states = await getStates(stateStr, country);
    if (states.length > 0){
      return states;
    } 
  }

  return(
    <>
      <SelectMasterWrapper
        name = {"country"}
        id = {"country"}
        label = {"Country"}
        width = {210}
        dialogTitle={"Add country"}
        fetchDataFn = {getCountries}
        renderForm={(fnDialogOpen, fnDialogValue) => 
          <CountryForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
          />
        }
      />
      <SelectMasterWrapper
        name = {"state"}
        id = {"state"}
        label = {"State"}
        width = {210}
        dialogTitle={"Add State"}
        fetchDataFn = {getStatesforCountry}
        renderForm={(fnDialogOpen, fnDialogValue) => 
          <StateForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
          />
        }
      />
    </>
  );
}