// components/ProfileImage.js
import React from 'react';
import styles from './ProfileImage.module.css';
import { Box } from '@mui/material';

const ProfileImage = ({ name }:{name : string}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <Box sx={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#f12020",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold"

    }}>
        {firstLetter}
    </Box>
  );
};



export default ProfileImage;
