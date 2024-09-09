"use client";

import { useEffect, useState } from "react";
import { GridColDef, GridFilterModel } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Checkbox,
  Container,
  debounce,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { AddDialog } from "./addDialog";
import { RenderFormFunctionT } from "@/app/models/models";
import { StripedDataGrid } from "@/app/utils/styledComponents";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import { StyledMenu } from "../../utils/styledComponents";
import DeleteForm from "./masterForms/deleteForm";

type ModifyT = {
  title: string;
  renderForm?: RenderFormFunctionT;
  fetchDataFn: (
    page: number,
    searchText: string,
    pgSize: number
  ) => Promise<any>;
  fnFetchDataByID?: (id: number) => Promise<any>;
  fnDeleteDataByID?: (id: number) => Promise<any>;
  customCols: GridColDef[];
  AddAllowed: boolean;
};

const pgSize = 10;

enum dialogMode {
  Add,
  Modify,
  Delete,
}

export default function EntityList(props: ModifyT) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [NRows, setNRows] = useState<number>(0);
  const [PageModel, setPageModel] = useState({ pageSize: pgSize, page: 0 });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [modData, setModData] = useState({});
  const [dlgMode, setDlgMode] = useState(dialogMode.Add);
  const [search, setSearch] = useState("");
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({} as any);
  const [ids, setIds] = useState(0);
  let searchText;

  useEffect(() => {
    const fetchData = debounce(async (searchText) => {
      const rows: any = await props.fetchDataFn(
        PageModel.page,
        searchText as string,
        pgSize as number
      );
      setData(rows.data);
      setNRows(rows.count as number);
    }, 400);

    fetchData(search);
  }, [
    PageModel,
    filterModel,
    searchText,
    search,
    dialogOpen,
    dialogOpenDelete,
  ]);

  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl2(null);
  };

  async function onModifyDialog(modId: number) {
    if (props.fnFetchDataByID && modId) {
      const data = await props.fnFetchDataByID(modId);
      setModData(data[0]);
      setDialogOpen(true);
      setDlgMode(dialogMode.Modify);
    }
  }

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibilityModel((prev: { [x: string]: any }) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  type iconT = {
    id: number;
  };

  function IconComponent(props: iconT) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <IconButton
              onClick={() => {
                onModifyDialog(props.id);
              }}
            >
              <EditIcon fontSize="large" />
              <Typography variant="h6">Edit</Typography>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <IconButton
              onClick={() => {
                setDialogOpenDelete(true);
                setIds(props.id);
              }}
            >
              <DeleteIcon />
              <Typography variant="h6">Delete</Typography>
            </IconButton>
          </MenuItem>
        </StyledMenu>
      </Box>
    );
  }
  const columns1: GridColDef[] = [
    {
      field: "Icon menu",
      headerName: "Options",
      renderCell: (params) => {
        return <IconComponent id={params.row.id} />;
      },
    },
  ];

  const columns: GridColDef[] = columns1.concat(props.customCols);

  return (
    <Container
      maxWidth="lg"
      style={{ height: "700px", width: "100%", padding: "25px" }}
    >
      <Typography variant="h4">{props.title}</Typography>
      <Divider />
      <Grid container spacing={2} style={{ verticalAlign: "center" }}>
        <Grid item xs={8}>
          <Box sx={{ width: "75%", marginLeft: "30px" }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: "#f5f5f5",
                },
              }}
              InputLabelProps={{
                style: {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ textAlign: "right", marginTop: "1.1rem", paddingRight: "45px" }}
        >
          {props.AddAllowed && (
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setDialogOpen(true);
                  setDlgMode(dialogMode.Add);
                }}
              >
                <AddIcon sx={{ paddingRight: "5px" }} />
                ADD NEW
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={1} sx={{ verticalAlign: "center", marginTop: "10px" }}>
          <IconButton
            aria-controls="tune-menu"
            aria-haspopup="true"
            onClick={handleClick1}
          >
            <TuneIcon fontSize="large" />
          </IconButton>
          <Box>
            <StyledMenu
              id="tune-menu"
              anchorEl={anchorEl2}
              open={Boolean(anchorEl2)}
              onClose={handleClose1}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                {columns.map((col) => (
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
        </Grid>
      </Grid>
      {dialogOpen && (
        <AddDialog title={""} open={dialogOpen} setDialogOpen={setDialogOpen}>
          {props.renderForm
            ? dlgMode === dialogMode.Add
              ? props.renderForm(setDialogOpen, (arg) => {})
              : props.renderForm(setDialogOpen, (arg) => {}, modData)
            : 1}
        </AddDialog>
      )}
      {dialogOpenDelete && (
        <AddDialog
          title={""}
          open={dialogOpenDelete}
          setDialogOpen={setDialogOpenDelete}
        >
          <DeleteForm
            setDialogOpen={setDialogOpenDelete}
            setDialogValue={(arg) => {}}
            data={ids}
          />
        </AddDialog>
      )}
      <StripedDataGrid
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
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        disableRowSelectionOnClick
      />
    </Container>
  );
}
