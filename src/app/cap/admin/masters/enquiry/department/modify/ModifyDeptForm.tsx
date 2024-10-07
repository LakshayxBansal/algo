'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getDeptT} from '../../../../../../models/models';
import Grid from '@mui/material/Grid';
import { getDeptData, modifyDept } from '../../../../../../controllers/department.controller';

export default function DeptModifyForm(props: {
  open: boolean;
  id: string;
  setDlgValue: Dispatch<SetStateAction<boolean>>;
}) 

{
  const [data,setData] = useState([{}] as getDeptT);

  useEffect(() => {
    async function fetchData() { 
  
  const id : number = props.id;

  const dep = await getDeptData(id)
  
   setData(dep.status ? dep.data : [{}] as getDeptT)
    }
    if(JSON.stringify(data[0]) === '{}'){
  fetchData()}},[data])

  const handleSubmit = async (formData: FormData) => {
    console.log(formData);
    if (JSON.stringify(data[0]) === '{}'){
    const result = await modifyDept(formData, data[0].stamp, data[0].id);
    console.log(result);

    props.setDlgValue(false);
    if (!result.status) {
      if ((result.error = 'Trying to modify an older version')) {
        window.alert(result.error);
        window.location.reload();
      }
      return;
    }
    window.alert('Department modified successfully');
    window.location.reload();
  }
  return;
}
  
  ;

  const handleCancel = () => {
    props.setDlgValue(false);
  };

if (JSON.stringify(data[0]) !== '{}'){
  return (
    <form action={handleSubmit}>
      <Box
        sx={{
          display: 'grid',
          columnGap: 3,
          rowGap: 1,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <TextField
          autoFocus
          id="name"
          defaultValue={data[0].name}
          label="Department Name"
          type="text"
          name="name"
        />
      </Box>

      <Grid container xs={12} md={12}>
        <Grid item xs={6} md={6}>
          <Box margin={1} sx={{ display: 'flex' }}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              m={1}
            >
              <Button onClick={handleCancel}>Cancel</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            m={1}
          >
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
return <><h1>Data Not Found for selected ID</h1>
<Button onClick={handleCancel}>Go Back</Button>
</>
}