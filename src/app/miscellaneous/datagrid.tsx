import { DataGrid } from "@mui/x-data-grid";

export default function DataGridComp(props: any) {
  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      pageSizeOptions={[5, 10]}
      // checkboxSelection
      sx={{ overflow: "clip" }}
    />
  );
}
