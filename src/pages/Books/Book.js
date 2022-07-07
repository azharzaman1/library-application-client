import { AddAlert } from "@mui/icons-material";
import { Button, Divider, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookActions from "../../components/Books/BookActions";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";
import Text from "../../components/Generic/Text";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { selectUserType } from "../../redux/slices/userSlice";
import { parseISOString } from "../../utils";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const userType = useSelector(selectUserType);
  const [book, setBook] = useState({});
  const params = useParams();
  const { bookID } = params;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // fetching book info from database
  const { isLoading, refetch: fetchBook } = useQuery(
    "query-book-by-slug",
    async () => {
      return await axiosPrivate.get(`/api/v1/books/${bookID}`);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("Fetch book response", res);
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
  }, [fetchBook]);

  const isBorrowed =
    book?.student?.firstName || book.isBorrowed || book.borrowedBy; //if borower name is defined, mean currently borrowed

  const currentBorrower = {
    fullName: book?.student?.firstName
      ? `${book?.student?.firstName} ${book?.student?.lastName}`
      : book.borrowedBy,
    slug: book?.student?.slug ? book?.student?.slug : null,
  };

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
            {userType === "Admin" && (
              <BookActions book={book} setBook={setBook} />
            )}
          </div>
          {/* Details */}
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            justifyContent={
              isBorrowed && userType === "Admin" ? "center" : "start"
            }
          >
            <Grid item xs={4} sm={4} md={2}>
              <div className="bg-gray-200 rounded-md shadow-md p-2">
                <img
                  src="https://i.ibb.co/LxHZZXX/placeholde-image.jpg"
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
            {isBorrowed && userType === "Admin" ? (
              <Grid item xs={12} sm={10} md={5}>
                <div className="flex flex-col px-2 py-3 border-2 rounded-md border-gray-200 bg-gray-100 shadow-sm lg:max-w-sm">
                  <Heading type="secondary">Borrow History</Heading>
                  <Divider className="py-1" />
                  <Heading type="tertiary" className="mt-2">
                    Current:
                  </Heading>
                  <div className="flex items-center space-x-3 mt-3">
                    <h2>Student: </h2>
                    <Text
                      bold
                      onClick={() => {
                        currentBorrower?.slug &&
                          navigate(`/students/${currentBorrower?.slug}`);
                      }}
                      className="cursor-pointer hover:text-primary transition-colors duration-150"
                    >
                      {currentBorrower?.fullName}
                    </Text>
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
            ) : (
              <></>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Book;
