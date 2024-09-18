
"use client";
import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import { StyledMenu } from "../utils/styledComponents";
import TuneIcon from "@mui/icons-material/Tune";
import { getExecutive } from "../controllers/executive.controller";
import { optionsDataT } from "../models/models";
import { getArea } from "../controllers/area.controller";
import { getEnquiryCategory } from "../controllers/enquiryCategory.controller";
import AutocompleteDB from "../Widgets/AutocompleteDB";
import CallDetailList from "./CallDetailList";
import { getEnquirySubStatus } from "../controllers/enquirySubStatus.controller";
import { getEnquiryAction } from "../controllers/enquiryAction.controller";
import { getCallEnquiries } from "../controllers/callExplorer.controller";

const row1 = [
  {
    id: 1,
    callNo: "1/2024-2025",
    contactParty: "Ramlal",
    date: "2024-09-10",
    time: "10:31AM",
    age: 35,
    callCategory: "--Others--",
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
    date: "2024-09-20",
    age: 35,
    callCategory: "--Other--",
    area: "---Other",
    executive: "Coordinator",
    callStatus: "Open",
    subStatus: "Unallocated",
    nextAction: "Call",
    actionDate: "2024-05-15",
    color: "blue",
  },
  {
    id: 3,
    callNo: "2/2024-2025",
    contactParty: "Dinesh Verma",
    date: "2024-09-12",
    age: 35,
    callCategory: "--Other--",
    area: "Global",
    executive: "Dinesh Verma",
    callStatus: "Open",
    subStatus: "Unallocated",
    nextAction: "Call",
    actionDate: "2024-05-15",
    color: "blue",
  },
];

