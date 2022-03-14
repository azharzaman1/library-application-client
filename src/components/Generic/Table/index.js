import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ columns, tableData }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
