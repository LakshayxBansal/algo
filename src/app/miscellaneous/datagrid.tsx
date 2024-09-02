import { DataGrid } from "@mui/x-data-grid";

export default function DataGridComp(props: any){
    return (<DataGrid
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ overflow: 'clip' }}
      />
      )
}