export default function AutoGrid() {

  const [rows, setRows] = React.useState(row1);
  const [data, setData] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState("0");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>("");
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({} as any);
  const [filterType, setFilterType] = React.useState<string>("reset"); // Default to "reset"
  const [status, setStatus] = React.useState("1");
  const [callFilter, setCallFilter] = React.useState<string>("0");
  const [selectedRow, setSelectedRow] = React.useState<any>(null);


  type DlgState = {
    [key: string]: HTMLElement | null;
  };






  // type FilterKeys = "date" | "callCategory" | "area" | "executive" | "callStatus" | "subStatus" | "nextAction" | "actionDate";

  const [dlgState, setDlgState] = React.useState<DlgState>({});

  const handleClickFilter = (column: string) => (event: React.MouseEvent<HTMLElement>) => {
    setDlgState({
      ...dlgState,
      [column]: event.currentTarget,
    });
  };

  const handleCloseFilter = (field: string) => {
    setDlgState((prevState) => ({
      ...prevState,
      [field]: null,
    }));
  };

  const [filterValueState, setFilterValueState] = React.useState<{ [key: string]: any }>({});

  const handleFilterChange = (field: string, value: any) => {
    setFilterValueState((prevState) => ({
      ...prevState,
      [field]: value, // Set the selected value for the specific field
    }));
  };

  useEffect(() => {
    async function getEnquiries() {
      const result = await getCallEnquiries(filterValueState);
      // if (result) {
      setData(result);
      // }
    }
    getEnquiries();
  }, [filterValueState])
  console.log(data);


  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    if (selectionModel.length > 0) {

      const selectedId = selectionModel[0]; // Get the ID of the selected row
      console.log(data);

      const selectedData = data.find((row: any) => row.id === selectedId); // Find the corresponding row data

      setSelectedRow(selectedData); // Set the selected row data
    }
  };

  const handleDateFilter = () => {
    const filteredRows = rows.filter((row) => {
      // Convert row actionDate to date and compare
      const rowDate = new Date(row.date).toLocaleDateString('en-CA');
      const initial = filterValueState.date?.initial ? new Date(filterValueState.date?.initial).toLocaleDateString('en-CA') : null;

      const final = filterValueState.date?.final ? new Date(filterValueState.date?.final).toLocaleDateString('en-CA') : null;

      if (initial && final) {
        return rowDate >= initial && rowDate <= final;
      } else if (initial) {
        return rowDate >= initial;
      } else if (final) {
        return rowDate <= final;
      }
      return true; // No filter applied
    });
    setRows(filteredRows);
  };



  const handleSelectedStatus = (e: SelectChangeEvent) => {
    setSelectedStatus(e.target.value);
    setCallFilter("0");
  }

  const handleSelectedSubStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    setFilterValueState((prevState) => ({
      ...prevState,
      ["subStatus"]: null, // Set the selected value for the specific field
    }));
  }

  // Filter rows based on Sub Status search
  const handleFilterChangeSubStatus = () => {
    const filteredRows = filterValueState['subStatus'] ? rows.filter((row) =>
      row.subStatus.toLowerCase().includes(filterValueState['subStatus']?.name.toLowerCase())
    ) : row1;
    setRows(filteredRows); // Set filtered rows using setRows
    handleCloseFilter('subStatus');
  };



  // Filter rows based on Call Category search
  const handleFilterChangeCategory = () => {
    const filteredRows = filterValueState['callCategory'] ? rows.filter((row) =>
      row.callCategory.toLowerCase().includes(filterValueState['callCategory']?.name.toLowerCase())
    ) : row1;
    setRows(filteredRows); // Set filtered rows using setRows
    handleCloseFilter('callCategory'); // Close the filter menu after applying the filter
  };

  // Filter rows based on Area search
  const handleFilterChangeArea = () => {
    const filteredRows = filterValueState['area'] ? rows.filter((row) =>
      row.area.toLowerCase().includes(filterValueState['area']?.name.toLowerCase())
    ) : row1;
    setRows(filteredRows); // Set filtered rows using setRows
    handleCloseFilter('area'); // Close the filter menu after applying the filter
  };

  const handleFilterChangeExec = () => {
    let filteredRows;

    if (filterType === "allocated") {
      filteredRows = filterValueState['executive'] ? rows.filter((row) =>
        row.executive.toLowerCase().includes(filterValueState['executive']?.name.toLowerCase())
      ) : row1;
    } else if (filterType === "unallocated") {
      filteredRows = row1.filter((row) => row.executive === "");
    } else {
      setFilterValueState((prevState) => ({
        ...prevState,
        ["executive"]: null, // Set the selected value for the specific field
      }));
      filteredRows = row1; // Reset filter
    }

    setRows(filteredRows);
    handleCloseFilter("executive")
  };


  // Handle filtering rows based on the search string
  const handleFilterChangeNextAction = () => {
    const filteredRows = filterValueState['nextAction'] ? rows.filter(row =>
      row.nextAction.toLowerCase().includes(filterValueState['nextAction'].name.toLowerCase())
    ) : row1;
    setRows(filteredRows);
    handleCloseFilter('nextAction');
  };

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibilityModel((prev: { [x: string]: any }) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle custom filter for call status
  const handleFilterChangeCallStatus = () => {
    if (selectedStatus && callFilter == "0") {
      const filteredRows = row1.filter((row) => (
        row.callStatus === selectedStatus)
      );
      setRows(filteredRows);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      const filteredRows = row1.filter((row) => {
        row.executive.length > 0 && row.callStatus === selectedStatus
      })
      setRows(filteredRows)
    }
    if (selectedStatus == "Open" && callFilter == "2") {
      const filteredRows = row1.filter((row) => {
        row.executive.length == 0 && row.callStatus === selectedStatus
      })
      setRows(filteredRows)
    }
    else {
      setRows(row1); // Reset to initial if no filter is applied
    }
    handleCloseFilter("callStatus")
  };

  const handleFilterChangeDate = () => {
    const today = new Date();
    const todayDateString = today.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD

    const filteredRows = rows.filter((row) => {
      // Convert row actionDate to date and compare
      const rowDate = new Date(row.actionDate).toLocaleDateString('en-CA');
      const initial = filterValueState.actionDate?.initial ? new Date(filterValueState.actionDate?.initial).toLocaleDateString('en-CA') : null;

      const final = filterValueState.actionDate?.final ? new Date(filterValueState.actionDate?.final).toLocaleDateString('en-CA') : null;

      // Check for Current Date
      if (dateFilter === '1') {
        return rowDate === todayDateString;
      }

      // Check for Date Range filter
      if (dateFilter === '3') {
        if (initial && final) {
          return rowDate >= initial && rowDate <= final;
        } else if (initial) {
          return rowDate >= initial;
        } else if (final) {
          return rowDate <= final;
        }
      }

      return true; // No filter applied
    });

    setRows(filteredRows);
    handleCloseFilter("date")
  };


  const newhandleFilterReset = (field: string) => {
    setFilterValueState((prevState) => ({
      ...prevState,
      [field]: null, // Reset the specific field's filter
    }));
    setRows(row1); // Reset rows to initial data
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
    { field: "id", headerName: "Call No.", width: 70, sortable: false },
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
      filterable: false, // Disable default filter
      renderHeader: () => (
        <Box>
          <Button sx={{ color: filterValueState.callCategory ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Call Category" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('callCategory')}
          >
            Call Category
          </Button>
          <Menu
            anchorEl={dlgState['callCategory']}
            open={Boolean(dlgState['callCategory'])}
            onClose={() => handleCloseFilter('callCategory')}
          >
            <MenuItem>
              <AutocompleteDB
                name={"category"}
                id={"category"}
                label={"Category"}
                // onChange={(e, val, s) => setCategorySearchText(val)}
                onChange={(e, val, s) => handleFilterChange('callCategory', val)}
                fetchDataFn={getEnquiryCategory}
                defaultValue={
                  {
                    id: filterValueState?.callCategory?.id,
                    name: filterValueState?.callCategory?.name,
                  } as optionsDataT
                }
                diaglogVal={{
                  id: filterValueState?.callCategory?.id,
                  name: filterValueState?.callCategory?.name,
                  detail: undefined
                }}
                setDialogVal={function (value: React.SetStateAction<optionsDataT>): void {
                }}
                fnSetModifyMode={function (id: string): void {
                }}
              />
            </MenuItem>
            <MenuItem>
              <Button
                onClick={handleFilterChangeCategory}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={() => newhandleFilterReset('callCategory')}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </Button>
              </MenuItem>
            </MenuItem>

          </Menu>
        </Box>
      ),
    },
    {
      field: "area", headerName: "Area", width: 100, filterable: false, // Disable default filter
      renderHeader: () => (
        <Box>
          <Button sx={{ color: filterValueState.area ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Area" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('area')}
          >
            Area
          </Button>
          <Menu
            anchorEl={dlgState['area']}
            open={Boolean(dlgState['area'])}
            onClose={() => handleCloseFilter('area')}
          >
            <MenuItem>
              <AutocompleteDB
                name={"area"}
                id={"area"}
                label={"Area"}
                width={210}
                fetchDataFn={getArea}
                onChange={(e, val, s) => handleFilterChange('area', val)}
                defaultValue={
                  {
                    id: filterValueState?.area?.id,
                    name: filterValueState?.area?.name,
                  } as optionsDataT
                }
                diaglogVal={{
                  id: filterValueState?.area?.id,
                  name: filterValueState?.area?.name,
                  detail: undefined
                }}
                setDialogVal={function (value: React.SetStateAction<optionsDataT>): void {
                }}
                fnSetModifyMode={function (id: string): void {
                }}
              />
            </MenuItem>
            <MenuItem>
              <Button
                onClick={handleFilterChangeArea}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={() => newhandleFilterReset('area')}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </Button>
              </MenuItem>
            </MenuItem>

          </Menu>
        </Box>
      ),
    },
    {
      field: "executive", headerName: "Executive", width: 100, renderHeader: () => (
        <Box>
          <Button sx={{ color: filterValueState.executive || filterType !== "reset" ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Executive" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('executive')}
          >
            Executive
          </Button>
          <Menu
            anchorEl={dlgState['executive']}
            open={Boolean(dlgState['executive'])}
            onClose={() => handleCloseFilter('executive')}
          >

            <MenuItem sx={{ bgcolor: "white" }}>
              <RadioGroup
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <FormControlLabel
                  value="allocated"
                  control={<Radio />}
                  label="Allocated"
                />
                <FormControlLabel
                  value="unallocated"
                  control={<Radio />}
                  label="Unallocated"
                />
                <FormControlLabel
                  value="reset"
                  control={<Radio />}
                  label="Reset Filter"
                />
              </RadioGroup>
            </MenuItem>
            {filterType === "allocated" && (
              <MenuItem>
                <AutocompleteDB
                  name={"executive"}
                  id={"executive"}
                  label={"Executive"}
                  // width={210}
                  onChange={(e, val, s) => handleFilterChange('executive', val)}
                  fetchDataFn={getExecutive}
                  defaultValue={
                    {
                      id: filterValueState?.executive?.id,
                      name: filterValueState?.executive?.name,
                    } as optionsDataT
                  }
                  diaglogVal={{
                    id: filterValueState?.executive?.id,
                    name: filterValueState?.executive?.name,
                    detail: undefined
                  }}
                  setDialogVal={function (value: React.SetStateAction<optionsDataT>): void {
                  }}
                  fnSetModifyMode={function (id: string): void {
                  }}
                />
              </MenuItem>
            )}

            <MenuItem>
              <Button
                onClick={handleFilterChangeExec}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={() => {
                    newhandleFilterReset('executive')
                    setFilterType("reset")
                  }
                  }
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </Button>
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
    {
      field: "callStatus", headerName: "Call Status", width: 100, renderHeader: () => (
        <Box>
          <Button sx={{ color: selectedStatus !== "" ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter Call Status" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('callStatus')}
          >
            Call Status
          </Button>
          <Menu
            anchorEl={dlgState['callStatus']}
            open={Boolean(dlgState['callStatus'])}
            onClose={() => handleCloseFilter('callStatus')}
          >
            <MenuItem>
              <FormControl component="fieldset">
                <RadioGroup
                  value={selectedStatus}
                  onChange={handleSelectedStatus}
                >
                  <FormControlLabel value="Open" control={<Radio />} label="Open" />
                  <FormControlLabel value="Closed" control={<Radio />} label="Closed" />
                  <FormControlLabel value="" control={<Radio />} label="Both Calls" />
                </RadioGroup>
              </FormControl>
            </MenuItem>
            <MenuItem>
              {selectedStatus !== "" &&
                <FormControl
                  variant="outlined"
                  sx={{ Width: 50, marginLeft: "0px" }}
                  size="small"
                >
                  <Select
                    labelId="filter-on-label"
                    id="filter-on"
                    datatype="string"
                    name="filter-on"
                    value={callFilter}
                    onChange={handleCallFilterChange}
                  >

                    {selectedStatus === "Open" && <MenuItem value={"1"}>Allocated</MenuItem>}
                    {selectedStatus === "Open" && <MenuItem value={"2"}>Unallocated</MenuItem>}
                    {selectedStatus === "Closed" && <MenuItem value={"3"}>Success</MenuItem>}
                    {selectedStatus === "Closed" && <MenuItem value={"4"}>Failure</MenuItem>}

                    <MenuItem value={"0"}>Both Calls</MenuItem>
                  </Select>
                </FormControl>
              }
            </MenuItem>
            <MenuItem>
              <Button
                onClick={() => {
                  handleFilterChangeCallStatus();
                }}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={() => {
                    newhandleFilterReset('callStatus')
                    setSelectedStatus("")
                    handleCloseFilter("callStatus")
                  }}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </Button>
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box >
      ),
      renderCell: (params) => (
        <span>{params.row.callStatus}</span>
      ),
    },
    {
      field: "subStatus", headerName: "Sub Status", width: 100,
      filterable: false, // Disable default filter
      renderHeader: () => (
        <Box>
          <Button sx={{ color: filterValueState.subStatus ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Sub Status" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('subStatus')}
          >
            Sub Status
          </Button>
          <Menu
            anchorEl={dlgState['subStatus']}
            open={Boolean(dlgState['subStatus'])}
            onClose={() => handleCloseFilter('subStatus')}
          >
            <MenuItem>
              <RadioGroup
                value={status}
                onChange={handleSelectedSubStatus}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sub Status for Open Calls"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Sub Status for Closed Calls"
                />
              </RadioGroup>
            </MenuItem>
            <MenuItem>

              <AutocompleteDB
                name={"sub_status"}
                id={"sub_status"}
                label={"Call Sub-Status"}
                onChange={(e, val, s) => handleFilterChange('subStatus', val)}
                // fetchDataFn={getSubStatusforStatus}
                fetchDataFn={(roleStr: string) =>
                  getEnquirySubStatus(roleStr, status)
                }
                defaultValue={
                  {
                    id: filterValueState?.subStatus?.id,
                    name: filterValueState?.subStatus?.name,
                  } as optionsDataT
                }
                diaglogVal={{
                  id: filterValueState?.subStatus?.id,
                  name: filterValueState?.subStatus?.name,
                  detail: undefined
                }}
                setDialogVal={function (value: React.SetStateAction<optionsDataT>): void {
                }}
                fnSetModifyMode={function (id: string): void {
                }}
              />
            </MenuItem>
            <MenuItem>
              <Button
                onClick={handleFilterChangeSubStatus}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={() => {
                    newhandleFilterReset('subStatus')
                    handleCloseFilter("subStatus")
                  }}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </Button>
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
    {
      field: "nextAction", headerName: "Next Action", width: 100,
      filterable: false, // Disable default filtering
      renderHeader: () => (
        <Box>
          <Button sx={{ color: filterValueState.nextAction ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter Next Action" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('nextAction')}
          >
            Next Action
          </Button>
          <Menu
            anchorEl={dlgState['nextAction']}
            open={Boolean(dlgState['nextAction'])}
            onClose={() => handleCloseFilter('nextAction')}
          >
            <MenuItem>
              <AutocompleteDB
                name={"next_action"}
                id={"next_action"}
                label={"Next Action"}
                onChange={(e, val, s) => handleFilterChange('nextAction', val)}
                fetchDataFn={getEnquiryAction}
                defaultValue={
                  {
                    id: filterValueState?.nextAction?.id,
                    name: filterValueState?.nextAction?.name,
                  } as optionsDataT
                }
                diaglogVal={{
                  id: filterValueState?.nextAction?.id,
                  name: filterValueState?.nextAction?.name,
                  detail: undefined
                }}
                setDialogVal={function (value: React.SetStateAction<optionsDataT>): void {
                }}
                fnSetModifyMode={function (id: string): void {
                }}
              />
            </MenuItem>
            <MenuItem>
              <Button
                onClick={handleFilterChangeNextAction}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={() => newhandleFilterReset('nextAction')}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </Button>
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ),
      renderCell: (params) => (
        <span>{params.row.nextAction}</span>
      ),
    },
    {
      field: "actionDate",
      headerName: "Action Date",
      width: 100,
      // type: "dateTime",
      filterable: false, // Disable default filtering for date
      renderHeader: () => (
        <Box>
          <Button sx={{ color: dateFilter !== "0" ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter Date" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('actionDate')}
          >
            Action Date
          </Button>
          <Menu
            anchorEl={dlgState['actionDate']}
            open={Boolean(dlgState['actionDate'])}
            onClose={() => handleCloseFilter('actionDate')}
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
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                >
                  <MenuItem value={"0"}>--None--</MenuItem>
                  <MenuItem value={"1"}>Current Date</MenuItem>
                  {/* <MenuItem value={"2"}>Next Date</MenuItem> */}
                  <MenuItem value={"3"}>Date Range</MenuItem>
                </Select>
              </FormControl>
            </MenuItem>
            {dateFilter === "3" && (
              <>
                <MenuItem>
                  <TextField
                    label="Initial Date"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={filterValueState?.actionDate?.initial}
                    // onChange={(e) => setInitialDate(e.target.value)}
                    onChange={(e) => handleFilterChange("actionDate", { ...filterValueState?.actionDate, "initial": e.target.value })}
                    type="date"
                    fullWidth
                  />
                </MenuItem>

                <MenuItem>
                  <TextField
                    label="Final Date"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={filterValueState?.actionDate?.final}
                    // onChange={(e) => setFinalDate(e.target.value)}
                    onChange={(e) => handleFilterChange("actionDate", { ...filterValueState?.actionDate, "final": e.target.value })}
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
                  handleCloseFilter('actionDate');
                }}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={() => {
                    newhandleFilterReset("actionDate")
                    setDateFilter("0")
                  }
                  }
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </Button>
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
    {
      field: "columnConfig", headerName: "Column Config",
      renderHeader: () => (
        <Box>
          <IconButton
            aria-controls="tune-menu"
            aria-haspopup="true"
            onClick={handleClickFilter('columnConfig')}
          >
            <TuneIcon fontSize="small" />
          </IconButton>
          <Box>
            <StyledMenu
              id="tune-menu"
              anchorEl={dlgState['columnConfig']}
              open={Boolean(dlgState['columnConfig'])}
              onClose={() => handleCloseFilter('columnConfig')}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                {column1
                  .filter(col => col.field !== 'columnConfig')
                  .map((col) => (
                    <FormControlLabel
                      key={col.field}
                      control={
                        <Checkbox
                          checked={columnVisibilityModel[col.field] !== false}
                          onChange={() => handleColumnVisibilityChange(col.field)}
                        />
                      }
                      label={col.headerName}
                    />
                  ))}
              </div>
            </StyledMenu>
          </Box>
        </Box>
      )
    },
  ]

  const handleDateFilterChange = (event: SelectChangeEvent) => {
    setDateFilter(event.target.value as string);
    // console.log(Filter);
  };

  const handleCallFilterChange = (event: SelectChangeEvent) => {
    setCallFilter(event.target.value as string);
  };


  const status_date = new Date();

  return (
    <Box sx={{ bgcolor: "#f3f1f17d", width: "100%", height: "100vh" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // height: "40%",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: "12px",
          alignItems: "center"
        }}
      >
        <Grid
          item
          xs={4}
          // component="fieldset"
          sx={{
            // width: "15vw",
            // display: "flex",
            // flexDirection: "column",
            // border: "0.01rem solid #686D76",
            justifyContent: "center",
            // alignContent: "center",
            padding: "0px",
            // height: "50%",
          }}
        >
          <Paper
            component="fieldset"
            sx={{ height: "50%", border: "1px solid #64748b", p: "10px" }}
          >
            <legend>Date-Range</legend>
            <Grid sx={{ display: "flex", flexDirection: "row", width: "45vw", flexWrap: "wrap" }}>
              {/* Input fields for start date and end date */}
              <TextField
                label="Start Date"
                type="date"
                value={filterValueState?.date?.initial}
                // onChange={(e) => setInitialDate(e.target.value)}
                onChange={(e) => handleFilterChange("date", { ...filterValueState?.date, "initial": e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mr: 2 }}
                size="small"
              />
              <TextField
                label="End Date"
                type="date"
                value={filterValueState?.date?.final}
                onChange={(e) => handleFilterChange("date", { ...filterValueState?.date, "final": e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mr: 2 }}
                size="small"
              />
              <Button variant="contained"
                onClick={handleDateFilter}
                sx={{ mr: "2%", height: "2.3rem", fontSize: '10px' }}
              >
                Apply Filter
              </Button>
              <Button onClick={() => newhandleFilterReset("date")}
                variant="contained"
                sx={{ height: "2.3rem", fontSize: '10px' }}
              >
                Reset Filter
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          xs={3}
          // component="fieldset"
          sx={{
            // width: "15vw",
            // display: "flex",
            // flexDirection: "column",
            // border: "0.01rem solid #686D76",
            justifyContent: "center",
            // alignContent: "center",
            padding: "0px",
            // height: "50%",
          }}
        >
          <Paper
            component="fieldset"
            sx={{ height: "50%", border: "1px solid #64748b", p: "10px" }}
          >
            <legend>Today's Date</legend>
            <Grid sx={{
              display: "flex", flexDirection: "row", width: "100%", alignItems: "center", // Align vertically
              justifyContent: "flex-start",
            }}>
              <Typography sx={{ mr: "1vw", fontSize: "16px" }}>Status:</Typography>
              <Box sx={{ fontSize: "16px" }}>{status_date.toDateString()}</Box>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        sx={{
          border: "0.01rem solid #686D76",
          bgcolor: "white",
          width: "100%",
          mt: "2%"
        }}
      >
        <Paper>
          <DataGrid
            // rows={rows}
            rows={data ? data : []}
            columns={column1}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)}
            onRowSelectionModelChange={handleRowSelection} // Event listener for row selection
            rowSelectionModel={selectedRow?.id ? [selectedRow.id] : []}
          />
        </Paper>
      </Grid>
      <Grid sx={{ display: "flex", marginTop: "1vh" }}>
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
        {selectedRow && (<Box> Call Details : {selectedRow.callNo} ({selectedRow.contactParty})(Org:)(Ledger:)</Box>)}
        <Paper sx={{ border: "0.01rem solid #686D76", bgcolor: "white" }}>
          <CallDetailList />
        </Paper>
      </Grid>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1vh",

          justifyContent: "space-between"
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
            // alignItems: "center",
            flexWrap: "wrap",
            width: "50%",
            // justifyContent: "space-between",
            rowGap: 1,
            columnGap: 3,
            // border: "1px solid black"
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "blue",
                // marginLeft: "40px",
                marginRight: "5px",
              }}
            ></Box>
            <Typography>Open-Unalllocated</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", }}
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
            sx={{ display: "flex", alignItems: "center" }}
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
            sx={{ display: "flex", alignItems: "center" }}
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
