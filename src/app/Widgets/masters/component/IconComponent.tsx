import { useState } from "react";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import { StyledMenu } from "@/app/utils/styledComponents";
import { iconCompT } from "@/app/models/models";
import { useRouter } from "next/navigation";
import { encrypt } from "@/app/utils/encrypt.utils";

function IconComponent(props: iconCompT) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const router = useRouter();
    async function onModifyDialog(modId: number) {
      if(modId && props.link){
        const encryptedId = await encrypt(modId);
        router.push(`${props.link}?id=${encryptedId}`);
      }
      else  if (props.fnFetchDataByID && modId ) {
          const data = await props.fnFetchDataByID(modId);
          console.log(data);
          
          props.setModData(data[0]);
          props.setDialogOpen(true);
          props.setDlgMode(props.modify); //dialogMode.Modify
          setAnchorEl(null);
        }
        
      }

  function handleDeleteDialog(modId: number) {
    if (props.fnDeleteDataByID && modId) {
      props.setIds(modId);
      props.setDialogOpen(true);
      props.setDlgMode(props.delete); //dialogMode.Delete
      setAnchorEl(null);
    }
  }

  const optionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const optionMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={optionMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={optionMenuClose}
      >
        <MenuItem
          onClick={() => {
            onModifyDialog(props.id);
          }}
        >
          <EditIcon fontSize="large" />
          <Typography variant="h6">Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteDialog(props.id);
          }}
        >
          <DeleteIcon />
          <Typography variant="h6">Delete</Typography>
        </MenuItem>
      </StyledMenu>
    </Box>
  );
}

export default IconComponent;
