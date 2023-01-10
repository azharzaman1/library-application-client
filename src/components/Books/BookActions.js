import React, { useState } from "react";
import { Delete, Edit, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Dialog from "../Generic/Dialog";
import Text from "../Generic/Text";
import AlertDialog from "../Generic/Dialog/Alert";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { parseISOString } from "../../utils";
import { useSnackbar } from "notistack";
import dashify from "dashify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const BookActions = ({ book, setBook }) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [available, setAvailable] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [borrowedBy, setBorrowedBy] = useState("");
  const [borrowedOn, setBorrowedOn] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [slug, setSlug] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // book availablility switch
  const handleAvailableChange = (e) => {
    setAvailable(e.target.checked);
  };

  // open dialog with intial values as of book
  const handleUpdateDialogOpen = () => {
    setAvailable(!book?.borrowedBy);
    setName(book?.name);
    setAuthor(book?.author);
    setBorrowedBy(book?.borrowedBy);
    setBorrowedOn(parseISOString(book?.borrowedOn, "-"));
    setReturnDate(parseISOString(book?.returnDate, "-"));

    setSlug(book?.slug);
    setUpdateDialogOpen(true);
  };

  // react-query update book
  const { mutate: updateBook } = useMutation(
    async (bookData) => {
      return await axiosPrivate.put(
        `/api/v1/books/${book?.slug || slug}`,
        bookData
      );
    },
    {
      onSuccess: (res) => {
        console.log("Update Book Response", res);
        enqueueSnackbar("Book Updated", {
          variant: "success",
        });
        resetForm();
        setUpdating(false);
        setUpdateDialogOpen(false);
        // navigate to new book page, cause slug gets updated
        // if you change name of book
        const newSlug = res.data.updated.slug;
        queryClient.invalidateQueries("query-book-by-slug");
        setBook(res.data.updated);
        if (newSlug !== slug) {
          navigate(`/books/${newSlug}`, { replace: true });
        }
      },
      onError: (err) => {
        setUpdating(false);
        enqueueSnackbar("Book Record Update Failed", {
          variant: "error",
        });
      },
    }
  );

  // update book handler
  const handleBookUpdate = async () => {
    if (!name || !author) {
      enqueueSnackbar("Book name and author is required!", { variant: "info" });
    }
    setSlug(book?.slug);
    const slug = dashify(name);
    updateBook({
      name,
      author,
      isBorrowed: !available,
      borrowedBy: available ? "" : borrowedBy,
      borrowedOn: available ? "" : borrowedOn,
      returnDate: available ? "" : returnDate,
      slug,
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // react-query delete book
  const { mutate: deleteBook } = useMutation(
    async () => {
      return await axiosPrivate.delete(`/api/v1/books/${book?.slug || slug}`);
    },
    {
      onSuccess: (res) => {
        console.log("Delete Book Response", res);
        enqueueSnackbar("Book Deleted Successfully", {
          variant: "success",
        });
        setDeleteDialogOpen(false);
        // navigate to new book page, cause slug gets updated
        // if you change name of Book
        queryClient.invalidateQueries("query-books");
        navigate(`/books`, { replace: true });
      },
      onError: (err) => {
        setUpdating(false);
        setDeleteDialogOpen(false);
        enqueueSnackbar("Book Record Delete Failed", {
          variant: "error",
        });
      },
    }
  );

  // delete book handler
  const handleBookDelete = async () => {
    setSlug(book?.slug);
    deleteBook();
  };

  const resetForm = () => {
    setName("");
    setAuthor("");
    setAvailable(false);
    setBorrowedBy("");
    setBorrowedOn(new Date());
    setReturnDate(new Date());
  };

  return (
    <React.Fragment>
      <div className="flex items-center px-1 space-x-3 bg-white bg-opacity-60 absolute top-1 right-1 rounded-full">
        <Tooltip title="Delete">
          <IconButton onClick={() => setDeleteDialogOpen(true)}>
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" onClick={handleUpdateDialogOpen}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Hide">
          <IconButton>
            <VisibilityOff fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
      {/* Edit Book dialog */}
      <Dialog
        dialogTitle={`Update Book: ${book?.name}`}
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        confirmAction={handleBookUpdate}
        confirmActionLabel={updating ? "Updating..." : "Update Book"}
        discardActionLabel="Discard"
      >
        {/* Dialog Content */}
        <div>
          <div className="pb-5">
            <Text>Fill in info and hit Update</Text>
          </div>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item sx={12}>
              <TextField
                autoFocus
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
      {/* Delete Book dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        dialogTitle={`Delete ${book?.name}?`}
        confirmActionLabel="Delete"
        confirmAction={handleBookDelete}
      >
        Are you sure you want to delete {book?.name}, this process can not be
        undone!
      </AlertDialog>
    </React.Fragment>
  );
};

export default BookActions;
