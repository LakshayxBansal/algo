"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GridColDef,
  GridFilterModel,
  gridPreferencePanelStateSelector,
  GridPreferencePanelsValue,
  useGridApiRef,
  gridClasses,
  GridColumnVisibilityModel,
  DEFAULT_GRID_AUTOSIZE_OPTIONS,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  debounce,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  Tooltip,
  TextField,
  useStepContext,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddDialog } from "./addDialog";
import {
  entitiyCompT,
  formMetaDataPropT,
  loggedInUserDataT,
  regionalSettingSchemaT,
  rightSchemaT,
} from "@/app/models/models";
import { StripedDataGrid } from "@/app/utils/styles/styledComponents";
import UploadFileForm from "./UploadFileForm";
import Seperator from "../seperator";
import DeleteComponent from "./component/DeleteComponent";
import IconComponent from "./component/IconComponent";
import { useRouter } from "next/navigation";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import {
  getUserPreference,
  insertUserPreference,
  updateUserPreference,
} from "@/app/controllers/callExplorer.controller";
import { getColumns } from "@/app/controllers/masters.controller";
import { flushSync } from "react-dom";
import { object } from "zod";

const pgSize = 10;

enum dialogMode {
  Add,
  Modify,
  Delete,
  FileUpload,
}

interface VisibilityModel {
  [key: string]: boolean;
}
export default function EntityList(props: entitiyCompT) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [allColumns, setAllColumns] = useState([] as any);
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({ pageSize: pgSize, page: 0 });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [modData, setModData] = useState({});
  const [dlgMode, setDlgMode] = useState(dialogMode.Add);
  const [search, setSearch] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ids, setIds] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({});
  const [metaData, setMetaData] = useState<formMetaDataPropT>({
    fields: [],
    rights: {} as rightSchemaT,
    regionalSettingsConfigData: {} as regionalSettingSchemaT,
    loggedInUserData: {} as loggedInUserDataT,
  });

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const [selectionModel, setSelectionModel] = useState([]);




  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const anchorRef = useRef<HTMLDivElement>(null);
  const apiRef = useGridApiRef();
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  let searchText;

  //for navbar search
  const searchParams = useSearchParams();
  const searchData: string | null = searchParams.get("searchText");
  //for navbar search


  let timeOut: string | number | NodeJS.Timeout | undefined;


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
        // setRowSelectionModel([nextRow.id]);
        // setSelectedRow(nextRow);
      }
    }
  };





  const optionsColumn: GridColDef[] = [
    {
      field: "Icon menu",
      headerName: "",
      minWidth: 50,
      hideable: false,
      sortable: false,
      editable: false,
      renderCell: (params) => {
        return (
          <IconComponent
            id={params.row.id}
            fnDeleteDataByID={props.fnDeleteDataByID}
            fnFetchDataByID={props.fnFetchDataByID}
            setDlgMode={setDlgMode}
            setDialogOpen={setDialogOpen}
            setModData={setModData}
            setMetaData={setMetaData}
            setIds={setIds}
            modify={dialogMode.Modify}
            delete={dialogMode.Delete}
            link={props.link}
          />
        );
      },
    },
  ];

  let allDfltCols: GridColDef[];
  allDfltCols = optionsColumn.concat(props.customCols);
  const dfltColFields: string[] = allDfltCols.map((col) => col.field);

  const fetchData = debounce(async (searchText) => {
    const rows: any = await props.fetchDataFn(
      PageModel.page,
      searchText as string,
      pgSize as number
    );
    if (rows.data) {
      setData(rows.data);
      setNRows(rows.count as number);
    }
    // if (props.fnFetchColumns) {
    //   const columnsData = await props.fnFetchColumns();
    //   if (columnsData) {
    //     const dbColumns = columnsData.map((col: any) => ({
    //       field: col.column_name,
    //       headerName: col.column_label,
    //     }));
    //     // filter on columns not to showinitially
    //     const filteredColumns = dbColumns.filter(
    //       (col: any) => !dfltColFields.includes(col.field)
    //     );
    //     //columns not to showinitially
    //     const allColumns = allDfltCols.concat(filteredColumns);
    //     const visibleColumns = allColumns.reduce((model: any, col: any) => {
    //       model[col.field] = dfltColFields.includes(col.field);
    //       return model;
    //     }, {});
    //     setColumnVisibilityModel(visibleColumns);
    //     setAllColumns(allColumns);
    //     // setColumnsChanged(true);
    //     // we dont need the state as use effect renders two time in the first iteration of useeffect it will set the visibility model
    //   }
    // }
    //  else {
    //   setAllColumns(allDfltCols);
    // }
  }, 100);

  useEffect(() => {
    if (!dialogOpen) {
      if (searchData) {
        fetchData(searchData);
      } else {
        fetchData(search);
      }
    };

    const rows = document.querySelectorAll('.MuiDataGrid-row--borderBottom');
    rows.forEach((row) => {
      // Type-cast to HTMLElement to access the style property
      (row as HTMLElement).style.backgroundColor = 'grey'; // Change row background color
    });

    // Select the header row with the class "MuiDataGrid-columnHeaderRow"
    const headerRow = document.querySelector('.MuiDataGrid-columnHeaderRow');
    if (headerRow) {
      // Type-cast to HTMLElement to access the style property
      (headerRow as HTMLElement).style.backgroundColor = 'blue'; // Change header row background color
    }

    return () => {
      clearInterval(timeOut);
    };
  }, [
    PageModel,
    search,
    searchData,
    props,
    dialogOpen
  ]);
  const fetchAllColumns = async (objectTypeId?: number) => {
    // Only fetch if objectTypeId exists
    const dbColumns = objectTypeId ? await getColumns(objectTypeId) : [];

    // Create columns based on DB data or defaults
    const columnList = dbColumns?.length > 0
      ? optionsColumn.concat(
        dbColumns.map((col: any) => ({
          field: col.column_name,
          headerName: col.column_label,
          width: 100,
        }))
      )
      : allDfltCols.map(col => ({ ...col, width: 100 }));

    return columnList;
  };


  const processDefaultSettings = (
    columns: any[]
  ) => {
    const defaultPreferences: Record<string, number> = {};
    const visibilityModel: VisibilityModel = {};

    for (const col of columns) {
      // Set default preferences
      defaultPreferences[col.field] = col.width ?? 100;
      // Set default visibility
      visibilityModel[col.field] = dfltColFields.includes(col.field);
    }

    return { defaultPreferences, visibilityModel };
  };

  const processColumnsWithPreferences = (
    columns: any[],
    preferences: Record<string, number>
  ) => {
    const updatedColumns = [];
    const visibilityModel: VisibilityModel = {};

    for (const col of columns) {
      // Update column widths
      updatedColumns.push({
        ...col,
        width: preferences[col.field] ?? 100,
      });

      visibilityModel[col.field] = preferences[col.field] !== undefined;
    }

    return { updatedColumns, visibilityModel };
  };


  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchAndSetPreferences = async () => {
      try {
        if (!props?.objectTypeId) {
          const columns = await fetchAllColumns();
          if (isMounted) setAllColumns(columns);
          return;
        }

        const [userPreferenceData, allColumns] = await Promise.all([
          getUserPreference(props.objectTypeId),
          fetchAllColumns(props.objectTypeId),
        ]);

        const userPreferences: Record<string, number> = userPreferenceData[0]?.meta_data
          ? JSON.parse(userPreferenceData[0].meta_data)
          : {};



        if (Object.keys(userPreferences).length > 0) {
          const { updatedColumns, visibilityModel } = processColumnsWithPreferences(
            allColumns,
            userPreferences
          );
          if (isMounted) {

            setColumnVisibilityModel(visibilityModel);
            setAllColumns(updatedColumns);
            setColumnWidths(userPreferences);
          }
        } else {
          const { defaultPreferences, visibilityModel } = processDefaultSettings(allColumns);

          if (isMounted) {
            setColumnWidths(defaultPreferences);
            setAllColumns(allColumns);
            setColumnVisibilityModel(visibilityModel);
          }

          await insertUserPreference(defaultPreferences, props.objectTypeId);
        }
      } catch (error) {
        console.error("Error fetching or setting column preferences:", error);
      }
    };

    fetchAndSetPreferences();
    console.log("my useeffect run ");

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Keep dependency array empty


  const handleColumnVisibilityModelChange = (
    model: GridColumnVisibilityModel
  ) => {
    console.log("model", model);
    const updatedColumnWidths = { ...columnWidths };
    if (Object.keys(model).length === 1 && model["Icon menu"] === true) {
      allColumns.forEach((col: any) => {
        updatedColumnWidths[col.field] = 100;
      });
    } else {
      Object.keys(model).forEach((column) => {
        if (model[column]) {
          // Add column with default width if not already present
          if (!(column in updatedColumnWidths)) {
            updatedColumnWidths[column] = 100; // Default width
          }
        } else {
          // Remove column if it is not visible
          delete updatedColumnWidths[column];
        }
      });
    }

    // Update user preferences in the database
    updateUserPreference(updatedColumnWidths, props.objectTypeId || 0);

    // Update the local state
    setColumnWidths(updatedColumnWidths);
    setColumnVisibilityModel(model);
  };

  const handleColumnResize = async (params: any) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a timeout
    debounceTimeout.current = setTimeout(() => {
      let updatedWidths = columnWidths;
      setColumnWidths((prev) => {
        updatedWidths = { ...prev, [params.colDef.field]: params.width };
        return updatedWidths;
      });
      updateUserPreference(updatedWidths, props.objectTypeId || 0);
    }, 600);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddBtn = async () => {
    if (props?.link) {
      router.push(props.link);
    } else {
      if (props.fnFetchDataByID) {
        const data = await props.fnFetchDataByID(0);
        if (data[0]?.length > 0) {
          setMetaData({
            fields: data[0][0] || [],
            rights: data[0][1] || {},
            regionalSettingsConfigData: data[0][2] || [],
            loggedInUserData: data[0][3] || {},
          });
        }
      }
      setDialogOpen(true);
      setDlgMode(dialogMode.Add);
    }
  };

  const handleDropDownBtn = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const uploadButtonClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const hideUploadBtn = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setOpen(false);
  };

  return (
    <Box>
      <Box style={{ margin: "0 20px" }}>
        {dialogOpen && (
          <AddDialog
            title={`${dlgMode === dialogMode.FileUpload
                ? "Upload File"
                : dlgMode === dialogMode.Add
                  ? `Add ${props.title}`
                  : dlgMode === dialogMode.Delete
                    ? `Delete ${props.title}`
                    : `Update ${props.title}`
              }`}
            open={dialogOpen}
            setDialogOpen={setDialogOpen}
          >
            {props.fileUploadFeatureReqd &&
              dlgMode === dialogMode.FileUpload ? (
              <UploadFileForm
                setDialogOpen={setDialogOpen}
                fnFileUpad={props.fnFileUpad}
                sampleFileName={props.sampleFileName}
              />
            ) : props.renderForm && dlgMode === dialogMode.Add ? (
              metaData.fields.length > 0 ? (
                props.renderForm(setDialogOpen, (arg) => { }, metaData)
              ) : (
                props.renderForm(setDialogOpen, (arg) => { })
              )
            ) : props.renderForm && dlgMode === dialogMode.Modify ? (
              metaData.fields.length > 0 ? (
                props.renderForm(setDialogOpen, (arg) => { }, metaData, modData)
              ) : (
                props.renderForm(setDialogOpen, (arg) => { }, modData)
              )
            ) : dlgMode === dialogMode.Delete ? (
              <DeleteComponent
                fnDeleteDataByID={props.fnDeleteDataByID}
                open={dialogOpen}
                setDialogOpen={setDialogOpen}
                modId={ids}
              />
            ) : null}
          </AddDialog>
        )}
        {/* <SecondNavbar title={props.title}/> */}
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={12} sm={8} md={8}>
              <Box sx={{ width: { xs: "92%", md: "50%" } }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearch}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    style: {
                      backgroundColor: "#f5f5f5",
                      // marginLeft: "1.1em",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  sx={{ marginLeft: "1.1em" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={8}
              sm={3}
              md={3}
              sx={{
                textAlign: { xs: "center", md: "right" },
              }}
            >
              {props.uploadAllowed && (
                <Box>
                  <ButtonGroup
                    size="small"
                    variant="contained"
                    ref={anchorRef}
                    aria-label="Button group with a nested menu"
                    sx={{
                      "& .MuiButtonGroup-grouped": {
                        borderColor: "#fff", // Change the separator color
                      },
                      "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                        borderRightColor: "#fff", // Change the color of the separator
                      },
                    }}
                  >
                    <Tooltip title="Add New" placement="top-start" arrow>
                      <Button size="small" onClick={handleAddBtn}>
                        <AddIcon
                          fontSize="small"
                          style={{ marginRight: "5px" }}
                        />
                        Add New
                      </Button>
                    </Tooltip>
                    <Tooltip title="More Options" placement="top-end" arrow>
                      <Button
                        size="small"
                        aria-controls={open ? "split-button-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleDropDownBtn}
                        tabIndex={-1}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                  <Popper
                    sx={{ zIndex: 1 }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={uploadButtonClose}>
                            <Tooltip
                              title="Upload File"
                              placement="right"
                              arrow
                            >
                              <Button
                                onClick={() => {
                                  setDialogOpen(true);
                                  setDlgMode(dialogMode.FileUpload);
                                }}
                              >
                                <CloudUploadIcon
                                  fontSize="small"
                                  style={{ marginRight: "5px" }}
                                />
                                Upload File
                              </Button>
                              {/* <Button
                                key={"Upload File"}
                                onClick={hideUploadBtn}
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                              >
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event: {
                                    target: { files: any };
                                  }) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      // console.log("Selected file:", file.name);
                                    }
                                  }}
                                  multiple
                                />
                                Upload File
                              </Button> */}
                            </Tooltip>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
              )}

              {props.AddAllowed && (
                <Tooltip title="Add New">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ width: { xs: "85%", md: "auto" } }}
                    onClick={handleAddBtn}
                  >
                    <AddIcon fontSize="small" style={{ marginRight: "5px" }} />
                    Add New
                  </Button>
                </Tooltip>
              )}
            </Grid>
            <Grid
              item
              xs={4}
              sm={1}
              md={1}
              sx={{
                textAlign: { xs: "center", md: "center" },
              }}
            >
              <Tooltip title="Manage Columns" placement="top-end" arrow>
                <IconButton
                  aria-controls="tune-menu"
                  aria-haspopup="true"
                  ref={(ref) => setAnchorEl(ref)}
                  onClick={toggleColBtn}
                  tabIndex={-1}
                >
                  <TuneIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Seperator />
          <StripedDataGrid
            apiRef={apiRef}
            disableColumnMenu
            rows={data ? data : []}
            rowHeight={40}
            columns={allColumns}
            onColumnResize={handleColumnResize}
            rowCount={NRows}
            getRowId={(row) => row.id}
            pagination={true}
            pageSizeOptions={[5, pgSize, 20]}
            paginationMode="server"
            paginationModel={PageModel}
            onPaginationModelChange={setPageModel}
            filterMode="server"
            onFilterModelChange={setFilterModel}
            rowSelectionModel={rowSelectionModel}
            loading={!data}
            onCellKeyDown={handleCellKeyDown}
            // autosizeOptions={autosizeOptions}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
            slotProps={{
              columnsPanel: {
                sx: {
                  "& .MuiDataGrid-panelFooter button:firstChild": {
                    display: "none",
                  },

                  ".MuiDataGrid-columnsManagementHeader": {
                    display: "none",
                  },
                  // '&.MuiDataGrid-row--borderBottom.css-yrdy0g-MuiDataGrid-columnHeaderRow': {
                  //   backgroundColor: 'black',
                  //   color: 'black',
                  //   fontSize: '50px',
                  // },
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
            disableRowSelectionOnClick
            sx={{ maxHeight: props.height }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
