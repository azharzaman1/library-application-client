import { CreditScore } from "@mui/icons-material";
import { Button, Divider, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";
import Text from "../../components/Generic/Text";
import StudentActions from "../../components/Students/StudentActions";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getRandomInt, parseISOString } from "../../utils";
import { selectUserType } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Generic/Loader";

const Student = () => {
  const [student, setStudent] = useState({});
  const params = useParams();
  const { studentID } = params;
  const userType = useSelector(selectUserType);
  const [books, setBooks] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();

  // fetching student info from database
  const { isLoading, refetch: fetchStudent } = useQuery(
    "query-student-by-slug",
    async () => {
      return await axiosPrivate.get(`/api/v1/students/${studentID}`);
    },
    {
      enabled: false,
      onSuccess: async (res) => {
        console.log("Fetch student response", res);
        await fetchUserBooks({ ids: res.data.found.borrowedBooks });
        console.log("User Borrowed Books", res.data.found.borrowedBooks);
        setStudent(res.data.found);
      },
      onError: (err) => {
        enqueueSnackbar("Unable to Retrieve Student Record", {
          variant: "error",
        });
      },
    }
  );
  const [reRunEffect] = useState(false);
  useEffect(() => {
    fetchStudent();
  }, [reRunEffect, fetchStudent]);

  // react-query user books fetch
  const { mutate: fetchUserBooks } = useMutation(
    async (booksIDs) => {
      return await axiosPrivate.post(`/api/v1/books/many`, booksIDs);
    },
    {
      onSuccess: (res) => {
        console.log("User books response", res);
        setBooks(res.data.result);
      },
      onError: (err) => {
        enqueueSnackbar("Unable Retrieve Student Book Records", {
          variant: "error",
        });
      },
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!student) {
    return <div>Nothing to show about this book</div>;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(https://i.ibb.co/hFh0JGk/white-waves.png)`,
      }}
    >
      <Container maxWidth={false}>
        <div className="">
          <div
            className="relative w-full h-80 rounded-md bg-gray-200 mb-3 bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://i.ibb.co/zrwjbvm/banner.jpg')`,
            }}
          >
            {userType === "Admin" && (
              <StudentActions student={student} setStudent={setStudent} />
            )}
          </div>
          {/* Details */}
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            justifyContent="start"
          >
            <Grid item xs={4} sm={4} md={2}>
              <div className="bg-gray-200 rounded-full shadow-md p-2">
                <img
                  src="https://i.ibb.co/LxHZZXX/placeholde-image.jpg"
                  alt={student.firstName}
                  className="w-full rounded-full"
                />
              </div>
            </Grid>
            <Grid item xs={8} sm={8} md={5}>
              <div className="flex flex-col px-3 py-3 border-2 rounded-md border-gray-100 bg-primary bg-opacity-25 shadow-sm lg:max-w-lg">
                <Heading type="secondary">
                  {student.firstName} {student.lastName}
                </Heading>
                <div className="flex items-center space-x-3 mt-2 flex-wrap">
                  <Text bold className="mt-2">
                    Class: {student.class}
                  </Text>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Text bold className="mt-2">
                    Roll No: {student.rollNo}
                  </Text>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Text bold className="mt-2">
                    Age: {getRandomInt(1, 20)}
                  </Text>
                </div>

                <Text className="mt-3 mb-5">
                  One of the most dynamic and globally recognized entertainment
                  forces of our time opens up fully about his life, in a brave
                  and inspiring book that traces his learning curve to a place
                  where outer success, inner happiness.
                </Text>
                {userType === "Admin" && (
                  <div className="mt-2 w-full">
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CreditScore />}
                    >
                      View Score Card
                    </Button>
                  </div>
                )}
              </div>
            </Grid>
            {userType === "Admin" || userType === "Student" ? (
              <>
                {student?.borrowedBooks?.length > 0 && (
                  <Grid item xs={12} sm={10} md={5}>
                    <div className="flex flex-col px-3 py-3 border-2 rounded-md border-gray-100 bg-white bg-opacity-75 shadow lg:max-w-md">
                      <Heading type="secondary">Borrowed Books</Heading>
                      <div className="mt-4 w-full">
                        {books?.length > 0 &&
                          books.map((book) => <Book book={book} />)}
                      </div>
                    </div>
                  </Grid>
                )}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

const Book = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className="border-t border-b py-2 border-dividerColor">
      <div className="flex items-center space-x-3">
        <h2>Book: </h2>
        <Text
          bold
          onClick={() => {
            book.slug && navigate(`/books/${book.slug}`);
          }}
          className="cursor-pointer hover:text-primary transition-colors duration-150"
        >
          {book?.name}
        </Text>
      </div>
      <div className="flex items-center space-x-3">
        <h2>Author: </h2>
        <Text bold>{book?.author}</Text>
      </div>
      <div className="flex items-center space-x-3">
        <h2>Borrowed On:</h2>
        <Text bold>{parseISOString(book?.borrowedOn)}</Text>
      </div>
      <div className="flex items-center space-x-3">
        <h2>Return Date(expected):</h2>
        <Text bold>{parseISOString(book?.returnDate)}</Text>
      </div>
    </div>
  );
};

export default Student;
