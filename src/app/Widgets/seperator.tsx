import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Children } from 'react';


export default function Seperator({children}: {children: React.ReactNode}) {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ position: 'relative', backgroundColor: 'white'}}>
        {children}
      </Typography>
      <Divider variant="fullWidth" sx={{borderWidth: 0.1, borderColor: '#E2E8EB'}}/>
    </>  
  );
}