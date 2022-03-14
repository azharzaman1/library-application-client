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
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "../../api/axios";
import Dialog from "../../components/Generic/Dialog";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";

import StudentsTable from "../../components/Generic/Table";
import Text from "../../components/Generic/Text";
import { parseISOString } from "../../theming";

const columns = [
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

const Books = () => {
  const [addNewDialogOpen, setAddNewDialogOpen] = useState(false);
  const [available, setAvailable] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [borrowedBy, setBorrowedBy] = useState("");
  const [borrowedOn, setBorrowedOn] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [posting, setPosting] = useState(false);
  const [books, setBooks] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  // react-query get ll students

  const {
    isLoading,
    isFetching,
    refetch: fetchBooks,
  } = useQuery(
    "query-books",
    async () => {
      return await axios.get(`/api/v1/books`);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        const tableData = res.data.found.map((row, i) => ({
          id: i + 1,
          name: row.name,
          author: row.author,
          isBorrowed: row.borrowedBy ? "No" : "Yes",
          borrowedBy: row.borrowedBy || "-",
          borrowedOn: row.borrowedBy ? parseISOString(row.borrowedOn) : "-", // if borrowed only then date
          returnDate: row.borrowedBy ? parseISOString(row.returnDate) : "-", // if borrowed only then date
        }));
        setBooks(tableData);
        setPosting(false);
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        setPosting(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  // react-query post student
  const { mutate: postBook } = useMutation(
    async (bookData) => {
      return await axios.post("/api/v1/books", bookData);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        enqueueSnackbar(res.statusText, {
          variant: "success",
        });
        resetForm();
        setPosting(false);
        setAddNewDialogOpen(false);
        queryClient.invalidateQueries("query-books");
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        setPosting(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const handleSaveBook = async () => {
    if (name === "" || author === "") {
      enqueueSnackbar("First name & last name are required", {
        variant: "warning",
      });
    } else {
      setPosting(true);
      postBook({
        name,
        author,
        isBorrowed: available,
        borrowedBy,
        borrowedOn: available ? "" : borrowedOn,
        returnDate: available ? "" : returnDate,
      });
    }
  };

  const resetForm = () => {
    setName("");
    setAuthor("");
    setAvailable(false);
    setBorrowedBy("");
    setBorrowedOn(new Date());
    setReturnDate(new Date());
  };

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
        confirmAction={handleSaveBook}
        confirmActionLabel={posting ? "Adding..." : "Add Book"}
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
                fullWidth
                id="book-name"
                label="Book Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                fullWidth
                id="author-name"
                label="Author Name"
                variant="outlined"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
                    fullWidth
                    id="borrowed-by"
                    label="Borrowed By"
                    variant="outlined"
                    value={borrowedBy}
                    onChange={(e) => setBorrowedBy(e.target.value)}
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
                    value={borrowedOn}
                    onChange={(e) => setBorrowedOn(e.target.value)}
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
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
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
