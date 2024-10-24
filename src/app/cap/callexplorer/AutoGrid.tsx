"use client";
import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControl, FormControlLabel, IconButton, MenuItem, Paper, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Tooltip, Typography, } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { ContainedButton, StripedDataGrid, StyledMenu } from "../../utils/styledComponents";
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
import Seperator from "@/app/Widgets/seperator";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Link from "next/link";
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterMenu from "./FilterMenu";


export default function AutoGrid(props: any) {
  const pgSize = 10;
  const [data, setData] = React.useState(props.result.result);
  const [dateFilter, setDateFilter] = React.useState("0");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>("");
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({} as any);
  const [filterType, setFilterType] = React.useState<string>("reset"); // Default to "reset"
  const [status, setStatus] = React.useState("1");
  const [callFilter, setCallFilter] = React.useState<string>("0");
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [pageModel, setPageModel] = React.useState({ page: 0, pageSize: pgSize });
  const [totalRowCount, setTotalRowCount] = React.useState(props.count); // State for row count
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = React.useState<number>(5); // Default to 5 minutes
  const [loading, setLoading] = React.useState(false)
  const [details, setDetails] = React.useState(true);
  const [dlgState, setDlgState] = React.useState<DlgState>({});
  const [filterValueState, setFilterValueState] = React.useState<{ [key: string]: any }>({});
  type DlgState = { [key: string]: HTMLElement | null; };
  const [enableAllocate, setEnableAllocate] = React.useState(false);

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const value = parseInt(event.target.value, 10);
    const value = Number(event.target.value);
    setRefreshInterval(value !== undefined ? value : 5); // Set a minimum of 5 minute
  };

  const handleCloseFilter = (field: string) => {
    setDlgState((prevState) => ({
      ...prevState,
      [field]: null,
    }));
  };


  const handleFilterChange = (field: string, value: any) => {
    setFilterValueState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    setLoading(true)
    async function getEnquiries() {
      const result = await getCallEnquiries(filterValueState, filterType, selectedStatus, callFilter, dateFilter, pageModel.page + 1, pageModel.pageSize);
      setData(result?.result);
      setTotalRowCount(Number(result?.count));
    }
    getEnquiries();
    setLoading(false)
  }, [filterValueState, filterType, selectedStatus, callFilter, dateFilter, dialogOpen, refresh])

  const handleRefresh = () => {
    setRefresh(!refresh)
    setRowSelectionModel([]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleRefresh();
    }, refreshInterval * 60000);

    return () => clearInterval(timer);
  }, [refreshInterval]);

  const handleColumnVisibility = () => {
    return <>
      <IconButton
        aria-controls="tune-menu"
        aria-haspopup="true"
        onClick={(event) => {
          setDlgState((prevState) => ({
            ...prevState,
            columnConfig: event.currentTarget,  // Set the clicked button as the anchorEl directly here
          }));
        }}
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
                // (col.field !== "date" && col.field !== "contactParty" && col.field !== "Type" && col.field !== "id") &&
                <FormControlLabel
                  key={col.field}
                  control={
                    <Checkbox
                      checked={columnVisibilityModel[col.field] !== false}
                      onChange={() => handleColumnVisibilityChange(col.field)}
                      disabled={(col.field !== "date" && col.field !== "contactParty" && col.field !== "Type" && col.field !== "id") ? false : true}
                    />
                  }
                  label={col.headerName}
                />
              ))}
          </div>
        </StyledMenu>
      </Box>
    </>
  }

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(selectionModel);
    // Enable Allocate Call button if there are selected rows and no row has 'Closed' callStatus
    if (selectionModel.length > 0) {
      let isAllocatable = true;

      for (let i = 0; i < selectionModel.length; ++i) {
        const selectedData = data.find((row: any) => row.id === selectionModel[i]);

        if (selectedData && selectedData.callStatus === "Closed") {
          isAllocatable = false;
          break; // If any row has 'Closed' status, disable the button
        }
      }

      // Set enableAllocate state based on the conditions
      setEnableAllocate(isAllocatable);
    } else {
      // If no rows are selected, disable the button
      setEnableAllocate(false);
    }

    if (selectionModel?.length > 1) {
      setSelectedRow(null);
    }
    else {
      const selectedId = selectionModel[0]; // Get the ID of the selected row
      const selectedData = data.find((row: any) => row.id === selectedId); // Find the corresponding row data
      setSelectedRow(selectedData); // Set the selected row data
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

  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true, // Use 12-hour format with AM/PM
    hour: '2-digit',
    minute: '2-digit',
  };



  const CustomColor = (props: { row: any; }) => {
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
      headerName: "Status",
      width: 50,
      renderCell: (params) => {
        return <CustomColor row={params.row} />;
      },
    },
    { field: "id", headerName: "Call No.", width: 70, sortable: false },
    { field: "contactParty", headerName: "Contact/Party", width: 130 },
    {
      field: "date", width: 130, headerName: "Date",
      renderCell: (params) => {
        return params.row.date.toDateString();
      },
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"date"}
          headerName={"Date"}
          tooltipTitle={"Filter by Date"}
        >
          <MenuItem>
            <InputControl
              inputType={InputType.DATEINPUT}
              id="initial"
              label="Initial Date"
              name="initial"
              defaultValue={filterValueState.date ? filterValueState.date.initial : null}
              value={filterValueState?.date?.initial}
              onChange={(val: any) => handleFilterChange("date", { ...filterValueState?.date, "initial": val })}
            />
          </MenuItem>
          <MenuItem>
            <InputControl
              inputType={InputType.DATEINPUT}
              id="final"
              label="Final Date"
              name="final"
              defaultValue={filterValueState.date ? filterValueState.date.final : null}
              value={filterValueState?.date?.final}
              onChange={(val: any) => handleFilterChange("date", { ...filterValueState?.date, "final": val })}
            />

          </MenuItem>
        </FilterMenu>
      ),
    },
    {
      field: "time", headerName: "Time", width: 100,
      renderCell: (params) => {
        return params.row.date.toLocaleString('en-IN', options);
      },
    },
    {
      field: "callCategory", width: 120, headerName: "Call Category",
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"callCategory"}
          headerName={"Call Category"}
          tooltipTitle={"Filter by Call Category"}
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
        </FilterMenu>
      ),
    },
    {
      field: "area", width: 100, headerName: "Area",
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"area"}
          headerName={"Area"}
          tooltipTitle={"Filter by Area"}
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
        </FilterMenu>
      ),
    },
    {
      field: "executive", width: 100, headerName: "Executive",
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"executive"}
          headerName={"Executive"}
          tooltipTitle={"Filter by Executive"}
          filterReset={setFilterType}
          resetValue={"reset"}
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
        </FilterMenu>
      ),
    },
    {
      field: "callStatus", headerName: "Call Status", width: 100,
      renderCell: (params) => (
        <span>{params.row.callStatus}</span>
      ),
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"callStatus"}
          headerName={"Call Status"}
          tooltipTitle={"Filter by Call Status"}
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
        </FilterMenu>
      ),
    },
    {
      field: "subStatus", width: 100, headerName: "Sub Status",
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"subStatus"}
          headerName={"Sub Status"}
          tooltipTitle={"Filter by Sub Status"}
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
        </FilterMenu>
      ),
    },
    {
      field: "nextAction", width: 100, headerName: "Next Action",
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"nextAction"}
          headerName={"Next Action"}
          tooltipTitle={"Filter Next Action"}
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
        </FilterMenu>
      ),
    },
    {
      field: "actionDate", width: 100, headerName: "Action Date",
      renderCell: (params) => {
        return params.row.actionDate.toDateString();
      },
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"actionDate"}
          headerName={"Action Date"}
          tooltipTitle={"Filter by Action Date"}
          filterReset={setDateFilter}
          resetValue={"0"}
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
                <MenuItem value={"3"}>Date Range</MenuItem>
              </Select>
            </FormControl>
          </MenuItem>
          {dateFilter === "3" && (
            <>
              <MenuItem>
                <InputControl
                  inputType={InputType.DATEINPUT}
                  variant="outlined"
                  id="initial_action_date"
                  label="Initial Date"
                  name="initialActionDate"
                  size="small"
                  defaultValue={filterValueState.actionDate ? filterValueState.actionDate.initial : null}
                  value={filterValueState?.actionDate?.initial}
                  onChange={(val: any) => handleFilterChange("actionDate", { ...filterValueState?.actionDate, "initial": val })}
                />
              </MenuItem>

              <MenuItem>

                <InputControl
                  inputType={InputType.DATEINPUT}
                  id="final_action_date"
                  label="Final Date"
                  name="finalActionDate"
                  defaultValue={filterValueState.actionDate ? filterValueState.actionDate.final : null}
                  value={filterValueState?.actionDate?.final}
                  onChange={(val: any) => handleFilterChange("actionDate", { ...filterValueState?.actionDate, "final": val })}
                />
              </MenuItem>
            </>
          )}
        </FilterMenu>
      ),
    },
    {
      field: "actionTime",
      headerName: "Action Time",
      renderCell: (params) => {
        return params.row.actionDate.toLocaleString('en-IN', options);
      },
    },
  ]

  const handleDateFilterChange = (event: SelectChangeEvent) => {
    setDateFilter(event.target.value as string);
  };

  const handleCallFilterChange = (event: SelectChangeEvent) => {
    setCallFilter(event.target.value as string);
  };


  const CallType = (props: { text: string, color: string }) => {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "7px",
            height: "7px",
            bgcolor: props.color,
            marginRight: "5px",
          }}
        ></Box>
        <Typography fontSize={14}>{props.text}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: "#f3f1f17d", minHeight: '90vh', p: 3, maxWidth: { lg: "100%", sm: "98%", xs: "98%" } }}>
      <Box sx={{ maxWidth: "92vw" }}>
        <Seperator>
          <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Box sx={{ ml: 2 }}>
              Call Explorer
            </Box>
            <Box>
              {handleColumnVisibility()}
            </Box>
          </Grid>
        </Seperator>
        <Paper elevation={1}
        >
          <StripedDataGrid
            disableColumnMenu
            rowHeight={30}
            columnHeaderHeight={30}
            rows={data ? data : []}
            columns={column1}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel: any) => setColumnVisibilityModel(newModel)}
            onRowSelectionModelChange={handleRowSelection} // Event listener for row selection
            rowSelectionModel={rowSelectionModel}
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            paginationModel={pageModel}
            onPaginationModelChange={setPageModel}
            rowCount={totalRowCount}
            checkboxSelection
            loading={loading}
            // slots={{
            //   footer: handleColumnVisibility
            // }}
            sx={{
              // height: "10em",
              mt: "1%",
              overflowY: 'auto',
              minHeight: "30px", // Set a minimum height of 30px
              height: details ? {
                xs: "32vh",
                sm: "32vh",
                '@media (min-height: 645px)': {
                  height: '50vh',
                },
              } : {
                xs: "60vh",
                sm: "60vh",
                '@media (min-height: 645px)': {
                  height: '65vh',
                },
              },
              // '& .MuiDataGrid-virtualScroller': {
              //   overflowY: 'auto',
              // },
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
              '& .MuiDataGrid-footerContainer': {
                height: '28px', // Force footer container to 30px
                minHeight: '28px', // Override any minimum height constraints
              },
              '& .MuiTablePagination-root': {
                height: '28px', // Ensure pagination component also respects 30px height
                minHeight: '28px',
                overflow: "hidden"
              },
              '& .MuiTablePagination-toolbar': {
                height: '28px', // Adjust the toolbar within the pagination
                minHeight: '28px',
              },
            }}
          />
        </Paper>
        <Grid container alignItems={"center"}>
          <Grid item md={2.5} sm={6} xs={12} sx={{ margin: "auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center", // Center vertically on small screens
                gap: "1vw",
                justifyContent: { xs: "center" }
              }}
            >
              <Tooltip
                title={rowSelectionModel?.length == 0 ? "Please select a row first" : enableAllocate ? "" : "Deselect Closed enquiries first"}
                placement="top"
              >
                <span>
                  <ContainedButton
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                    }}
                    onClick={() => setDialogOpen(true)}
                    disabled={!enableAllocate}
                  >
                    Allocate Call
                  </ContainedButton>
                </span>
              </Tooltip>
              <ContainedButton
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
                disabled={!selectedRow}
              >
                Status Update
              </ContainedButton>
            </Box>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center", // Vertically center on small screens
                justifyContent: { xs: "center" }
              }}
            >
              <IconButton
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                Auto refresh in
              </Typography>
              <TextField
                value={refreshInterval}
                onChange={handleIntervalChange}
                variant="standard"
                size="small"
                type="number"
                inputProps={{ min: 1, style: { width: '35px', textAlign: 'center' } }}
                sx={{ mx: 1, width: 'auto' }} // Fixed width for TextField
              />
              <Typography variant="body2" component="span">
                mins.
              </Typography>
            </Box>
          </Grid>
          <Grid item md={6.5} sm={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "center", md: "center", lg: "flex-end" }, // Center on small and medium screens, align right on large screens
                alignItems: "center", // Vertically center the CallTypes
                flexWrap: "nowrap", // Prevent wrapping of call types
              }}
            >
              <Grid container spacing={2} sx={{ flex: 1, justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-end' }, alignItems: "center" }}>
                <Grid item xs="auto" sx={{ marginRight: '1vw', display: 'flex', alignItems: 'center' }}>
                  <CallType text="Open-Unallocated" color="blue" />
                </Grid>
                <Grid item xs="auto" sx={{ marginRight: '1vw', display: 'flex', alignItems: 'center' }}>
                  <CallType text="Open-Allocated" color="purple" />
                </Grid>
                <Grid item xs="auto" sx={{ marginRight: '1vw', display: 'flex', alignItems: 'center' }}>
                  <CallType text="Closed-Failure" color="red" />
                </Grid>
                <Grid item xs="auto" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CallType text="Closed-Success" color="green" />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {selectedRow && details && (<Box> Call Details : {selectedRow.id} ({selectedRow.contactParty})(Org:)(Ledger:)</Box>)}
        {details && <Paper elevation={1} sx={{ border: "0.01rem solid #686D76", bgcolor: "white" }}>
          <CallDetailList selectedRow={selectedRow} refresh={refresh} />
        </Paper>}
        <Box
          sx={{
            rowGap: 1,
            columnGap: 3,
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" marginTop={2}>
            <Grid item xs={12} sm={5} md={4} >
              <ContainedButton
                variant="contained"
                size="small"
                sx={{
                  mr: "1vw",
                  ml: {
                    md: "0.3vw",
                    lg: "2vw"
                  },
                  textTransform: "none"
                }}
                onClick={() => setDetails(!details)}
              >
                {details ? "Hide Details" : "Show Details"}
              </ContainedButton>
              <ContainedButton variant="contained" size="small" sx={{ textTransform: "none" }}>
                <Link href="/cap/enquiry" style={{
                  textDecoration: "none",
                }}>
                  New Call Receipt
                </Link>
              </ContainedButton>
            </Grid>
            <Grid item xs={10} sm={1} md={1}>
              <ContainedButton
                variant="contained"
                size="small"
                sx={{
                  marginLeft: { xs: 0, sm: -1.5 }, // Aligns right from small screens (600px) and up
                  marginTop: { xs: 2, sm: 1 }, // Adds margin on small screens for spacing
                  width: { xs: '80vw', sm: 'auto' }, // Makes full width on extra small screens
                  textTransform: "none"
                }}
              >
                <Link href="/cap" style={{
                  textDecoration: "none",
                }}>
                  Quit
                </Link>

              </ContainedButton>
            </Grid>
          </Grid>
        </Box>
        {
          dialogOpen && <AddDialog title={"Allocate Executive"}
            open={dialogOpen}
            setDialogOpen={setDialogOpen}>
            <AllocateCall setDialogOpen={setDialogOpen} data={rowSelectionModel} setRefresh={setRefresh} />
          </AddDialog>
        }
      </Box>
    </Box >
  );
}