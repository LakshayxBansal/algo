"use client";

import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Toolbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { AddDialog } from "./addDialog";
import { RenderFormFunctionT } from "@/app/models/models";

type ModifyT = {
  renderForm?: RenderFormFunctionT;
  fetchDataFn: (
    page: number,
    value: any,
    pgSize: number,
    searchText: string
  ) => Promise<any>;
  fnFetchDataByID?: (id: number) => Promise<any>;
  customCols: GridColDef[];
  AddAllowed: boolean;
};

const pgSize = 10;

enum dialogMode {
  Add,
  Modify,
}

export default function EntityList(props: ModifyT) {
  const [id, setId] = useState("-1");
  const [name, setName] = useState<String>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [data, setData] = useState([]); // change to rows and type will be dynamic
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({ pageSize: pgSize, page: 0 });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [searchText, setSearchText] = useState("");
  const [modData, setModData] = useState({});
  const [dlgMode, setDlgMode] = useState(dialogMode.Add);

  useEffect(() => {
    async function fetchData() {
      // the fecth data function will come from props
      const rows: any = await props.fetchDataFn(
        PageModel.page,
        filterModel?.items[0]?.value,
        pgSize as number,
        searchText as string
      );
      setData(rows.data);

      setNRows(rows.count as number);
    }
    fetchData();
  }, [PageModel, filterModel, searchText]);

  const columns: GridColDef[] = props.customCols.concat([
    {
      field: "Edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => onModifyDialog(params.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            setId(params.row.id);
            setName(params.row.name);
            //setDeleteDlgState(true)
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  async function onModifyDialog(modId: number) {
    if (props.fnFetchDataByID && modId) {
      const data = await props.fnFetchDataByID(modId);
      setModData(data[0]);
      setDialogOpen(true);
      setDlgMode(dialogMode.Modify);
    }
  }

  return (
    <Container maxWidth="lg">
      <div style={{ height: 300, width: "100%", padding: "25px" }}>
        {/* <Toolbar/> */}
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              // label="Search..."
              name="search"
              id="search"
              placeholder="Search..."
              type="search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      fontSize="medium"
                      style={{
                        verticalAlign: "middle",
                        marginBottom: "0.2rem",
                        fontWeight: "bold",
                      }}
                    />
                  </InputAdornment>
                ),
                disableUnderline: true,
                sx: {
                  borderRadius: 0,
                  justifyContent: "center",
                  width: "fit-content",
                  flexGrow: 1,
                },
                style: { fontSize: "1.2rem", alignItems: "center" },
              }}
            />
          </Box>
          {props.AddAllowed && (
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setDialogOpen(true);
                  setDlgMode(dialogMode.Add);
                }}
              >
                ADD NEW
              </Button>
            </Box>
          )}
        </Box>
        {dialogOpen && (
          <AddDialog title={""} open={dialogOpen} setDialogOpen={setDialogOpen}>
            {props.renderForm
              ? dlgMode === dialogMode.Add
                ? props.renderForm(setDialogOpen, (arg) => {})
                : props.renderForm(setDialogOpen, (arg) => {}, modData)
              : 1}
          </AddDialog>
        )}

        <DataGrid
          rows={data ? data : []}
          columns={columns}
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
        />
      </div>
    </Container>
  );
}
