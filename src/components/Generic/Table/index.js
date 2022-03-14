import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ loading, columns, tableData, onRowClick }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={onRowClick}
        pageSize={8}
        autoHeight
        loading={loading}
      />
    </div>
  );
};

export default Table;
