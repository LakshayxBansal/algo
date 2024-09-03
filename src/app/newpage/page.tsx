"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import DataGridComp from "../miscellaneous/datagrid";

// const Item1 = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   border:"1",
//   borderColor:"blueviolet",
//   textAlign: 'center',
//   height: '30vh' ,
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));

const column1: GridColDef[] = [
  { field: "callNo", headerName: "Call No.", width: 70 },
  { field: "contactParty", headerName: "Contact/Party", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  {
    field: "time",
    headerName: "Time",
    width: 100,
  },
  {
    field: "callCategory",
    headerName: "Call Category",
    width: 160,
  },
  { field: "area", headerName: "Area", width: 130 },
  { field: "executive", headerName: "Executive", width: 130 },
  { field: "callStatus", headerName: "Call Status", width: 130 },
  { field: "subStatus", headerName: "Sub Status", width: 130 },
  { field: "nextAction", headerName: "Next Action", width: 130 },
  { field: "actionDate", headerName: "Action Date", width: 130 },
];

const row1 = [
  {
    id: 1,
    callNo: "1/2024-2025",
    contactParty: "Ramlal",
    date: dayjs(),
    time: "10:31AM",
    age: 35,
    callCategory: "---Other",
    area: "---Other",
    executive: "Dinesh",
    callStatus: "Open",
    subStatus: "Demo Done",
    nextAction: "Specify Latest",
    actionDate: "",
  },
  {
    id: 2,
    callNo: "2/2024-2025",
    contactParty: "Rajesh Yadav",
    date: dayjs(),
    age: 35,
    callCatagory: "---Other",
    area: "---Other",
    executive: "Coordinator",
    callStatus: "Open",
    subStatus: "Unallocated",
    nextAction: "Call",
    actionDate: "15-5-2024",
  },
];

const column2: GridColDef[] = [
  { field: "type", headerName: "Type", width: 70 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "time", headerName: "Time", width: 130 },
  {
    field: "executive",
    headerName: "Executive",
    width: 400,
  },
  { field: "subStatus", headerName: "Sub Status", width: 130 },
  { field: "actionTaken", headerName: "Next Action", width: 130 },
  { field: "nextAction", headerName: "Next Action", width: 130 },
  { field: "actionDate", headerName: "Action Date", width: 130 },
];

const row2 = [
  {
    id: 1,
    type: "ClRc",
    date: "11-05-2024",
    time: "3:04PM",
    executive: "coordinator",
    subStatus: "Unallocated",
    actionTaken: "None",
    nextAction: "To Be Alllocated",
    actionDate: "11-05-2024",
  },
];

export default function AutoGrid() {
  const [Filter, setFilter] = React.useState("--None--");
  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  return (
    <Box sx={{ bgcolor: "#f3f1f17d" }}>
      <Box>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              width: "15vw",
              display: "flex",
              flexDirection: "column",
              border: "1px dashed black",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography>Start Date: 01-04-2024</Typography>
            <Typography>End Date: 15-05-2024</Typography>
            <Typography>Status 29-08-2024</Typography>
          </Grid>

          <Grid item xs={4}>
            <Box
              sx={{
                border: "1px dashed black",
                width: "38vw",
                padding: "1vw",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Open Calls"
                />
                <Box
                  sx={{
                    border: "1px dashed black",
                    marginLeft: "1.1vw",
                    padding: "2px",
                  }}
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Allocated Calls"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Unallocated Calls"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Both Calls"
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Sub Status"
                  />
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "row", marginTop: "7vh" }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Closed Calls"
                />
                <Box sx={{ border: "1px dashed black", padding: "2px" }}>
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Success Calls"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Failure Calls"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Both Calls"
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Sub Status"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px dashed black",
                paddingLeft: "15px",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Area" />
              <FormControlLabel control={<Checkbox />} label="Executive" />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignContent: "space-between",
                flexDirection: "column",
                border: "1px dashed black",
                // width: '21.5rem',
                height: "18vh",
                marginTop: "1vh",
                paddingTop: "2vh",
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
              justifyContent={"space-between"}
            >
              <Box
                sx={{
                  display: "flex",
                  // justifyContent:"center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ paddingLeft: "15px" }}>Filter On:</Typography>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, Width: 50, marginLeft: "3vw" }}
                  size="small"
                >
                  <Select
                    labelId="filter-on-label"
                    id="filter-on"
                    datatype="string"
                    name="filter-on"
                    value={Filter}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value={"--None--"}>--None--</MenuItem>
                    <MenuItem value={1}>Current Date</MenuItem>
                    <MenuItem value={2}>Next Date</MenuItem>
                    <MenuItem value={3}>Date Range</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ paddingLeft: "15px" }}>From:</Typography>
                <Typography sx={{ marginLeft: "6vw" }}>To:</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyItems: "space-between",
                marginTop: "1vh",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "#dedfe0",
                  color: "black",
                  boxShadow: "3",
                  marginRight: "1vw",
                }}
              >
                Column config
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ bgcolor: "#dedfe0", color: "black", boxShadow: "3" }}
              >
                Refresh Calls
              </Button>
            </Box>
          </Grid>
          <Box
            sx={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              width: "20vw",
            }}
          >
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Call Type"
              sx={{ marginLeft: "0.5vw" }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Catagory"
              sx={{ marginLeft: "0.5vw" }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Source"
              sx={{ marginLeft: "0.5vw" }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Next Action"
              sx={{ marginLeft: "0.5vw" }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Action Taken"
              sx={{ marginLeft: "0.5vw" }}
            />
          </Box>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
        <Grid
          sx={{
            border: "1px solid black",
            bgcolor: "white",
          }}
        >
          <DataGridComp rows={row1} columns={column1} />
        </Grid>
        <Box sx={{ display: "flex", marginTop: "1vh" }}>
          <Typography sx={{ marginLeft: "20vw" }}>
            Call Details : 1/2024-2025 (Ramlal)(Org:)(Ledger)
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                bgcolor: "#dedfe0",
                color: "black",
                boxShadow: "3",
                marginRight: "1vw",
              }}
            >
              Allocate Call
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ bgcolor: "#dedfe0", color: "black", boxShadow: "3" }}
            >
              Feed Report
            </Button>
          </Box>
        </Box>
        <Grid
          sx={{
            marginTop: "2vh",
            border: "2px solid black",
            bgcolor: "white",
          }}
        >
          <DataGridComp rows={row2} columns={column2} />
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1vh",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ bgcolor: "#dedfe0", color: "black", boxShadow: "3" }}
          >
            Hide Details
          </Button>
          <FormControlLabel
            control={<Checkbox />}
            label="Show Remarks"
            sx={{ marginLeft: "0vw" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "70%",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "9vw" }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "blue",
                marginLeft: "40px",
                marginRight: "5px",
              }}
            ></Box>
            <Typography>Open-Unalllocated</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "25px" }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "purple",
                marginRight: "5px",
              }}
            ></Box>
            <Typography>Open-Alllocated</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "25px" }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "red  ",
                marginRight: "5px",
              }}
            ></Box>
            <Typography>Close-Failure</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "25px" }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "green",
                marginRight: "5px",
              }}
            ></Box>
            <Typography>Close-Success</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", marginTop: "1vh" }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            bgcolor: "#dedfe0",
            color: "black",
            boxShadow: "3",
            marginRight: "1vw",
          }}
        >
          New Call Receipt
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            bgcolor: "#dedfe0",
            color: "black",
            boxShadow: "3",
            marginRight: "1vw",
          }}
        >
          New Call Allocation
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ bgcolor: "#dedfe0", color: "black", boxShadow: "3" }}
        >
          New Call Report
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            gcolor: "#dedfe0",
            color: "black",
            boxShadow: "3",
            marginLeft: "auto",
          }}
        >
          Quit
        </Button>
      </Box>
    </Box>
  );
}
