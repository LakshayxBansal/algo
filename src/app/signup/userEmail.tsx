'use client'

import TextField from '@mui/material/TextField';
import { checkUser } from '../services/user.services';
import { useState } from 'react';


export default function UserEmail() {
  const [error, setError] = useState("");
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
    const email = event.target.value;
    checkUser(email).then((result) => {
      if (result){    // if email exist - its an error
        setError("Email already exist");
        console.log("in handleChange");
      }
    })
  }
  return(
    <TextField
    error
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    onChange={handleChange}
    helperText={error}
  />
  );
}

//     autoComplete="email"  
