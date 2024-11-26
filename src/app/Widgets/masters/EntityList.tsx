"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GridColDef,
  GridFilterModel,
  gridPreferencePanelStateSelector,
  GridPreferencePanelsValue,
  useGridApiRef,
  gridClasses,
  GridColumnVisibilityModel,
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
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddDialog } from "./addDialog";
import { entitiyCompT, formMetaDataPropT, loggedInUserDataT, regionalSettingSchemaT, rightSchemaT } from "@/app/models/models";
import { StripedDataGrid } from "@/app/utils/styledComponents";
import { VisuallyHiddenInput } from "@/app/utils/styledComponents";
import UploadFileForm from "./UploadFileForm";
import Seperator from "../seperator";
import DeleteComponent from "./component/DeleteComponent";
import IconComponent from "./component/IconComponent";
import { getRoleID } from "@/app/controllers/entityList.controller";
import { useRouter } from "next/navigation";

const pgSize = 10;

enum dialogMode {
  Add,
  Modify,
  Delete,
  FileUpload,
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
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});
  const [metaData, setMetaData] = useState<formMetaDataPropT>({
    fields: [],
    rights: {} as rightSchemaT,
    regionalSettingsConfigData: {} as regionalSettingSchemaT,
    loggedInUserData: {} as loggedInUserDataT
  });

  const anchorRef = useRef<HTMLDivElement>(null);
  const apiRef = useGridApiRef();
  const router = useRouter();
  const url = usePathname();
  let searchText;

  //for navbar search
  const searchParams = useSearchParams();
  const searchData: string | null = searchParams.get("searchText");
  //for navbar search

  useEffect(() => {
    const fetchData = debounce(async (searchText) => {
      const rows: any = await props.fetchDataFn(
        PageModel.page,
        searchText as string,
        pgSize as number
      );

      const roleId = await getRoleID();
      if (rows.data) {
        setData(rows.data);
        setNRows(rows.count as number);
      }


      const optionsColumn: GridColDef[] = [
        {
          field: "Icon menu",
          headerName: "More Options",
          minWidth: 50,
          hideable: false,
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
              />
            );
          },
        },
      ];

      //if roleid is 1(admin) show options columns
      let allDfltCols: GridColDef[];

      // if (roleId == 1) {
      //   allDfltCols = optionsColumn.concat(props.customCols);
      // } else {
      //   allDfltCols = props.customCols;
      // }
      //if roleid is 1(admin) show options columns

      allDfltCols = optionsColumn.concat(props.customCols);
      const dfltColFields: string[] = allDfltCols.map((col) => col.field);
      if (props.fnFetchColumns) {
        const columnsData = await props.fnFetchColumns();
        if (columnsData) {
          const dbColumns = columnsData.map((col: any) => ({
            field: col.column_name,
            headerName: col.column_label,
          }));
          // filter on columns not to showinitially
          const filteredColumns = dbColumns.filter(
            (col: any) => !dfltColFields.includes(col.field)
          );
          //columns not to showinitially
          const allColumns = allDfltCols.concat(filteredColumns);
          const visibleColumns = allColumns.reduce((model: any, col: any) => {
            model[col.field] = dfltColFields.includes(col.field);
            return model;
          }, {});
          setColumnVisibilityModel(visibleColumns);
          setAllColumns(allColumns);
          // setColumnsChanged(true);
          // we dont need the state as use effect renders two time in the first iteration of useeffect it will set the visibility model
        }
      } else {
        setAllColumns(allDfltCols);
      }
      //for title
      // let newUrl : string;
      // console.log(url);
      // if(url.includes("?")){
      //   newUrl = url+`&pgTitle=${props.title}`
      // }else{
      //   newUrl = url+`?pgTitle=${props.title}`
      // }
      // router.push(newUrl);
      //for title

    }, 400);

    if (searchData) {
      fetchData(searchData);
    } else {
      fetchData(search);
    }
  }, [
    PageModel,
    filterModel,
    searchText,
    search,
    dialogOpen,
    searchData,
    apiRef,
    props
  ]);

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
    if (props.fnFetchDataByID) {
      const data = await props.fnFetchDataByID(0);
      console.log("!12 : ", data);
      if (data[0]?.length > 0) {
        console.log("221 : ", data[0][0]);
        setMetaData({
          fields: data[0][0] || [],
          rights: data[0][1] || {},
          regionalSettingsConfigData: data[0][2] || [],
          loggedInUserData: data[0][3] || {}
        });
      }
      // console.log("dialogmode.ADD",metaData);
    }
    setDialogOpen(true);
    setDlgMode(dialogMode.Add);
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
          <AddDialog title="" open={dialogOpen} setDialogOpen={setDialogOpen}>
            {props.fileUploadFeatureReqd &&
              dlgMode === dialogMode.FileUpload ? (
              <UploadFileForm
                setDialogOpen={setDialogOpen}
                fnFileUpad={props.fnFileUpad}
                sampleFileName={props.sampleFileName}
              />
            ) : props.renderForm && dlgMode === dialogMode.Add ? (
              metaData.fields.length > 0 ? props.renderForm(setDialogOpen, (arg) => { }, metaData) : props.renderForm(setDialogOpen, (arg) => { })
            ) : props.renderForm && dlgMode === dialogMode.Modify ? (
              props.renderForm(setDialogOpen, (arg) => { }, metaData, modData)
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
                  sx={{ marginLeft: '1.1em' }}
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
                              </Button>
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
                >
                  <TuneIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Seperator />
          <StripedDataGrid
            disableColumnMenu
            rows={data ? data : []}
            rowHeight={40}
            columns={allColumns}
            rowCount={NRows}
            getRowId={(row) => row.id}
            pagination={true}
            pageSizeOptions={[pgSize]}
            paginationMode="server"
            paginationModel={PageModel}
            onPaginationModelChange={setPageModel}
            filterMode="server"
            onFilterModelChange={setFilterModel}
            loading={!data}
            apiRef={apiRef}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              setColumnVisibilityModel(newModel);
            }}
            slotProps={{
              columnsPanel: {
                sx: {
                  "& .MuiDataGrid-panelFooter button:firstChild": {
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
            disableRowSelectionOnClick
            sx={{ maxHeight: props.height }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
