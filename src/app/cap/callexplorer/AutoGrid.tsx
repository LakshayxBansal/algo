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
  FormGroup,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  GridCallbackDetails,
  gridClasses,
  GridColDef,
  GridColumnHeaderParams,
  gridPreferencePanelStateSelector,
  GridPreferencePanelsValue,
  GridRowSelectionModel,
  GridSortModel,
  MuiEvent,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  ContainedButton,
  MinimizedDataGrid,
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
import {
  getAllCallEnquiries,
  getAllCallSupportEnquiries,
  getCallEnquiries,
  getCallSupportEnquiries,
} from "../../controllers/callExplorer.controller";
import { AddDialog } from "../../Widgets/masters/addDialog";
import AllocateCall from "./AllocateCall";
import Seperator from "@/app/Widgets/seperator";
import { InputControl, InputType } from "@/app/Widgets/input/InputControl";
import Link from "next/link";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterMenu from "./FilterMenu";
import { getSupportCategory } from "@/app/controllers/supportCategory.controller";
import { getSupportSubStatus } from "@/app/controllers/supportSubStatus.controller";
import { getSupportAction } from "@/app/controllers/supportAction.controller";
import { adjustToLocal } from "@/app/utils/utcToLocal";
import { encrypt } from "@/app/utils/encrypt.utils";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { set } from "lodash";
import dayjs from "dayjs";
export let handleRefresh: any;
import * as XLSX from "xlsx";
import { exportToExcel } from "@/app/utils/exportExcel";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// type FilterKey = "Open-Unallocated" | "Open-Allocated" | "Closed-Failure" | "Closed-Success";

