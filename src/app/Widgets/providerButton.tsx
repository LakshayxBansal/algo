'use client'

import { signIn } from "next-auth/react"
import {
  Button as MuiButton,
  ButtonProps,
  makeStyles
} from '@mui/material';
import { ClientSafeProvider} from "next-auth/react";


interface IButtonProps extends ButtonProps {
  provider: ClientSafeProvider;
  callbackUrl: string;
}

export default function ProviderButton({ provider, callbackUrl, children, ...rest }: IButtonProps) {

  console.log("provider")

  return (
    <div key={provider.name}>
      
      <MuiButton onClick={()=>signIn(provider.id, {callbackUrl: callbackUrl})}
                  fullWidth
                  variant="contained"
                  sx={{
                  display: 'flex',  
                  backgroundColor: '#4285F4',
                  alignItems: 'center',
                  border: 'none',
                  textTransform: 'none',
                  justifyContent: 'center',
                }}
        >
          {children} {provider.name}
      </MuiButton>
    </div>
  );
}


// onClick={()=>signIn(props.provider.id)}