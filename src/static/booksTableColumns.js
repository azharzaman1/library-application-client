export const bookTableColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Book Name",
    width: 230,
  },
  {
    field: "author",
    headerName: "Book Author",
    width: 200,
  },
  {
    field: "isBorrowed",
    headerName: "Available",
    width: 160,
  },
  {
    field: "borrowedBy",
    headerName: "Borrowed By",
    width: 160,
  },
  {
    field: "borrowedOn",
    headerName: "Borrow Date",
    width: 200,
  },
  {
    field: "returnDate",
    headerName: "Return Date(expected)",
    width: 200,
  },
];
