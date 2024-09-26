"use client";
import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  Divider,
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
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  ContainedButton,
  OutlinedButton,
  StripedDataGrid,
  StyledMenu,
} from "../../utils/styledComponents";
import TuneIcon from "@mui/icons-material/Tune";
import { getExecutive } from "../../controllers/executive.controller";
import { optionsDataT } from "../../models/models";
import { getArea } from "../../controllers/area.controller";
import { getEnquiryCategory } from "../../controllers/enquiryCategory.controller";
import AutocompleteDB from "../../Widgets/AutocompleteDB";
import CallDetailList from "./CallDetailList";
import { getEnquirySubStatus } from "../../controllers/enquirySubStatus.controller";
import { getEnquiryAction } from "../../controllers/enquiryAction.controller";
import { getCallEnquiries } from "../../controllers/callExplorer.controller";
import { AddDialog } from "../../Widgets/masters/addDialog";
import AllocateCall from "./AllocateCall";

export default function AutoGrid() {
  const pgSize = 10;
  const [data, setData] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState("0");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>("");
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({} as any);
  const [filterType, setFilterType] = React.useState<string>("reset"); // Default to "reset"
  const [status, setStatus] = React.useState("1");
  const [callFilter, setCallFilter] = React.useState<string>("0");
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [pageModel, setPageModel] = React.useState({ page: 0, pageSize: pgSize });
  const [totalRowCount, setTotalRowCount] = React.useState(0); // State for row count
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);


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
      const result = await getCallEnquiries(filterValueState, filterType, selectedStatus, callFilter, dateFilter, pageModel.page + 1, pageModel.pageSize);
      console.log(result);
      setData(result?.result);
      setTotalRowCount(Number(result?.count));
    }
    getEnquiries();
  }, [filterValueState, filterType, selectedStatus, callFilter, dateFilter, dialogOpen])


  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(selectionModel);

    const selectedId = selectionModel[0]; // Get the ID of the selected row
    const selectedData = data.find((row: any) => row.id === selectedId); // Find the corresponding row data
    setSelectedRow(selectedData); // Set the selected row data

    if (selectionModel.length > 1) {
      setSelectedRow(null);
    }
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

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibilityModel((prev: { [x: string]: any }) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const newhandleFilterReset = (field: string) => {
    setFilterValueState((prevState) => ({
      ...prevState,
      [field]: null,
    }));
    handleCloseFilter(field);
  };

  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true, // Use 12-hour format with AM/PM
    hour: '2-digit',
    minute: '2-digit',
  };


  type customCol = { row: any; };

  const CustomColor = (props: customCol) => {
    // console.log("these are the params",props.id)
    let color;
    if (props.row.callStatus === "Open") {
      if (props.row.executive === null) { color = "blue" }
      else { color = "purple" }
    }
    else {
      if (props.row.subStatus === "Success") { color = "green" }
      else { color = "red" }
    }
    return (

      <div>
        <Box
          sx={{
            width: "7px",
            height: "7px",
            bgcolor: color,
            margin: "10px",
          }}
        />

      </div>
    );
  };



  const column1: GridColDef[] = [
    {
      field: "Type",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return <CustomColor row={params.row} />;
      },
    },
    { field: "id", headerName: "Call No.", width: 70, sortable: false },
    { field: "contactParty", headerName: "Contact/Party", width: 130 },
    {
      field: "date", headerName: "Date", width: 130,
      renderCell: (params) => {
        return params.row.date.toDateString();
      },
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      renderCell: (params) => {
        console.log(params.row.date);

        return params.row.date.toLocaleString('en-IN', options);
      },
    },
    {
      field: "callCategory",
      headerName: "Call Category",
      width: 120,
      filterable: false, // Disable default filter
      renderHeader: () => (
        <Box>
          <OutlinedButton
            sx={{ color: filterValueState.callCategory ? "blue" : "black", textTransform: "none" }}
            startIcon={
              <Tooltip title="Filter by Call Category" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('callCategory')}
          >
            Call Category
          </OutlinedButton>
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
              <ContainedButton
                onClick={() => handleCloseFilter("callCategory")}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </ContainedButton>
              <MenuItem>
                <ContainedButton
                  onClick={() => newhandleFilterReset("callCategory")}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </ContainedButton>
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
          <OutlinedButton sx={{ color: filterValueState.area ? "blue" : "black", textTransform: "none" }}
            startIcon={
              <Tooltip title="Filter by Area" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('area')}
          >
            Area
          </OutlinedButton>
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
              <ContainedButton
                onClick={() => handleCloseFilter('area')}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </ContainedButton>
              <MenuItem>
                <ContainedButton
                  onClick={() => newhandleFilterReset('area')}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </ContainedButton>
              </MenuItem>
            </MenuItem>

          </Menu>
        </Box>
      ),
    },
    {
      field: "executive", headerName: "Executive", width: 100, renderHeader: () => (
        <Box>
          <OutlinedButton sx={{ color: filterType !== "reset" ? "blue" : "black", textTransform: "none" }}
            startIcon={
              <Tooltip title="Filter by Executive" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('executive')}
          >
            Executive
          </OutlinedButton>
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
              <ContainedButton
                onClick={() => handleCloseFilter("executive")}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </ContainedButton>
              <MenuItem>
                <ContainedButton
                  onClick={() => {
                    newhandleFilterReset('executive')
                    setFilterType("reset")
                  }
                  }
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </ContainedButton>
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
    {
      field: "callStatus", headerName: "Call Status", width: 100, renderHeader: () => (
        <Box>
          <OutlinedButton sx={{ color: selectedStatus !== "" ? "blue" : "black", textTransform: "none" }}
            startIcon={
              <Tooltip title="Filter Call Status" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('callStatus')}
          >
            Call Status
          </OutlinedButton>
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
              <ContainedButton
                onClick={() => {
                  () => handleCloseFilter("callStatus");
                }}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </ContainedButton>
              <MenuItem>
                <ContainedButton
                  onClick={() => {
                    newhandleFilterReset('callStatus')
                    setSelectedStatus("")
                    handleCloseFilter("callStatus")
                  }}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </ContainedButton>
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
          <OutlinedButton sx={{ color: filterValueState.subStatus ? "blue" : "black", textTransform: "none" }}
            startIcon={
              <Tooltip title="Filter by Sub Status" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('subStatus')}
          >
            Sub Status
          </OutlinedButton>
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
              <ContainedButton
                onClick={() => handleCloseFilter("subStatus")}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </ContainedButton>
              <MenuItem>
                <ContainedButton
                  onClick={() => {
                    newhandleFilterReset('subStatus')
                    handleCloseFilter("subStatus")
                  }}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </ContainedButton>
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
          <OutlinedButton sx={{ color: filterValueState.nextAction ? "blue" : "black", textTransform: "none" }}
            startIcon={
              <Tooltip title="Filter Next Action" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('nextAction')}
          >
            Next Action
          </OutlinedButton>
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
              <ContainedButton
                onClick={() => handleCloseFilter("nextAction")}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </ContainedButton>
              <MenuItem>
                <ContainedButton
                  onClick={() => newhandleFilterReset('nextAction')}
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </ContainedButton>
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
      renderCell: (params) => {
        return params.row.actionDate.toDateString();
      },
      // type: "dateTime",
      filterable: false, // Disable default filtering for date
      renderHeader: () => (
        <Box>
          <OutlinedButton sx={{ color: dateFilter !== "0" ? "blue" : "black", textTransform: "none" }}
            startIcon={
              <Tooltip title="Filter Date" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickFilter('actionDate')}
          >
            Action Date
          </OutlinedButton>
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
              <ContainedButton
                onClick={() => {
                  handleCloseFilter('actionDate');
                }}
                fullWidth
                variant="contained"
              >
                Apply Filter
              </ContainedButton>
              <MenuItem>
                <ContainedButton
                  onClick={() => {
                    newhandleFilterReset("actionDate")
                    setDateFilter("0")
                  }
                  }
                  fullWidth
                  variant="contained"
                >
                  Reset Filter
                </ContainedButton>
              </MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
    {
      field: "actionTime",
      headerName: "Time",
      renderCell: (params) => {
        return params.row.actionDate.toLocaleString('en-IN', options);
      },
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


  const CallType = (props: { text: string, color: string }) => {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "10px",
            height: "10px",
            bgcolor: props.color,
            marginRight: "5px",
          }}
        ></Box>
        <Typography>{props.text}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: "#f3f1f17d", minHeight: '100vh', p: 3, maxWidth: "100%" }}>
      <Box sx={{ maxWidth: "90vw" }}>
        <Paper
          elevation={2}
          style={{ borderRadius: "1em" }}
        >
          <Box>
            <Grid container>
              <Grid item xs={12} md={8} lg={8}>
                <Typography variant="body1" style={{ padding: "0 2%" }}>Date Range</Typography>
                <Divider variant="middle" />
                <Grid
                  container
                  spacing={2}
                  direction={{ xs: "column", md: "row", sm: "row", lg: "row" }}
                  style={{ padding: "2% 2%" }}
                  alignItems="center"
                >
                  <Grid item xs={12} sm={6} md={3} >
                    <TextField
                      label="Start Date"
                      type="date"
                      value={filterValueState.date?.initial}
                      // onChange={(e) => setInitialDate(e.target.value)}
                      onChange={(e) =>
                        handleFilterChange("date", {
                          ...filterValueState?.date,
                          initial: e.target.value,
                        })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // sx={{ mr: 2 }}
                      size="small"
                      fullWidth
                      sx={{
                        flexGrow: { xs: 1, sm: 1, md: 0 }, minWidth: "100px", minHeight: "45px"
                      }}

                    />
                  </Grid>
                  {/* <Divider orientation="vertical" flexItem /> */}
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="End Date"
                      type="date"
                      value={filterValueState.date?.final}
                      onChange={(e) =>
                        handleFilterChange("date", {
                          ...filterValueState?.date,
                          final: e.target.value,
                        })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      fullWidth
                      sx={{
                        flexGrow: { xs: 1, sm: 1, md: 0 }, minWidth: "100px", minHeight: "45px"
                      }}

                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <ContainedButton
                      variant="contained"
                      onClick={() => { }}
                      sx={{
                        flexGrow: { xs: 1, sm: 1, md: 0 },
                        minWidth: "120px", // Ensures minimum button width
                        "@media (min-width: 898px)": {
                          width: "100%", // Ensures consistent width
                        },
                        "@media (max-width: 1028px)": {
                          width: "100%", // Consistent width behavior
                        },
                      }}
                      fullWidth
                      size="small"
                    >
                      Apply Filter
                    </ContainedButton>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <ContainedButton
                      onClick={() => newhandleFilterReset("date")}
                      variant="contained"
                      // sx={{ height: "2.3rem", fontSize: '10px' }}
                      sx={{
                        flexGrow: { xs: 1, sm: 1, md: 0 },
                        minWidth: "120px", // Ensures minimum button width
                        "@media (min-width: 898px)": {
                          width: "100%", // Ensures consistent width
                        },
                        "@media (max-width: 1028px)": {
                          width: "100%", // Consistent width behavior 
                        },
                      }}
                      fullWidth
                      size="small"
                    >
                      Reset Filter
                    </ContainedButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={4} alignItems="flex-start"
              // display={{ xs: 'none', sm: 'block' }}
              // order={{ xs: -1, sm: 0}}
              >
                <Paper elevation={3} style={{ borderRadius: "18em" }}>
                  <Box style={{ display: "flex" }} justifyContent="center"
                  // {{xs:"flex-start", md:"flex-end"}}
                  >
                    <Typography variant="subtitle1" style={{ marginRight: "1%" }}>
                      Today's Date:
                    </Typography>
                    <Typography variant="subtitle1">
                      {status_date.toDateString()}
                    </Typography>
                  </Box>
                </Paper>

              </Grid>
            </Grid>

          </Box>
        </Paper>
        <Paper elevation={1}
        // sx={{ height: "40vh" }}
        >
          <StripedDataGrid
            // rows={rows}
            rowHeight={30}
            columnHeaderHeight={30}
            rows={data ? data : []}
            columns={column1}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)}
            onRowSelectionModelChange={handleRowSelection} // Event listener for row selection
            // rowSelectionModel={selectedRow?.id ? [selectedRow.id] : []}
            rowSelectionModel={rowSelectionModel}
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            paginationModel={pageModel}
            onPaginationModelChange={setPageModel}
            rowCount={totalRowCount}
            checkboxSelection
            sx={{
              mt: "1%",

              height: {
                xs: "auto",
                sm: "auto",
                '@media (min-height: 645px)': {
                  height: '50vh',
                },
              },
              '& .MuiDataGrid-virtualScroller': {
                overflowY: 'auto',
              },
              '& .MuiDataGrid-cellCheckbox': {
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              '& .MuiDataGrid-cellCheckbox .MuiCheckbox-root': {
                padding: 0,
              },
              '& .MuiDataGrid-cellCheckbox .MuiSvgIcon-root': {
                width: '15px',
                height: '15px',
              },
              '& .MuiDataGrid-columnHeaderCheckbox': {
                width: '38px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root': {
                padding: 0,
              },
              '& .MuiDataGrid-columnHeaderCheckbox .MuiSvgIcon-root': {
                width: '15px',
                height: '15px',
              },
            }}
          />
        </Paper>
        <Box sx={{
          padding: "20px 0",
          display: "flex",
          flexWrap: "wrap", // Wraps buttons to the next line
          gap: "1vw", // Adds space between buttons
          "@media (max-width: 300px)": {
            flexDirection: "column", // Stack the buttons vertically on small screens
            alignItems: "center", // Aligns buttons in the center of the column
          },
        }}>
          <ContainedButton
            variant="contained"
            size="small"
            sx={{
              // bgcolor: "#dedfe0",
              // color: "black",
              // boxShadow: "3",
              margin: "0 1vw",
            }}
            onClick={() => setDialogOpen(true)}
          >
            Allocate Call
          </ContainedButton>
          <ContainedButton
            variant="contained"
            size="small"
          >
            Feed Report
          </ContainedButton>
        </Box>
        {selectedRow && (<Box> Call Details : {selectedRow.id} ({selectedRow.contactParty})(Org:)(Ledger:)</Box>)}
        <Paper elevation={1} sx={{ border: "0.01rem solid #686D76", bgcolor: "white" }}>
          <CallDetailList selectedRow={selectedRow} />
        </Paper>
        <Box
          sx={{
            rowGap: 1,
            columnGap: 3,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <ContainedButton
                variant="contained"
                size="small"
                sx={{ margin: "0 1vw" }}
              >
                Hide Details
              </ContainedButton>
              <FormControlLabel
                control={<Checkbox />}
                label="Show Remarks"
                sx={{ marginLeft: { xs: "0vw", sm: "1vw" }, marginTop: { xs: 1, md: 0 } }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap", // Wraps items on smaller screens
                  width: "100%",
                  flexDirection: "row"
                }}
              >
                <Grid >
                  <CallType text="Open-Unallocated" color="blue" />
                </Grid>
                <Grid >
                  <CallType text="Open-Allocated" color="purple" />
                </Grid>
                <Grid >
                  <CallType text="Closed-Failure" color="red" />
                </Grid>
                <Grid >
                  <CallType text="Closed-Success" color="green" />
                </Grid>

              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "1vh" }}>
            <Box
              sx={{
                display: "flex",
                gap: 2, // Adds space between the first three buttons
                flexWrap: "wrap", // Allows wrapping on smaller screens
                width: { xs: '100%', sm: 'auto' }, // Ensures full width on extra small screens
              }}
            >
              <ContainedButton variant="contained" size="small">
                New Call Receipt
              </ContainedButton>
              <ContainedButton variant="contained" size="small">
                New Call Allocation
              </ContainedButton>
              <ContainedButton variant="contained" size="small">
                New Call Report
              </ContainedButton>
            </Box>

            <ContainedButton
              variant="contained"
              size="small"
              sx={{
                marginLeft: { xs: 0, sm: 'auto' }, // Aligns right from small screens (600px) and up
                marginTop: { xs: 2, sm: 0 }, // Adds margin on small screens for spacing
                width: { xs: '100%', sm: 'auto' }, // Makes full width on extra small screens
              }}
            >
              Quit
            </ContainedButton>
          </Box>


        </Box>
        {
          dialogOpen && <AddDialog title={"Allocate Executive"}
            open={dialogOpen}
            setDialogOpen={setDialogOpen}>
            <AllocateCall setDialogOpen={setDialogOpen} data={rowSelectionModel} />
          </AddDialog>
        }
      </Box>
    </Box>
  );
}