export default function AutoGrid(props: any) {
  const pgSize = 10;
  const [data, setData] = React.useState(props.result.result);
  const [dateFilter, setDateFilter] = React.useState("0");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>("");
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(
    {} as any
  );
  const [filterType, setFilterType] = React.useState<string>("reset"); // Default to "reset"
  const [status, setStatus] = React.useState("1");
  const [callFilter, setCallFilter] = React.useState<string>("0");
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [pageModel, setPageModel] = React.useState({
    page: 0,
    pageSize: pgSize,
  });
  const [totalRowCount, setTotalRowCount] = React.useState(props.count); // State for row count
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = React.useState<number>(5); // Default to 5 minutes
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState(true);
  const [dlgState, setDlgState] = React.useState<DlgState>({});
  const [filterValueState, setFilterValueState] = React.useState<{
    [key: string]: any;
  }>({});
  type DlgState = { [key: string]: HTMLElement | null };
  const [enableAllocate, setEnableAllocate] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState(0);
  const [sortBy, setSortBy] = React.useState<GridSortModel>([]);
  // const [selectedStatuses, setSelectedStatuses] = React.useState<Record<FilterKey, boolean>>({
  //   "Open-Unallocated": false,
  //   "Open-Allocated": false,
  //   "Closed-Failure": false,
  //   "Closed-Success": false,
  // });
  const [selectedStatusRows, setSelectedStatusRows] =
    React.useState<GridRowSelectionModel>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = React.useState(null);
  const apiRef = useGridApiRef();

  const router = useRouter();

  const ITEM_HEIGHT = 30;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  // const handleCheckboxClick=(filterKey:FilterKey)=>{
  //   setSelectedStatuses((prevFilters) => ({
  //     ...prevFilters,
  //     [filterKey]: !prevFilters[filterKey],
  //   }));

  // }

  const tabOptions = [
    {
      name: "enquiry",
      getCategory: getEnquiryCategory,
      getSubStatus: getEnquirySubStatus,
      getAction: getEnquiryAction,
      getCallData: getCallEnquiries,
      getAllData: getAllCallEnquiries,
    },
    {
      name: "support",
      getCategory: getSupportCategory,
      getSubStatus: getSupportSubStatus,
      getAction: getSupportAction,
      getCallData: getCallSupportEnquiries,
      getAllData: getAllCallSupportEnquiries,
    },
  ];

  React.useLayoutEffect(() => {
    if (apiRef.current) {
      apiRef.current.setRowSelectionModel([]);
      apiRef.current.setRowSelectionModel([]);
    }
  }, [value]);

  const isShiftPressedRef = React.useRef(false);
  const wasShiftPressedRef = React.useRef(false);
  const handleCellClick = (params: any, event: any) => {
    if (params.field !== "statusColor") return; // Exit if the clicked field isn't "statusColor"

    event.stopPropagation();
    let deSelect = false;

    const isCntlPressed = event?.ctrlKey;
    isShiftPressedRef.current = event?.shiftKey;

    if (!wasShiftPressedRef.current && isShiftPressedRef.current) {
      wasShiftPressedRef.current = true;
    }

    let updatedSelectedRows = [...selectedStatusRows]; // Temporary storage for selected rows

    if (isShiftPressedRef.current && lastSelectedIndex !== null) {
      // Calculate range between last selected and current row

      const lastIndex = data.findIndex(
        (row: any) => row.id === lastSelectedIndex
      );
      const currentIndex = data.findIndex(
        (row: any) => row.id === params.row.id
      );

      const alreadySelected = selectedStatusRows.includes(params.row.id);
      if (alreadySelected) {
        updatedSelectedRows = updatedSelectedRows.filter(
          (id) => id !== params.row.id
        );
      } else {
        const start = Math.min(lastIndex, currentIndex);
        const end = Math.max(lastIndex, currentIndex);

        // Select all rows in the range
        const rangeIds = data.slice(start, end + 1).map((row: any) => row.id);
        updatedSelectedRows = Array.from(
          new Set([...updatedSelectedRows, ...rangeIds])
        );
      }
    } else if (
      !isShiftPressedRef.current &&
      wasShiftPressedRef.current &&
      !isCntlPressed
    ) {
      updatedSelectedRows = [params.row.id];
      wasShiftPressedRef.current = false;
    } else {
      // Toggle selection for the clicked row

      if (updatedSelectedRows.includes(params.row.id)) {
        deSelect = true;
        updatedSelectedRows = updatedSelectedRows.filter(
          (id) => id !== params.row.id
        );
      } else {
        updatedSelectedRows = [...updatedSelectedRows, params.row.id];
      }
    }

    // Apply updates after the conditional logic
    setSelectedStatusRows(updatedSelectedRows);
    deSelect ? setLastSelectedIndex(null) : setLastSelectedIndex(params.row.id);

    // find if any of selected row has closed status
    const isAllocatable =
      updatedSelectedRows.length > 0 &&
      !updatedSelectedRows.some((rowId: any) => {
        const selectedData = data.find((row: any) => row.id === rowId);
        return selectedData?.callStatus === "Closed";
      });

    // Set enableAllocate state
    setEnableAllocate(isAllocatable);

    if (deSelect && selectedRow.id === params.row.id) {
      setSelectedRow(null);
      setRowSelectionModel([]);
    } else {
      const selectedRowData = data.find((row: any) => row.id === params.row.id);
      setSelectedRow(selectedRowData);
      setRowSelectionModel([params.row.id]);
    }
  };

  const toggleColBtn = () => {
    const preferencePanelState = gridPreferencePanelStateSelector(
      apiRef.current.state
    );
    if (preferencePanelState.open) {
      apiRef.current.hidePreferences();
    } else {
      apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
    }
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const value = parseInt(event.target.value, 10);
    const value = Number(event.target.value);
    setRefreshInterval(value !== undefined ? value : 5); // Set a minimum of 5 minute
  };
  const handleStatusClick = async () => {
    const encyptedId = await encrypt(selectedRow?.id);
    const path = `/cap/${tabOptions[value].name}?id=${encyptedId}&status=true`;
    router.push(path);
  };

  const handleFilterChange = (field: string, value: any) => {
    setFilterValueState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    async function getEnquiries() {
      const result = await tabOptions[value].getCallData(
        filterValueState,
        filterType,
        selectedStatus,
        callFilter,
        dateFilter,
        pageModel.page + 1,
        pageModel.pageSize,
        sortBy
      );

      setData(result?.result);
      setTotalRowCount(Number(result?.count));
    }
    getEnquiries();
    setLoading(false);
  }, [
    filterValueState,
    filterType,
    selectedStatus,
    callFilter,
    dateFilter,
    dialogOpen,
    refresh,
    value,
    pageModel.page,
    pageModel.pageSize,
    sortBy,
  ]);

  handleRefresh = () => {
    // setPageModel((prev: any) => ({
    //   ...prev,
    //   page: 0,
    // }));
    // setRowSelectionModel([]);
    // setSelectedRow(null);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleRefresh();
    }, refreshInterval * 60000);

    return () => clearInterval(timer);
  }, [refreshInterval]);

  const handleColumnVisibility = () => {
    return (
      <>
        <Tooltip title="Manage Columns" placement="top-end" arrow>
          <IconButton
            aria-controls="tune-menu"
            aria-haspopup="true"
            ref={(ref) => setAnchorEl(ref)}
            onClick={toggleColBtn}
          >
            <TuneIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    // setSelectedRow

    // Enable Allocate Call button if there are selected rows and no row has 'Closed' callStatus
    // if (selectionModel.length > 0) {
    //   let isAllocatable = true;

    //   for (let i = 0; i < selectionModel.length; ++i) {
    //     const selectedData = data.find((row: any) => row.id === selectionModel[i]);

    //     if (selectedData && selectedData.callStatus === "Closed") {
    //       isAllocatable = false;
    //       break; // If any row has 'Closed' status, disable the button
    //     }
    //   }

    //   // Set enableAllocate state based on the conditions
    //   setEnableAllocate(isAllocatable);
    // } else {
    // If no rows are selected, disable the button

    // }

    // if (selectionModel?.length > 1) {
    //   setSelectedRow(null);
    // }
    // else {
    if (selectionModel.length > 0) {
      const selectedId = selectionModel[0] ?? selectedStatusRows[0]; // Get the ID of the selected row

      const selectedData = data?.find((row: any) => row.id === selectedId); // Find the corresponding row data
      const isAllocatable = selectedData?.callStatus === "Open";
      setEnableAllocate(isAllocatable);
      setRowSelectionModel(selectionModel);
      setSelectedRow(selectedData); // Set the selected row data
    }
    // }
  };

  /**
   * Handles the custom sorting of grid data by updating the sort model state.
   *
   * @param sortModel - The sorting model that contains the field and sort direction.
   */
  const handleCustomSort = (sortModel: GridSortModel) => {
    setSortBy(sortModel);
  };

  const handleSelectedStatus = (e: SelectChangeEvent) => {
    setSelectedStatus(e.target.value);
    setCallFilter("0");
  };

  const handleHeaderClick = (params: any, event: any, details: any) => {
    const sortIconClicked = event.target.closest(".MuiDataGrid-sortIcon");

    if (!sortIconClicked) {
      event.defaultMuiPrevented = true;
      console.log("i am here");
    }
  };

  const handleSelectedSubStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    setFilterValueState((prevState) => ({
      ...prevState,
      ["subStatus"]: null, // Set the selected value for the specific field
    }));
  };

  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true, // Use 12-hour format with AM/PM
    hour: "2-digit",
    minute: "2-digit",
  };

  //   let color;
  //   if (props.row.callStatus === "Open") {
  //     if (props.row.executive === null) { color = "blue" }
  //     else { color = "purple" }
  //   }
  //   else {
  //     if (props.row.subStatus === "Success") { color = "green" }
  //     else { color = "red" }
  //   }
  //   return (
  //     <div>
  //       <Box
  //         sx={{
  //           width: "7px",
  //           height: "7px",
  //           bgcolor: color,
  //           margin: "10px",
  //         }}
  //       />
  //     </div>
  //   );
  // };
  // const CustomColor = (props: { row: any; onChange: (id: any) => void; selected: boolean }) => {
  //   let color;
  //   if (props.row.callStatus === "Open") {
  //     color = props.row.executive === null ? "blue" : "purple";
  //   } else {
  //     color = props.row.subStatus === "Success" ? "green" : "red";
  //   }

  //   return (
  //     <Checkbox
  //       checked={props.selected}
  //       onChange={() => props.onChange(props.row.id)}
  //       sx={{
  //         color: color,
  //         "&.Mui-checked": {
  //           color: color,
  //         },
  //       }}
  //     />
  //   );
  // };

  /**
   * Handles keyboard navigation within a data grid.
   *
   * @param {object} params - The parameters containing information about the current cell.
   * @param {object} event - The keyboard event triggered by the user.
   *
   * Navigates to the next or previous row based on the arrow key pressed. Prevents the default
   * behavior of arrow keys. Selects the next row on "ArrowDown" and the previous row on "ArrowUp".
   * Prevents default action on "Enter" and "Space" keys. Updates the row selection model and sets
   * the selected row if navigation occurs.
   */
  const handleCellKeyDown = (params: any, event: any, details: any) => {
    const rowId = params.row.id;
    const currentIndex = data.findIndex((row: any) => row.id === rowId);

    let nextIndex = currentIndex;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex =
        currentIndex + 1 < data.length ? currentIndex + 1 : currentIndex;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      const nextRow = data[nextIndex];
      if (nextRow) {
        setRowSelectionModel([nextRow.id]);
        setSelectedRow(nextRow);
      }
    }
  };
  const handleExport = async () => {
    try {
      // Get visible columns from DataGrid API
      const visibleColumns = apiRef.current
        .getVisibleColumns()
        .filter((col) => !["time", "actionTime"].includes(col.field));

      // Extract fields and headers for visible columns
      const fields = visibleColumns.slice(2).map((col) => col.field);
      const headers = visibleColumns.slice(2).map((col) => col.headerName);

      const allData = await tabOptions[value].getAllData(
        filterValueState,
        filterType,
        selectedStatus,
        callFilter,
        dateFilter
      );

      // Call the `exportToExcel` function
      await exportToExcel(fields, headers, { result: allData?.result });
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  const checkboxSelectionWithColor = (params: any) => {
    let color;
    if (params.row.callStatus === "Open") {
      color = params.row.executive === null ? "blue" : "purple";
    } else {
      color = params.row.subStatus === "Success" ? "green" : "red";
    }
    return {
      color: color,
      "&.Mui-checked": {
        color: color, // Change the checked color
      },
    };
  };
  const column1: GridColDef[] = [
    {
      field: "statusColor",
      headerName: "Status",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        let color;
        if (params.row.callStatus === "Open") {
          color = params.row.executive === null ? "blue" : "purple";
        } else {
          color = params.row.subStatus === "Success" ? "green" : "red";
        }

        return (
          <Checkbox
            checked={selectedStatusRows.includes(params.row.id)}
            size="small" // Smaller checkbox size
            sx={{
              color: color,
              "&.Mui-checked": {
                color: color,
              },
              transform: "scale(0.75)",
              padding: 0, // Remove padding to make it fit better
              // // width: 20,   // Adjust width
              // // height: 20,  // Adjust height
              margin: 0, // Remove margin if any
              display: "flex", // Ensure proper alignment
              alignItems: "center", // Center the checkbox within the row
              justifyContent: "center", // Center the checkbox in the cell
            }}
          />
        );
      },
    },

    {
      field: "description",
      headerName: "Description",
      hideable: false,
      width: 130,
      sortable: false,
    },

    {
      field: "contactParty",
      headerName: "Contact",
      hideable: false,
      width: 130,
    },
    {
      field: "date",
      width: 130,
      headerName: "Date",
      hideable: false,
      renderCell: (params) => {
        return adjustToLocal(params.row.date).toDate().toString().slice(0, 15);
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
              defaultValue={
                filterValueState.date ? filterValueState.date.initial : null
              }
              value={filterValueState?.date?.initial}
              onChange={(val: any) =>
                handleFilterChange("date", {
                  ...filterValueState?.date,
                  initial: val,
                })
              }
            />
          </MenuItem>
          <MenuItem>
            <InputControl
              inputType={InputType.DATEINPUT}
              id="final"
              label="Final Date"
              name="final"
              defaultValue={
                filterValueState.date
                  ? filterValueState.date.final
                  : dayjs(new Date())
              }
              value={filterValueState?.date?.final}
              onChange={(val: any) =>
                handleFilterChange("date", {
                  ...filterValueState?.date,
                  final: val,
                })
              }
            />
          </MenuItem>
        </FilterMenu>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return adjustToLocal(params.row.date).format("hh:mm A");
      },
    },
    {
      field: "callCategory",
      width: 120,
      headerName: "Call Category",
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
              onChange={(e, val, s) => handleFilterChange("callCategory", val)}
              fetchDataFn={tabOptions[value].getCategory}
              defaultValue={
                {
                  id: filterValueState?.callCategory?.id,
                  name: filterValueState?.callCategory?.name,
                } as optionsDataT
              }
              diaglogVal={{
                id: filterValueState?.callCategory?.id,
                name: filterValueState?.callCategory?.name,
                detail: undefined,
              }}
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
          </MenuItem>
        </FilterMenu>
      ),
    },
    {
      field: "area",
      width: 100,
      headerName: "Area",
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
              onChange={(e, val, s) => handleFilterChange("area", val)}
              defaultValue={
                {
                  id: filterValueState?.area?.id,
                  name: filterValueState?.area?.name,
                } as optionsDataT
              }
              diaglogVal={{
                id: filterValueState?.area?.id,
                name: filterValueState?.area?.name,
                detail: undefined,
              }}
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
          </MenuItem>
        </FilterMenu>
      ),
    },
    {
      field: "executive",
      width: 100,
      headerName: "Allocated To",
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
                onChange={(e, val, s) => handleFilterChange("executive", val)}
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
                  detail: undefined,
                }}
                setDialogVal={function (
                  value: React.SetStateAction<optionsDataT>
                ): void {}}
                fnSetModifyMode={function (id: string): void {}}
              />
            </MenuItem>
          )}
        </FilterMenu>
      ),
    },
    {
      field: "callStatus",
      headerName: "Call Status",
      width: 100,
      renderCell: (params) => <span>{params.row.callStatus}</span>,
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
                <FormControlLabel
                  value="Open"
                  control={<Radio />}
                  label="Open"
                />
                <FormControlLabel
                  value="Closed"
                  control={<Radio />}
                  label="Closed"
                />
                <FormControlLabel
                  value=""
                  control={<Radio />}
                  label="Both Calls"
                />
              </RadioGroup>
            </FormControl>
          </MenuItem>
          <MenuItem>
            {selectedStatus !== "" && (
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
                  {selectedStatus === "Open" && (
                    <MenuItem value={"1"}>Allocated</MenuItem>
                  )}
                  {selectedStatus === "Open" && (
                    <MenuItem value={"2"}>Unallocated</MenuItem>
                  )}
                  {selectedStatus === "Closed" && (
                    <MenuItem value={"3"}>Success</MenuItem>
                  )}
                  {selectedStatus === "Closed" && (
                    <MenuItem value={"4"}>Failure</MenuItem>
                  )}

                  <MenuItem value={"0"}>Both Calls</MenuItem>
                </Select>
              </FormControl>
            )}
          </MenuItem>
        </FilterMenu>
      ),
    },
    {
      field: "subStatus",
      width: 100,
      headerName: "Sub Status",
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
            <RadioGroup value={status} onChange={handleSelectedSubStatus}>
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
              onChange={(e, val, s) => handleFilterChange("subStatus", val)}
              // fetchDataFn={getSubStatusforStatus}
              fetchDataFn={(roleStr: string) =>
                tabOptions[value].getSubStatus(roleStr, status)
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
                detail: undefined,
              }}
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
          </MenuItem>
        </FilterMenu>
      ),
    },
    {
      field: "nextAction",
      width: 100,
      headerName: "Next Action",
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
              onChange={(e, val, s) => handleFilterChange("nextAction", val)}
              fetchDataFn={tabOptions[value].getAction}
              defaultValue={
                {
                  id: filterValueState?.nextAction?.id,
                  name: filterValueState?.nextAction?.name,
                } as optionsDataT
              }
              diaglogVal={{
                id: filterValueState?.nextAction?.id,
                name: filterValueState?.nextAction?.name,
                detail: undefined,
              }}
              setDialogVal={function (
                value: React.SetStateAction<optionsDataT>
              ): void {}}
              fnSetModifyMode={function (id: string): void {}}
            />
          </MenuItem>
        </FilterMenu>
      ),
    },
    {
      field: "actionDate",
      width: 100,
      headerName: " Next Action Date",
      renderCell: (params) => {
        return params.row.actionDate
          ? adjustToLocal(params.row.actionDate)
              .toDate()
              .toString()
              .slice(0, 15)
          : "";
      },
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"actionDate"}
          headerName={"Next Action Date"}
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
                  defaultValue={
                    filterValueState.actionDate
                      ? filterValueState.actionDate?.initial
                      : null
                  }
                  value={filterValueState?.actionDate?.initial}
                  onChange={(val: any) =>
                    handleFilterChange("actionDate", {
                      ...filterValueState?.actionDate,
                      initial: val,
                    })
                  }
                />
              </MenuItem>

              <MenuItem>
                <InputControl
                  inputType={InputType.DATEINPUT}
                  id="final_action_date"
                  label="Final Date"
                  name="finalActionDate"
                  defaultValue={
                    filterValueState.actionDate
                      ? filterValueState.actionDate?.final
                      : dayjs(new Date())
                  }
                  value={filterValueState?.actionDate?.final}
                  onChange={(val: any) =>
                    handleFilterChange("actionDate", {
                      ...filterValueState?.actionDate,
                      final: val,
                    })
                  }
                />
              </MenuItem>
            </>
          )}
        </FilterMenu>
      ),
    },
    {
      field: "actionTime",
      headerName: "Next Action Time",
      sortable: false,
      renderCell: (params) => {
        return params.row.actionDate
          ? adjustToLocal(params.row.actionDate).format("hh:mm A")
          : "";
      },
    },
    {
      field: "modified_on",
      width: 130,
      headerName: "Last Updated",
      hideable: false,
      renderCell: (params) => {
        return params.row.modified_on
          ? adjustToLocal(params.row.modified_on)
              .toDate()
              .toString()
              .slice(0, 15)
          : "";
      },
      renderHeader: () => (
        <FilterMenu
          filterValueState={filterValueState}
          setFilterValueState={setFilterValueState}
          setDlgState={setDlgState}
          field={"modified_on"}
          headerName={"Last Updated"}
          tooltipTitle={"Filter by Last Updated Date"}
        >
          <MenuItem>
            <InputControl
              inputType={InputType.DATEINPUT}
              id="initial"
              label="Initial Date"
              name="initial"
              defaultValue={
                filterValueState.modified_on
                  ? filterValueState.modified_on.initial
                  : null
              }
              value={filterValueState?.modified_on?.initial}
              onChange={(val: any) =>
                handleFilterChange("modified_on", {
                  ...filterValueState?.modified_on,
                  initial: val,
                })
              }
            />
          </MenuItem>
          <MenuItem>
            <InputControl
              inputType={InputType.DATEINPUT}
              id="final"
              label="Final Date"
              name="final"
              defaultValue={
                filterValueState.modified_on
                  ? filterValueState.modified_on.final
                  : dayjs(new Date())
              }
              value={filterValueState?.modified_on?.final}
              onChange={(val: any) =>
                handleFilterChange("modified_on", {
                  ...filterValueState?.modified_on,
                  final: val,
                })
              }
            />
          </MenuItem>
        </FilterMenu>
      ),
    },
  ];

  const handleDateFilterChange = (event: SelectChangeEvent) => {
    setDateFilter(event.target.value as string);
  };

  const handleCallFilterChange = (event: SelectChangeEvent) => {
    setCallFilter(event.target.value as string);
  };

  //options of options in checkbox
  const checkboxOptions = ["Enquiry", "Support"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSelectedStatusRows([]);
  };

  const CallType = (props: { text: string; color: string }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "#f3f1f17d",
        minHeight: "85vh",
        p: 3,
        maxWidth: { lg: "100%", sm: "98%", xs: "98%", paddingTop: 2 },
      }}
    >
      <Box sx={{ maxWidth: "92vw" }}>
        <Seperator>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs for different content"
                  variant="fullWidth"
                  sx={{
                    position: "relative",
                    "& .MuiTab-root": {
                      marginRight: "2px",
                      padding: "0px 16px",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      border: "1px solid #d3d3d3",
                      backgroundColor: "#f1f1f1",
                      boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.1)",
                      transition:
                        "box-shadow 0.3s, transform 0.3s, background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(-2px)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#ffffff", // White background for the selected tab
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)", // Stronger shadow for active tab
                        borderBottom: "3px solid #1976d2", // Chrome-like selected tab indicator
                        fontWeight: "bold", // Make selected tab text bold
                      },
                      "&:not(.Mui-selected)": {
                        opacity: 0.6,
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab label="Enquiry" autoFocus />
                  <Tab label="Support" />
                </Tabs>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "flex-end",
                }, // Center on small and medium screens, align right on large screens
                alignItems: "center", // Vertically center the CallTypes
                flexWrap: "nowrap", // Prevent wrapping of call types
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  flex: 1,
                  justifyContent: {
                    xs: "center",
                    sm: "center",
                    md: "center",
                    lg: "flex-end",
                  },
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  xs="auto"
                  sx={{
                    marginRight: "1vw",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CallType text="Open-Unallocated" color="blue" />
                </Grid>
                <Grid
                  item
                  xs="auto"
                  sx={{
                    marginRight: "1vw",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CallType text="Open-Allocated" color="purple" />
                </Grid>
                <Grid
                  item
                  xs="auto"
                  sx={{
                    marginRight: "1vw",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CallType text="Closed-Failure" color="red" />
                </Grid>
                <Grid
                  item
                  xs="auto"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CallType text="Closed-Success" color="green" />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Export to Excel" arrow>
                <IconButton onClick={handleExport}>
                  <CloudDownloadIcon />
                </IconButton>
              </Tooltip>

              <Box>{handleColumnVisibility()}</Box>
            </Box>
          </Grid>
        </Seperator>
        <Paper elevation={1} sx={{ mb: 1 }}>
          <MinimizedDataGrid
            disableColumnMenu
            rowHeight={25} // Compact row height
            columnHeaderHeight={30} // Header height remains compact
            keepNonExistentRowsSelected
            disableMultipleRowSelection={true}
            onColumnHeaderClick={handleHeaderClick}
            rows={data ? data : []}
            columns={column1}
            sortingMode="server" // Disable default sorting
            onSortModelChange={(sortModel) => handleCustomSort(sortModel)}
            onCellKeyDown={handleCellKeyDown}
            columnVisibilityModel={columnVisibilityModel}
            hideFooterSelectedRowCount
            onColumnVisibilityModelChange={(newModel: any) =>
              setColumnVisibilityModel(newModel)
            }
            onCellClick={handleCellClick}
            onRowSelectionModelChange={handleRowSelection}
            rowSelectionModel={rowSelectionModel}
            paginationMode="server"
            pageSizeOptions={[10, 20, 50]} // Updated to allow more rows per page
            paginationModel={pageModel}
            onPaginationModelChange={setPageModel}
            rowCount={totalRowCount}
            checkboxSelection
            apiRef={apiRef}
            loading={loading}
            slotProps={{
              columnsPanel: {
                sx: {
                  ".MuiDataGrid-columnsManagementRow:first-child": {
                    display: "none",
                  },
                  ".MuiDataGrid-columnsManagementHeader": {
                    display: "none",
                  },
                },
              },
              panel: {
                anchorEl: () => {
                  const preferencePanelState = gridPreferencePanelStateSelector(
                    apiRef.current.state
                  );
                  if (
                    preferencePanelState.openedPanelValue ===
                      GridPreferencePanelsValue.columns &&
                    anchorEl
                  ) {
                    return anchorEl;
                  }

                  const columnHeadersElement =
                    apiRef.current.rootElementRef?.current?.querySelector(
                      `.${gridClasses.columnHeaders}`
                    )!;
                  return columnHeadersElement;
                },
              },
            }}
            sx={{
              mt: "0",
              overflowY: "auto",
              height: {
                xs: "50vh",
                sm: "50vh",
                "@media (min-height: 800px)": {
                  height: "60vh", // Maximum height for larger screens
                },
              },
              "& .MuiDataGrid-root": {
                fontSize: "12px", // Keep row font size compact
              },
              "& .MuiDataGrid-columnHeaders": {
                fontSize: "inherit", // Keep header font size unchanged
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row": {
                fontSize: "12px", // Compact font for rows
              },

              "& .MuiDataGrid-columnHeaderCheckbox, & .MuiDataGrid-cellCheckbox":
                {
                  display: "none",
                },
              "& .MuiTablePagination-root": {
                fontSize: "0.75rem", // Compact font size for footer
              },
              "& .MuiTablePagination-selectLabel": {
                fontSize: "0.75rem", // Smaller text for "Rows per page"
              },
              "& .MuiTablePagination-actions": {
                fontSize: "0.75rem", // Set smaller font size for pagination actions
              },
              "& .MuiTablePagination-displayedRows": {
                fontSize: "0.75rem", // Set smaller font size for displayed row count
              },
              "& .MuiDataGrid-selectedRowCount": {
                fontSize: "0.75rem", // Set smaller font size for selected row count
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none", // Removes the default focus outline
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none", // Removes the outline when the cell has child focus
              },
            }}
          />
        </Paper>

        {selectedRow && details && (
          <Box sx={{ mt: 1, fontSize: "11px" }}>
            {" "}
            Call Details : ({selectedRow.contactParty})(Org:{" "}
            {selectedRow?.organisation})
          </Box>
        )}
        {details && (
          <Paper
            elevation={1}
            sx={{ border: "0.01rem solid #686D76", bgcolor: "white", mt: 0 }}
            tabIndex={-1}
          >
            <CallDetailList
              selectedRow={selectedRow}
              refresh={refresh}
              callType={value}
            />
          </Paper>
        )}
        <Box>
          <Grid
            container
            alignItems="center"
            sx={{
              justifyContent: {
                xs: "center",
                sm: "space-between",
                md: "space-between",
              },
            }}
            marginTop={2}
          >
            <Grid item xs={8.5} sm={5} md={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <ContainedButton
                  variant="contained"
                  size="small"
                  sx={{
                    mr: "1vw",

                    textTransform: "none",
                  }}
                  onClick={() => setDetails(!details)}
                >
                  {details ? "Hide Details" : "Show Details"}
                </ContainedButton>
                <ContainedButton
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  <Link
                    href={`/cap/${tabOptions[value].name}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    New Call Receipt
                  </Link>
                </ContainedButton>
              </Box>
            </Grid>
            <Grid item xs={8.5} sm={5} md={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Center vertically on small screens
                  gap: "1vw",
                  justifyContent: { xs: "center" },
                }}
              >
                <Tooltip
                  title={
                    rowSelectionModel?.length == 0
                      ? "Please select a row first"
                      : enableAllocate
                      ? ""
                      : "Deselect Closed enquiries first"
                  }
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
                  disabled={!selectedRow || selectedStatusRows?.length > 1 || selectedRow.callStatus === "Closed"}
                  onClick={handleStatusClick}
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
                  justifyContent: { xs: "center" },
                }}
              >
                <IconButton aria-label="refresh" onClick={handleRefresh}>
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
                  inputProps={{
                    min: 1,
                    style: { width: "35px", textAlign: "center" },
                  }}
                  sx={{ mx: 1, width: "auto" }} // Fixed width for TextField
                />
                <Typography variant="body2" component="span">
                  mins.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={10} sm={1} md={3}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <ContainedButton
                  variant="contained"
                  size="small"
                  sx={{
                    marginLeft: { xs: 0, sm: -1.5 }, // Aligns right from small screens (600px) and up
                    marginTop: { xs: 2, sm: 1 }, // Adds margin on small screens for spacing
                    width: { xs: "100%", sm: "auto" }, // Makes full width on extra small screens
                    textTransform: "none",
                  }}
                >
                  <Link
                    href={`/cap`}
                    tabIndex={-1}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Quit
                  </Link>
                </ContainedButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {dialogOpen && (
          <AddDialog
            title={"Allocate Executive"}
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            <AllocateCall
              setDialogOpen={setDialogOpen}
              data={
                selectedStatusRows.length > 1
                  ? selectedStatusRows
                  : rowSelectionModel
              }
              setRefresh={setRefresh}
              formName={tabOptions[value].name}
            />
          </AddDialog>
        )}
      </Box>
    </Box>
  );
}
