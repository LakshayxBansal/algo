import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const initialRows = [
  { id: 1, name: "John", age: 25, date: "2023-08-01" },
  { id: 2, name: "Jane", age: 30, date: "2023-08-15" },
  { id: 3, name: "Alice", age: 35, date: "2023-09-01" },
  { id: 4, name: "Bob", age: 40, date: "2023-09-10" },
];

export default function CustomFilterDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [anchorElAge, setAnchorElAge] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElDate, setAnchorElDate] = React.useState<null | HTMLElement>(
    null
  );
  const [lowerLimit, setLowerLimit] = React.useState<number | string>("");
  const [upperLimit, setUpperLimit] = React.useState<number | string>("");
  const [initialDate, setInitialDate] = React.useState<string>("");
  const [finalDate, setFinalDate] = React.useState<string>("");

  // Handle custom filter menu open for Age
  const handleClickAge = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAge(event.currentTarget);
  };

  // Handle custom filter menu open for Date
  const handleClickDate = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDate(event.currentTarget);
  };

  // Handle custom filter menu close for Age and Date
  const handleCloseAge = () => {
    setAnchorElAge(null);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  // Handle custom filter for age range
  const handleFilterChangeAge = () => {
    const lower = lowerLimit !== "" ? Number(lowerLimit) : null;
    const upper = upperLimit !== "" ? Number(upperLimit) : null;

    const filteredRows = initialRows.filter((row) => {
      const age = row.age;
      if (lower !== null && upper !== null) {
        return age >= lower && age <= upper;
      } else if (lower !== null) {
        return age >= lower;
      } else if (upper !== null) {
        return age <= upper;
      } else {
        return true;
      }
    });

    setRows(filteredRows);
  };

  // Handle custom filter for date range
  const handleFilterChangeDate = () => {
    const filteredRows = initialRows.filter((row) => {
      const rowDate = new Date(row.date).getTime();
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "age",
      headerName: "Age",
      width: 110,
      filterable: false, // Disable default filtering for age
      renderHeader: () => (
        <Box>
          <Button
            startIcon={
              <Tooltip title="Filter Age" arrow>
                <FilterListIcon />
              </Tooltip>
            }
            onClick={handleClickAge}
          >
            Age
          </Button>
          <Menu
            anchorEl={anchorElAge}
            open={Boolean(anchorElAge)}
            onClose={handleCloseAge}
          >
            <MenuItem>
              <TextField
                label="Lower Limit"
                variant="outlined"
                size="small"
                value={lowerLimit}
                onChange={(e) => setLowerLimit(e.target.value)}
                type="number"
                fullWidth
              />
            </MenuItem>
            <MenuItem>
              <TextField
                label="Upper Limit"
                variant="outlined"
                size="small"
                value={upperLimit}
                onChange={(e) => setUpperLimit(e.target.value)}
                type="number"
                fullWidth
              />
            </MenuItem>
            <MenuItem>
              <Button
                onClick={() => {
                  handleFilterChangeAge();
                  handleCloseAge();
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
    {
      field: "date",
      headerName: "Date",
      width: 150,
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

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} />
    </div>
  );
}
