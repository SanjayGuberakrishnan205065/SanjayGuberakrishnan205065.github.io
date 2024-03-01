import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      className="bg-gray-300"
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10, 20, 50, 100]}
    />
  );
};
export default DataTable;
