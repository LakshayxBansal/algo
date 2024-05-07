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

import StarBorder from '@mui/icons-material/StarBorder';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

type iconElementT = {
  name: string,
  icon: React.ElementType
}

export const nameIconArr: iconElementT[] = [
  { name: 'DashboardIcon', icon: DashboardIcon},
  { name: 'AddIcCallIcon', icon: AddIcCallIcon},
  { name: 'AddCircleOutlineIcon', icon: AddCircleOutlineIcon},
  { name: 'PeopleIcon', icon: PeopleIcon},
  { name: 'BarChartIcon', icon: BarChartIcon},
  { name: 'LayersIcon', icon: LayersIcon},
  { name: 'AssignmentIcon', icon: AssignmentIcon},
  { name: 'InboxIcon', icon: InboxIcon},
  { name: 'DraftsIcon', icon: DraftsIcon},
  { name: 'SendIcon', icon: SendIcon}
  // Add more pairs here
];

export function getIconFromName(iconName: string) {
  return nameIconArr.find((obj)=> obj.name === iconName)?.icon?? nameIconArr[0].icon;
}