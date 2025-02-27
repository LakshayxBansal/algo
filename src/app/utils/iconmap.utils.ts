import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import ContactsIcon from '@mui/icons-material/Contacts';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

import StarBorder from '@mui/icons-material/StarBorder';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

type iconElementT = {
  name: string,
  icon: React.ElementType
}

export const nameIconArr: iconElementT[] = [
  { name: 'SpaceDashboardOutlinedIcon', icon: SpaceDashboardOutlinedIcon },
  { name: 'AddIcCallIcon', icon: AddIcCallIcon},
  { name: 'AddCircleOutlineIcon', icon: AddCircleOutlineIcon},
  { name: 'PeopleAltOutlinedIcon', icon: PeopleAltOutlinedIcon},
  { name: 'BarChartIcon', icon: BarChartIcon},
  { name: 'LayersIcon', icon: LayersIcon},
  { name: 'AssignmentIcon', icon: AssignmentIcon},
  { name: 'InboxIcon', icon: InboxIcon},
  { name: 'DraftsIcon', icon: DraftsIcon},
  { name: 'SendIcon', icon: SendIcon},
  { name: 'FolderOutlinedIcon', icon: FolderOutlinedIcon},
  { name: 'ContactsIcon', icon: ContactsIcon},
  // Add more pairs here
];

export function getIconFromName(iconName: string) {
  return nameIconArr.find((obj)=> obj.name === iconName)?.icon?? nameIconArr[0].icon;
}