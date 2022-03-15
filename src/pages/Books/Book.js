import { AddAlert, Delete, Edit, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import dashify from "dashify";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import Dialog from "../../components/Generic/Dialog";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";
import Text from "../../components/Generic/Text";
import { parseISOString } from "../../utils";

const Book = () => {
  const [book, setBook] = useState({});
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const params = useParams();
  const { bookID } = params;

  const { enqueueSnackbar } = useSnackbar();

  // fetching book info from database

  const { isLoading, refetch: fetchBook } = useQuery(
    "query-book-by-slug",
    async () => {
      return await axios.get(`/api/v1/books/${bookID}`);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res);
        setBook(res.data.found);
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  useEffect(() => {
    fetchBook();
  }, [false, fetchBook]);

  // states for book update
  const [available, setAvailable] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [borrowedBy, setBorrowedBy] = useState("");
  const [borrowedOn, setBorrowedOn] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [slug, setSlug] = useState("");

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

  // react-query post student
  const { mutate: updateBook } = useMutation(
    async (bookData) => {
      return await axios.put(`/api/v1/books/${slug}`, bookData);
    },
    {
      onSuccess: (res) => {
        console.log("Updated", res);
        enqueueSnackbar(res.statusText, {
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
        const statusText = err.response.statusText;
        setUpdating(false);
        enqueueSnackbar(statusText, {
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

  const resetForm = () => {
    setName("");
    setAuthor("");
    setAvailable(false);
    setBorrowedBy("");
    setBorrowedOn(new Date());
    setReturnDate(new Date());
  };

  const isBorrowed = book.borrowedBy; //if borower name is defined, mean currently borrowed

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Nothing to show about this book</div>;
  }

  return (
    <div className="pt-2">
      <Container maxWidth={false}>
        <div className="">
          <div
            className="relative w-full h-80 rounded-md bg-gray-200 mb-3 bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://i.ibb.co/zrwjbvm/banner.jpg')`,
            }}
          >
            <div className="flex items-center px-1 space-x-3 bg-white bg-opacity-60 absolute top-1 right-1 rounded-full">
              <Tooltip title="Delete">
                <IconButton>
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
          </div>
          {/* Details */}
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            justifyContent={isBorrowed ? "center" : "start"}
          >
            <Grid item xs={4} sm={4} md={2}>
              <div className="bg-gray-200 rounded-md shadow-md p-2">
                <img
                  src="https://m.media-amazon.com/images/I/61gS6EWmWwL.jpg"
                  alt={book.name}
                  className="w-full rounded-md"
                />
              </div>
            </Grid>
            <Grid item xs={8} sm={8} md={5}>
              <div className="flex flex-col px-3 py-3 border-2 rounded-md border-gray-100 bg-primary bg-opacity-25 lg:max-w-md shadow-sm">
                <Heading type="secondary">{book.name}</Heading>
                <Heading type="tertiary" className="mt-2">
                  {book.author} (Author)
                </Heading>
                <Text className="mt-3 mb-5">
                  One of the most dynamic and globally recognized entertainment
                  forces of our time opens up fully about his life, in a brave
                  and inspiring book that traces his learning curve to a place
                  where outer success, inner happiness.
                </Text>
                <Button variant="outlined" disabled={isBorrowed}>
                  {isBorrowed && "Sorry, Not "}Available,
                  {!isBorrowed && " Book Now"}
                </Button>
                {isBorrowed && (
                  <div className="mt-2 w-full">
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddAlert />}
                    >
                      Let me know when available
                    </Button>
                  </div>
                )}
              </div>
            </Grid>
            {isBorrowed && (
              <Grid item xs={12} sm={10} md={5}>
                <div className="flex flex-col px-2 py-3 border-2 rounded-md border-gray-200 bg-gray-100 shadow-sm lg:max-w-sm">
                  <Heading type="secondary">Borrow History</Heading>
                  <Divider className="py-1" />
                  <Heading type="tertiary" className="mt-2">
                    Current:
                  </Heading>
                  <div className="flex items-center space-x-3 mt-3">
                    <h2>Student: </h2>
                    <Text bold>{book.borrowedBy}</Text>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <h2>Borrowed On:</h2>
                    <Text bold>{parseISOString(book.borrowedOn)}</Text>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <h2>Return Date(expected):</h2>
                    <Text bold>{parseISOString(book.returnDate)}</Text>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </Container>
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
    </div>
  );
};

export default Book;
