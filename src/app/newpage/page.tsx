"use client";
import * as React from "react";
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
import { SelectMasterWrapper } from "../Widgets/masters/selectMasterWrapper";
import { getExecutive } from "../controllers/executive.controller";
import { optionsDataT, selectKeyValueT } from "../models/models";
import { getArea } from "../controllers/area.controller";
import { getEnquiryCategory } from "../controllers/enquiryCategory.controller";
import AutocompleteDB from "../Widgets/AutocompleteDB";
import CallDetailList from "./CallDetailList";
import { getEnquirySubStatus } from "../controllers/enquirySubStatus.controller";
import { getEnquiryAction } from "../controllers/enquiryAction.controller";

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
  const [anchorElDate, setAnchorElDate] = React.useState<null | HTMLElement>(null);
  const [initialDate, setInitialDate] = React.useState<string>("");
  const [finalDate, setFinalDate] = React.useState<string>("");
  const [dateFilter, setDateFilter] = React.useState("0");
  const [anchorElCallStatus, setAnchorElCallStatus] = React.useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>("");
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({} as any);
  const [anchorElNextAction, setAnchorElNextAction] = React.useState<null | HTMLElement>(null);
  const [nextActionFilter, setNextActionFilter] = React.useState<selectKeyValueT>({});
  const [anchorElExec, setAnchorElExec] = React.useState<null | HTMLElement>(null);
  const [execSearchText, setExecSearchText] = React.useState<selectKeyValueT>({});
  const [filterType, setFilterType] = React.useState<string>("reset"); // Default to "reset"
  const [anchorElArea, setAnchorElArea] = React.useState<null | HTMLElement>(null);
  const [areaSearchText, setAreaSearchText] = React.useState<selectKeyValueT>({});
  const [anchorElCategory, setAnchorElCategory] = React.useState<null | HTMLElement>(
    null
  );
  const [categorySearchText, setCategorySearchText] = React.useState<selectKeyValueT>({});
  const [anchorElSubStatus, setAnchorElSubStatus] = React.useState<null | HTMLElement>(null);
  const [subStatusSearchText, setSubStatusSearchText] = React.useState<selectKeyValueT>({});
  const [status, setStatus] = React.useState("1");
  const [startDate, setStartDate] = React.useState<string>(""); // Start date state
  const [endDate, setEndDate] = React.useState<string>(""); // End date state
  const [callFilter, setCallFilter] = React.useState<string>("0");
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [filterColor, setFilterColor] = React.useState<boolean>(true);

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    if (selectionModel.length > 0) {
      const selectedId = selectionModel[0]; // Get the ID of the selected row
      const selectedData = rows.find((row) => row.id === selectedId); // Find the corresponding row data
      setSelectedRow(selectedData); // Set the selected row data
    }
  };

  // Handle the filtering of rows based on the date range
  const handleDateFilter = () => {
    const filteredRows = rows.filter((row) => {
      const rowDate = new Date(row.date).getTime(); // Convert row date to timestamp
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;

      if (start !== null && end !== null) {
        return rowDate >= start && rowDate <= end; // Filter between start and end date
      } else if (start !== null) {
        return rowDate >= start; // Filter from start date onward
      } else if (end !== null) {
        return rowDate <= end; // Filter up to end date
      } else {
        return true; // No filter applied
      }
    });

    setRows(filteredRows); // Set filtered rows
  };

  const handleSelectedStatus = (e: SelectChangeEvent) => {
    setSelectedStatus(e.target.value);
    setCallFilter("0");
  }

  const handleSelectedSubStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    setSubStatusSearchText({});
  }

  // Handle filter menu open/close for Sub Status
  const handleClickSubStatus = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSubStatus(event.currentTarget);
  };

  const handleCloseSubStatus = () => {
    setAnchorElSubStatus(null);
  };

  // Filter rows based on Sub Status search
  const handleFilterChangeSubStatus = () => {
    const filteredRows = subStatusSearchText ? rows.filter((row) =>
      row.subStatus.toLowerCase().includes(subStatusSearchText.name.toLowerCase())
    ) : row1;
    setRows(filteredRows); // Set filtered rows using setRows
    handleCloseSubStatus(); // Close the filter menu after applying the filter
  };



  const handleClickCategory = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setAnchorElCategory(null);
  };

  // Filter rows based on Call Category search
  const handleFilterChangeCategory = () => {
    const filteredRows = categorySearchText ? rows.filter((row) =>
      row.callCategory.toLowerCase().includes(categorySearchText.name.toLowerCase())
    ) : row1;
    setRows(filteredRows); // Set filtered rows using setRows
    handleCloseCategory(); // Close the filter menu after applying the filter
  };

  // Handle filter menu open/close for Area
  const handleClickArea = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElArea(event.currentTarget);
    console.log(anchorElArea);
  };

  const handleCloseArea = () => {
    setAnchorElArea(null);
  };

  // Filter rows based on Area search
  const handleFilterChangeArea = () => {
    const filteredRows = areaSearchText ? rows.filter((row) =>
      row.area.toLowerCase().includes(areaSearchText.name.toLowerCase())
    ) : row1;
    setRows(filteredRows); // Set filtered rows using setRows
    handleCloseArea(); // Close the filter menu after applying the filter
  };

  const handleClickExec = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElExec(event.currentTarget);
  };

  const handleCloseExec = () => {
    setAnchorElExec(null);
  };

  const handleFilterChangeExec = () => {
    let filteredRows;

    if (filterType === "allocated") {
      filteredRows = execSearchText.name ? rows.filter((row) =>
        row.executive.toLowerCase().includes(execSearchText.name.toLowerCase())
      ) : row1;

    } else if (filterType === "unallocated") {
      filteredRows = row1.filter((row) => row.executive === "");
    } else {
      setExecSearchText({});
      filteredRows = row1; // Reset filter
    }

    setRows(filteredRows);
    handleCloseExec(); // Close the filter menu after applying the filter
  };

  // Handle custom filter menu open for Next Action
  const handleClickNextAction = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNextAction(event.currentTarget);
  };

  // Handle custom filter menu close for Next Action
  const handleCloseNextAction = () => {
    setAnchorElNextAction(null);
  };

  // Handle input change for the search string
  const handleSearchChange = (value: selectKeyValueT) => {
    setNextActionFilter(value);
  };

  // Handle filtering rows based on the search string
  const handleFilterChangeNextAction = () => {
    const filteredRows = nextActionFilter ? rows.filter(row =>
      row.nextAction.toLowerCase().includes(nextActionFilter.name.toLowerCase())
    ) : row1;
    setRows(filteredRows);
    handleCloseNextAction(); // Close the menu after filtering
  };


  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl2(null);
  };

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibilityModel((prev: { [x: string]: any }) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleClickCallStatus = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCallStatus(event.currentTarget);
  };

  // Handle custom filter menu close for Call Status
  const handleCloseCallStatus = () => {
    setAnchorElCallStatus(null);
  };

  // Handle custom filter for call status
  const handleFilterChangeCallStatus = () => {
    if (selectedStatus && callFilter == "0") {
      const filteredRows = row1.filter((row) => (
        row.callStatus === selectedStatus)
      );
      setRows(filteredRows)
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
  };

  const handleClickDate = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDate(event.currentTarget);
  };
  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  // const handleFilterChangeDate = () => {
  //   const today = new Date();
  //   const filteredRows = row1.filter((row) => {

  //     const rowDate = new Date(row.actionDate).getTime();
  //     const initial =
  //       initialDate !== "" ? new Date(initialDate).getTime() : null;
  //     const final = finalDate !== "" ? new Date(finalDate).getTime() : null;

  //     if (initial !== null && final !== null) {
  //       return rowDate >= initial && rowDate <= final;
  //     } else if (initial !== null) {
  //       return rowDate >= initial;
  //     } else if (final !== null) {
  //       return rowDate <= final;
  //     } else {
  //       return true;
  //     }
  //   });

  //   setRows(filteredRows);
  // };

  const handleFilterChangeDate = () => {
    const today = new Date();
    const todayDateString = today.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD

    const filteredRows = rows.filter((row) => {
      // Convert row actionDate to date and compare
      const rowDate = new Date(row.actionDate).toLocaleDateString('en-CA');
      const initial = initialDate ? new Date(initialDate).toLocaleDateString('en-CA') : null;
      const final = finalDate ? new Date(finalDate).toLocaleDateString('en-CA') : null;

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
  };

  const handleFilterReset = () => {
    setRows(row1); // Set filtered rows using setRows
    handleCloseArea();
    handleClose1();
    handleCloseCallStatus();
    handleCloseCategory();
    handleCloseDate();
    handleCloseExec();
    handleCloseNextAction();
    handleCloseSubStatus();
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
    { field: "callNo", headerName: "Call No.", width: 70, sortable: false },
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
          <Button sx={{ color: filterColor ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Call Category" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickCategory}
          >
            Call Category
          </Button>
          <Menu
            anchorEl={anchorElCategory}
            open={Boolean(anchorElCategory)}
            onClose={handleCloseCategory}
          >
            <MenuItem>
              <AutocompleteDB
                name={"category"}
                id={"category"}
                label={"Category"}
                onChange={(e, val, s) => setCategorySearchText(val)}
                fetchDataFn={getEnquiryCategory}
                defaultValue={
                  {
                    id: categorySearchText?.id,
                    name: categorySearchText?.name,
                  } as optionsDataT
                }
                diaglogVal={{
                  id: categorySearchText?.id,
                  name: categorySearchText?.name,
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
                  onClick={handleFilterReset}
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
          <Button sx={{ color: anchorElArea ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Area" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickArea}
          >
            Area
          </Button>
          <Menu
            anchorEl={anchorElArea}
            open={Boolean(anchorElArea)}
            onClose={handleCloseArea}
          >
            <MenuItem>
              {/* <SelectMasterWrapper
                name={"area"}
                id={"area"}
                label={"Area"}
                width={210}
                dialogTitle={"Add Area"}
                fetchDataFn={getArea}
                defaultValue={
                  {
                    id: areaSearchText?.id,
                    name: areaSearchText?.name,
                  } as optionsDataT
                }
                onChange={(e, val, s) => setAreaSearchText(val)}
                allowNewAdd={false}
                allowModify={false}
              /> */}
              <AutocompleteDB
                name={"area"}
                id={"area"}
                label={"Area"}
                width={210}
                fetchDataFn={getArea}
                defaultValue={{
                  id: areaSearchText?.id,
                  name: areaSearchText?.name,
                } as optionsDataT}
                onChange={(e, val, s) => setAreaSearchText(val)}
                diaglogVal={{
                  id: areaSearchText?.id,
                  name: areaSearchText?.name,
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
                  onClick={handleFilterReset}
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
          <Button sx={{ color: anchorElExec ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Executive" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickExec}
          >
            Executive
          </Button>
          <Menu
            anchorEl={anchorElExec}
            open={Boolean(anchorElExec)}
            onClose={handleCloseExec}
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
                {/* <TextField
                      label="Search Executive"
                      variant="outlined"
                      size="small"
                      value={execSearchText}
                      onChange={(e) => setExecSearchText(e.target.value)}
                      fullWidth
                    /> */}

                <AutocompleteDB
                  name={"executive"}
                  id={"executive"}
                  label={"Executive"}
                  // width={210}
                  onChange={(e, val, s) =>
                    setExecSearchText(val)
                  }
                  fetchDataFn={getExecutive}
                  defaultValue={
                    {
                      id: execSearchText?.id,
                      name: execSearchText?.name,
                    } as optionsDataT}
                  diaglogVal={{
                    id: execSearchText?.id,
                    name: execSearchText?.name,
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
                  onClick={handleFilterReset}
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
          <Button sx={{ color: anchorElCallStatus ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter Call Status" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickCallStatus}
          >
            Call Status
          </Button>
          <Menu
            anchorEl={anchorElCallStatus}
            open={Boolean(anchorElCallStatus)}
            onClose={handleCloseCallStatus}
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
                  handleCloseCallStatus();
                }}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </Button>
              <MenuItem>
                <Button
                  onClick={handleFilterReset}
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
          <Button sx={{ color: anchorElSubStatus ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter by Sub Status" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickSubStatus}
          >
            Sub Status
          </Button>
          <Menu
            anchorEl={anchorElSubStatus}
            open={Boolean(anchorElSubStatus)}
            onClose={handleCloseSubStatus}
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
                onChange={(e, v, s) => setSubStatusSearchText(v)}
                // fetchDataFn={getSubStatusforStatus}
                defaultValue={
                  {
                    id: subStatusSearchText?.id,
                    name: subStatusSearchText?.name,
                  } as optionsDataT
                }
                fetchDataFn={(roleStr: string) =>
                  getEnquirySubStatus(roleStr, status)
                }
                diaglogVal={{
                  id: subStatusSearchText?.id,
                  name: subStatusSearchText?.name,
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
                  onClick={handleFilterReset}
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
          <Button sx={{ color: anchorElNextAction ? "blue" : "black" }}
            startIcon={
              <Tooltip title="Filter Next Action" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickNextAction}
          >
            Next Action
          </Button>
          <Menu
            anchorEl={anchorElNextAction}
            open={Boolean(anchorElNextAction)}
            onClose={handleCloseNextAction}
          >
            <MenuItem>
              <AutocompleteDB
                name={"next_action"}
                id={"next_action"}
                label={"Next Action"}
                onChange={(e, v, s) => handleSearchChange(v)}
                fetchDataFn={getEnquiryAction}
                diaglogVal={{
                  id: nextActionFilter?.id,
                  name: nextActionFilter?.name,
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
                  onClick={handleFilterReset}
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
          <Button sx={{ color: anchorElDate ? "blue" : "black" }}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
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
              <MenuItem>
                <Button
                  onClick={handleFilterReset}
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
            onClick={handleClick1}
          >
            <TuneIcon fontSize="small" />
          </IconButton>
          <Box>
            <StyledMenu
              id="tune-menu"
              anchorEl={anchorEl2}
              open={Boolean(anchorEl2)}
              onClose={handleClose1}
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
    console.log(callFilter);
  };


  // async function getSubStatusforStatus(stateStr: string) {
  //   const subStatus = await getEnquirySubStatus(stateStr, "1");
  //   if (subStatus?.length > 0) {
  //     return subStatus;
  //   }
  // }

  const status_date = new Date();

  return (
    <Box sx={{ bgcolor: "#f3f1f17d", width: "100%" }}>
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
        {/* <Grid
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
            height: "50%",
          }}
        > */}
        <Paper
          component="fieldset"
          sx={{ height: "50%", border: "1px solid #64748b", p: "10px" }}
        >
          <legend>Date-Range</legend>
          <Grid sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {/* Input fields for start date and end date */}
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mr: 2 }}
              size="small"
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mr: 2 }}
              size="small"
            />
            <Button variant="contained"
              onClick={handleDateFilter}
              sx={{ height: "6vh", fontSize: '10px' }} size="small"
            >
              Apply Filter
            </Button>
            <Button onClick={handleFilterReset}
              variant="contained"
              sx={{ ml: "2%", height: "6vh", fontSize: '10px' }} size="small"
            >
              Reset Filter
            </Button>
          </Grid>
        </Paper>
        <Paper
          component="fieldset"
          sx={{ height: "50%", border: "1px solid #64748b", p: "10px" }}
        >
          <legend>Today's Date</legend>
          <Grid sx={{
            display: "flex", flexDirection: "row", width: "100%", alignItems: "center", // Align vertically
            justifyContent: "flex-start",
          }}>
            {/* Input fields for start date and end date */}
            <Typography sx={{ mr: "1vw", fontSize: "16px" }}>Status:</Typography>
            <Box sx={{ fontSize: "16px" }}>{status_date.toDateString()}</Box>
          </Grid>
        </Paper>

        {/* </Grid> */}


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
            rows={rows}
            columns={column1}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)}
            onRowSelectionModelChange={handleRowSelection} // Event listener for row selection
            rowSelectionModel={selectedRow?.id ? [selectedRow.id] : []}
          />
        </Paper>
        {/* {selectedRow && (
          <Box mt={2}>
            <Typography variant="h6">Selected Row Data:</Typography>
            <Typography>Date: {selectedRow.date}</Typography>
            <Typography>Status: {selectedRow.status}</Typography>
          </Box>
        )} */}
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
