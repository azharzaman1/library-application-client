import { Button, Divider } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";
import Text from "../../components/Generic/Text";
import { parseISOString } from "../../theming";

const Book = () => {
  const [book, setBook] = useState({});
  const [fetching, setFetching] = useState(false);

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
        setFetching(false);
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        setFetching(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  useEffect(() => {
    fetchBook();
  }, [false, fetchBook]);

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
            className="w-full h-80 rounded-md bg-gray-200 background-po"
            style={{
              backgroundImage: `url('/banner.jpg')`,
            }}
          />
          {/* Details */}

          <div className="mt-3 flex flex-col lg:flex-row lg:items-start lg:space-x-3 px-4 lg:px-6">
            <div className="flex space-x-3 items-start flex-1">
              <div className="bg-gray-100 rounded-md shadow-md p-2">
                <img
                  src="https://m.media-amazon.com/images/I/61gS6EWmWwL.jpg"
                  alt={book.name}
                  className="w-48 md:w-64 rounded-md"
                />
              </div>
              <div className="max-w-md flex-1 flex flex-col px-3 py-3 border-2 rounded-md border-gray-100 bg-primary bg-opacity-25 shadow-sm self-stretch">
                <Heading type="secondary">{book.name}</Heading>
                <Heading type="tertiary" className="mt-2">
                  {book.author} (Author)
                </Heading>
                <Text className="max-w-xs mt-3 mb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  eveniet maxime soluta consectetur eligendi possimus sint vel
                  debitis, laboriosam aliquam.
                </Text>
                <Button variant="outlined" disabled={isBorrowed}>
                  {isBorrowed && "Sorry, Not "}Available,
                  {!isBorrowed && " Book Now"}
                </Button>
              </div>
            </div>
            {isBorrowed && (
              <div className="mt-5 w-[400px] max-w-md md:mt-0 flex flex-col px-2 py-3 border-2 rounded-md border-gray-200 bg-gray-100 shadow-sm self-stretch">
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
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Book;
