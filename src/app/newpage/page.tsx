"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Menu,
  MenuItem,
  Paper,
  Radio,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import DataGridComp from "../miscellaneous/datagrid";
import FilterListIcon from "@mui/icons-material/FilterList";

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

const row1 = [
  {
    id: 1,
    Type: "",
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
    color: "purple",
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
    actionDate: "2024-05-15",
    color: "blue",
  },
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
  const [rows, setRows] = React.useState(row1);
  const [anchorElDate, setAnchorElDate] = React.useState<null | HTMLElement>(
    null
  );
  const [initialDate, setInitialDate] = React.useState<string>("");
  const [finalDate, setFinalDate] = React.useState<string>("");

  const [Filter, setFilter] = React.useState("0");
  const handleClickDate = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDate(event.currentTarget);
  };
  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  const handleFilterChangeDate = () => {
    const filteredRows = row1.filter((row) => {
      const rowDate = new Date(row.actionDate).getTime();
      const initial =
        initialDate !== "" ? new Date(initialDate).getTime() : null;
      const final = finalDate !== "" ? new Date(finalDate).getTime() : null;

      if (initial !== null && final !== null) {
        return rowDate >= initial && rowDate <= final;
      } else if (initial !== null) {
        return rowDate >= initial;
      } else if (final !== null) {
        return rowDate <= final;
      } else {
        return true;
      }
    });

    setRows(filteredRows);
  };

  type customCol = { id: any; dataColor: string };

  const CustomColor = (props: customCol) => {
    // console.log("these are the params",props.id)
    return (
      <div>
        {props.dataColor == "purple" ? (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              bgcolor: "purple",
              margin: "20px",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              bgcolor: "blue",
              margin: "20px",
            }}
          />
        )}
      </div>
    );
  };

  const column1: GridColDef[] = [
    {
      field: "Type",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return <CustomColor id={params.row.id} dataColor={params.row.color} />;
      },
    },
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
      width: 120,
    },
    { field: "area", headerName: "Area", width: 100 },
    { field: "executive", headerName: "Executive", width: 100 },
    { field: "callStatus", headerName: "Call Status", width: 100 },
    { field: "subStatus", headerName: "Sub Status", width: 100 },
    { field: "nextAction", headerName: "Next Action", width: 100 },
    {
      field: "actionDate",
      headerName: "Action Date",
      width: 100,
      // type: "dateTime",
      filterable: false, // Disable default filtering for date
      renderHeader: () => (
        <Box>
          <Button
            startIcon={
              <Tooltip title="Filter Date" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickDate}
          >
            Date
          </Button>
          <Menu
            anchorEl={anchorElDate}
            open={Boolean(anchorElDate)}
            onClose={handleCloseDate}
          >
            <MenuItem>
              <Typography>Filter On:</Typography>
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
                  <MenuItem value={"0"}>--None--</MenuItem>
                  <MenuItem value={"1"}>Current Date</MenuItem>
                  <MenuItem value={"2"}>Next Date</MenuItem>
                  <MenuItem value={"3"}>Date Range</MenuItem>
                </Select>
              </FormControl>
            </MenuItem>
            {Filter === "3" && (
              <>
                <MenuItem>
                  <TextField
                    label="Initial Date"
                    variant="outlined"
                    size="small"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                    type="date"
                    fullWidth
                  />
                </MenuItem>

                <MenuItem>
                  <TextField
                    label="Final Date"
                    variant="outlined"
                    size="small"
                    value={finalDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                    type="date"
                    fullWidth
                  />
                </MenuItem>
              </>
            )}
            <MenuItem>
              <Button
                onClick={() => {
                  handleFilterChangeDate();
                  handleCloseDate();
                }}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  const column2: GridColDef[] = [
    { field: "type", headerName: "Type", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "time", headerName: "Time", width: 130 },
    {
      field: "executive",
      headerName: "Executive",
      width: 200,
    },
    { field: "subStatus", headerName: "Sub Status", width: 130 },
    { field: "actionTaken", headerName: "Next Action", width: 130 },
    { field: "nextAction", headerName: "Next Action", width: 130 },
    {
      field: "actionDate",
      headerName: "Action Date",
      width: 130,
    },
  ];

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
    console.log(Filter);
  };
  return (
    <Box sx={{ bgcolor: "#f3f1f17d", width: "100%" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "40vh",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: "12px",
        }}
      >
        <Grid
          item
          xs={2}
          // component="fieldset"
          sx={{
            // width: "15vw",
            // display: "flex",
            // flexDirection: "column",
            // border: "0.01rem solid #686D76",
            justifyContent: "center",
            // alignContent: "center",
            padding: "0px",
            // height: "33.25vh",
          }}
        >
          <Paper
            component="fieldset"
            sx={{ height: "45%", border: "1px solid #64748b" }}
          >
            <legend>Date-Range</legend>
            <Typography>Start Date: 01-04-2024</Typography>
            <Typography>End Date: 15-05-2024</Typography>
            <Typography>Status 29-08-2024</Typography>
          </Paper>
          <Box
            // component="fieldset"
            sx={{
              display: "flex",
              flexDirection: "column",
              // border: "0.01rem solid #686D76",
              paddingLeft: "15px",
              padding: "0px",
            }}
          >
            <Paper
              component="fieldset"
              sx={{ height: "90%", border: "1px solid #64748b" }}
            >
              <legend>Filter-On:</legend>
              <FormControlLabel
                control={<Checkbox />}
                label="Area"
                sx={{ mt: "0vh" }}
              />
              <FormControlLabel control={<Checkbox />} label="Executive" />
            </Paper>
          </Box>
        </Grid>

        <Grid
          item
          xs={6}
          // component="fieldset"
          sx={{
            // display: "grid",
            // border: "0.01rem solid #686D76",
            // width: "38vw",
            padding: "0vw",
            // height: "33.25vh",
            // columnGap: 3,
            // rowGap: 1,
            // gridTemplateColumns: "repeat(1, 1fr)",
          }}
        >
          <Paper
            component="fieldset"
            sx={{ height: "90%", border: "1px solid #64748b" }}
          >
            <legend>Filter On Calls</legend>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Open Calls"
                />
                <Grid
                  // component="fieldset"
                  sx={{
                    // border: "0.01rem solid #686D76",
                    width: "80%",
                    // marginLeft: "1.1vw",
                    padding: "0px",
                  }}
                >
                  <Paper
                    component="fieldset"
                    sx={{ height: "90%", border: "1px solid #64748b" }}
                  >
                    <legend>Filter On Open Calls</legend>
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
                  // component="fieldset"
                  sx={{
                    // border: "0.01rem solid #686D76",
                    width: "80%",
                    ml: "-9px",
                    padding: "0px",
                    height: "5%",
                    mb: "2%",
                  }}
                >
                  <Paper
                    component="fieldset"
                    sx={{ height: "90%", border: "1px solid #64748b" }}
                  >
                    <legend>Filter On Closed Calls</legend>
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
        {/* <Grid
          item
          xs={2.5}
          height="100%"
          sx={
            {
              // border: "0.01rem solid #686D76",
            }
          }
        >
          <Box
            // component="fieldset"
            sx={{
              display: "flex",
              flexDirection: "column",
              // border: "0.01rem solid #686D76",
              paddingLeft: "15px",
              // height: "10vh",
              padding: "0px",
            }}
          >
            <Paper
              component="fieldset"
              sx={{ height: "90%", border: "1px solid #64748b" }}
            >
              <legend>Filter-On:</legend>
              <FormControlLabel
                control={<Checkbox />}
                label="Area"
                sx={{ mt: "0vh" }}
              />
              <FormControlLabel control={<Checkbox />} label="Executive" />
            </Paper>
          </Box>

          <Box
            // component="fieldset"
            sx={{
              display: "flex",
              alignContent: "space-between",
              flexDirection: "column",
              // border: "0.01rem solid #686D76",
              // width: '21.5rem',
              // height: "22.3vh",
              marginTop: "2px",
              padding: "0vh",
            }}
            justifyContent={"space-between"}
          >
            <Paper
              component="fieldset"
              sx={{ height: "85%", border: "1px solid #64748b", mt: "6px" }}
            >
              <legend>Filter-On-Action-Date</legend>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "center",
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
        </Grid> */}
        <Grid
          item
          xs={3.5}
          // component="fieldset"
          sx={{
            // border: "0.01rem solid #686D76",
            display: "flex",
            flexDirection: "column",
            width: "20vw",
            // height: "33.25vh",
            padding: "0px",
          }}
        >
          <Paper
            component="fieldset"
            sx={{ height: "90%", border: "1px solid #64748b" }}
          >
            <legend>Filter-On-Action-Date</legend>
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

      <Grid
        sx={{
          border: "0.01rem solid #686D76",
          bgcolor: "white",
          width: "100%",
        }}
      >
        <Paper>
          <DataGridComp rows={rows} columns={column1} />
        </Paper>
      </Grid>
      <Grid sx={{ display: "flex", marginTop: "1vh" }}>
        {/* <Typography sx={{ marginLeft: "20vw", mt: "10px" }}>
          Call Details : 1/2024-2025 (Ramlal)(Org:)(Ledger:)
        </Typography> */}
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
      </Grid>
      <Grid
        sx={{
          marginTop: "2vh",
          width: "100%",
        }}
      >
        <Box> Call Details : 1/2024-2025 (Ramlal)(Org:)(Ledger:)</Box>
        <Paper sx={{ border: "0.01rem solid #686D76", bgcolor: "white" }}>
          <DataGridComp rows={row2} columns={column2} />
        </Paper>
      </Grid>

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
            />
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
