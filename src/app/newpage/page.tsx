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
  Paper,
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
          container
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            // height: "30vh",
          }}
        >
          <Grid
            item
            xs={1.8}
            component="fieldset"
            sx={{
              // width: "15vw",
              // display: "flex",
              // flexDirection: "column",
              border: "0.01rem solid #686D76",
              // justifyContent: "center",
              // alignContent: "center",
              padding: "0px",
              height: "33.25vh",
            }}
          >
            <legend>Date-Range</legend>
            <Paper component="fieldset" sx={{ height: "90%" }}>
              <Typography>Start Date: 01-04-2024</Typography>
              <Typography>End Date: 15-05-2024</Typography>
              <Typography>Status 29-08-2024</Typography>
            </Paper>
          </Grid>

          <Grid
            item
            xs={5}
            component="fieldset"
            sx={{
              // display: "grid",
              border: "0.01rem solid #686D76",
              width: "38vw",
              padding: "0vw",
              height: "33.25vh",

              // columnGap: 3,
              // rowGap: 1,
              // gridTemplateColumns: "repeat(1, 1fr)",
            }}
          >
            <legend>Filter On Calls</legend>
            <Paper component="fieldset" sx={{ height: "90%" }}>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Open Calls"
                  />
                  <Grid
                    component="fieldset"
                    sx={{
                      border: "0.01rem solid #686D76",
                      width: "40vw",
                      // marginLeft: "1.1vw",
                      padding: "0px",
                    }}
                  >
                    <legend>Filter On Open Calls</legend>
                    <Paper component="fieldset" sx={{ height: "90%" }}>
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
                    </Paper>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "2vh",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Closed Calls"
                  />
                  <Grid
                    component="fieldset"
                    sx={{
                      border: "0.01rem solid #686D76",
                      width: "40vw",
                      ml: "-9px",
                      padding: "0px",
                    }}
                  >
                    <legend>Filter On Closed Calls</legend>
                    <Paper component="fieldset" sx={{ height: "90%" }}>
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
                    </Paper>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={2.5} height="100%">
            <Box
              component="fieldset"
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "0.01rem solid #686D76",
                paddingLeft: "15px",
                height: "10vh",
                padding: "0px",
              }}
            >
              <legend>Filter-On:</legend>
              <Paper component="fieldset" sx={{ height: "90%" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Area"
                  sx={{ mt: "0vh" }}
                />
                <FormControlLabel control={<Checkbox />} label="Executive" />
              </Paper>
            </Box>

            <Box
              component="fieldset"
              sx={{
                display: "flex",
                alignContent: "space-between",
                flexDirection: "column",
                border: "0.01rem solid #686D76",
                // width: '21.5rem',
                height: "22.3vh",
                marginTop: "2px",
                padding: "0vh",
              }}
              justifyContent={"space-between"}
            >
              <legend>Filter-On-Action-Date</legend>
              <Paper component="fieldset" sx={{ height: "85%" }}>
                <Box
                  sx={{
                    display: "flex",
                    // justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ paddingLeft: "15px" }}>
                    Filter On:
                  </Typography>
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
                <Box sx={{ display: "flex", flexDirection: "row", mt: "5vh" }}>
                  <Typography sx={{ paddingLeft: "15px" }}>From:</Typography>
                  <Typography sx={{ marginLeft: "6vw" }}>To:</Typography>
                </Box>
              </Paper>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyItems: "space-between",
                marginTop: "2vh",
              }}
            >
              {/* <Button
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
              </Button> */}
            </Box>
          </Grid>
          <Grid
            item
            xs={1.7}
            component="fieldset"
            sx={{
              border: "0.01rem solid #686D76",
              display: "flex",
              flexDirection: "column",
              width: "20vw",
              height: "33.25vh",
              padding: "0px",
            }}
          >
            <legend>Filter-On-Action-Date</legend>
            <Paper component="fieldset" sx={{ height: "90%" }}>
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
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: "10px" }}>
        <Grid
          sx={{
            // border: "0.01rem solid #686D76",
            bgcolor: "white",
          }}
        >
          <Paper component="fieldset" sx={{ height: "90%" }}>
            <DataGridComp rows={row1} columns={column1} />
          </Paper>
        </Grid>
        <Box sx={{ display: "flex", marginTop: "1vh" }}>
          <Typography sx={{ marginLeft: "20vw", mt: "10px" }}>
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
            // border: "0.01rem solid #686D76",
            bgcolor: "white",
          }}
        >
          <Paper component="fieldset" sx={{ height: "90%" }}>
            <DataGridComp rows={row2} columns={column2} />
          </Paper>
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
