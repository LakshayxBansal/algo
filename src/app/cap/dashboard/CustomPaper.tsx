'use client'

import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Replace with your desired icon

const useStyles = makeStyles((theme) => ({
  paper: {
    //padding: theme.spacing(2),
    //marginBottom: theme.spacing(2),
    display: 'flex', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  icon: {
    //marginRight: theme.spacing(1),
  },
}));

function CustomPaper() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <IconButton className={classes.icon}>
        <AddCircleIcon />
      </IconButton>
      <div>
        <Typography variant="h6">Section Title</Typography>
        <Typography variant="body1">
          This is the content of the section. You can replace this text with your own.
        </Typography>
      </div>
    </Paper>
  );
}

export default CustomPaper;