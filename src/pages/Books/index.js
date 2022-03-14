import { Add } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import Dialog from "../../components/Generic/Dialog";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";

import StudentsTable from "../../components/Generic/Table";
import Text from "../../components/Generic/Text";

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
  const [addNewDialogOpen, setAddNewDialogOpen] = useState(false);
  const [available, setAvailable] = useState(false);

  const handleAvailableChange = (e) => {
    setAvailable(e.target.checked);
  };

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
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<Add />}
                  onClick={() => setAddNewDialogOpen(true)}
                >
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

      <Dialog
        dialogTitle="Add New Book"
        open={addNewDialogOpen}
        setOpen={setAddNewDialogOpen}
        confirmAction={() => console.log("Confirmed")}
        confirmActionLabel="Add Book"
        discardActionLabel="Discard"
      >
        {/* Dialog Content */}
        <div>
          <div className="pb-5">
            <Text>Fill in info and hit Add New</Text>
          </div>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item sx={12}>
              <TextField
                id="book-name"
                label="Book Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                id="author-name"
                label="Author Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item sx={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={available}
                      onChange={handleAvailableChange}
                    />
                  }
                  label="Available for borrow"
                />
              </FormGroup>
            </Grid>
            {!available && (
              <Grid item container columnSpacing={2} rowSpacing={3}>
                <Grid item sx={12}>
                  <TextField
                    id="borrowed-by"
                    label="Borrowed By"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item sx={12}>
                  <TextField
                    fullWidth
                    id="borrow-date"
                    label="Borrowed On"
                    type="date"
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item sx={12}>
                  <TextField
                    fullWidth
                    id="return-date"
                    label="Expected return date"
                    type="date"
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      </Dialog>
    </div>
  );
};

export default Books;
