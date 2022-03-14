import { Add } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";

import StudentsTable from "../../components/Generic/Table";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Book Name",
    width: 150,
  },
  {
    field: "author",
    headerName: "Book Author",
    width: 150,
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

/*
{
    borrowedBy: { type: String },
    borrowedOn: { type: Date },
    returnDate: { type: Date },
  },
*/

const books = [
  { class: "MB-1", id: 1, lastName: "Snow", firstName: "Jon" },
  { class: "MB-1", id: 2, lastName: "Lannister", firstName: "Cersei" },
  { class: "MB-1", id: 3, lastName: "Lannister", firstName: "Jaime" },
  { class: "MB-1", id: 4, lastName: "Stark", firstName: "Arya" },
  {
    class: "MB-1",
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
  },
  { class: "MB-1", id: 6, lastName: "Melisandre", firstName: null },
  { class: "MB-1", id: 7, lastName: "Clifford", firstName: "Ferrara" },
  { class: "MB-1", id: 8, lastName: "Frances", firstName: "Rossini" },
  { class: "MB-1", id: 9, lastName: "Roxie", firstName: "Harvey" },
];

const Books = () => {
  return (
    <div>
      <Container maxWidth={false}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            className="mt-8 rounded-md"
            color="secondary"
          >
            <Toolbar className="flex items-center">
              <Heading type="tertiary" className="text-gray-100">
                Books
              </Heading>
              <div className="appBar__right flex-1 flex justify-end">
                <Button color="primary" variant="contained" endIcon={<Add />}>
                  Add Book
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <main className="mt-2">
          <StudentsTable columns={columns} tableData={books} />
        </main>
      </Container>
    </div>
  );
};

export default Books;
