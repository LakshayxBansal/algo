import NextBreadcrumb from '@/app/utils/NextBreadcrumbs'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Paper, Grid, Typography } from '@mui/material';

type secNav={
    title:string;
}
function SecondNavbar(props:secNav) {
  return (
    <div>
            <Paper style={{ padding:10 }}>
        {/* <Toolbar> */}
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" style={{verticalAlign:"baseline"}}>{props.title}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              paddingRight:10
            }}
          >
              <NextBreadcrumb
          homeElement={<HomeIcon style={{marginTop:5}}/>}
          // activeClasses='text-amber-500'
          // containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600' 
          // listClasses='hover:underline mx-2 font-bold'
          capitalizeLinks
        />    
          </Grid>
        </Grid>
      </Paper>
       
      
    </div>
  )
}

export default SecondNavbar
