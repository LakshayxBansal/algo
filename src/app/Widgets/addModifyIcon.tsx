import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';

export const AddModifyIcon = () => {
    return (    
    <IconButton size='small'>
        <span
            style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "Center",
            alignItems: "Center",
            marginLeft: "3px",
            gap: '0px'
            }}
        >
            <AddBoxIcon color="action" fontSize="small" />
            <EditNoteIcon color="action" fontSize="small" />
        </span>
    </IconButton>

    );
  };