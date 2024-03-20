'use client'

import { signIn } from "next-auth/react"
import Button from '@mui/material/Button';
import { ClientSafeProvider} from "next-auth/react";


interface buttonPropsType {
  provider: ClientSafeProvider;
  callbackUrl: string;
}

export default function ProviderButton(props: buttonPropsType) {

  return (
    <div key={props.provider.name}>
      
      <Button onClick={()=>signIn(props.provider.id, {callbackUrl: props.callbackUrl})}
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
          Continue with {props.provider.name}
      </Button>
    </div>
  );
}


// onClick={()=>signIn(props.provider.id)}