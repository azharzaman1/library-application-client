import {
  AddAlert,
  CreditScore,
  Delete,
  Edit,
  Email,
  VisibilityOff,
  WhatsApp,
} from "@mui/icons-material";
import { Button, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";
import Text from "../../components/Generic/Text";
import { getRandomInt } from "../../utils";

const Student = () => {
  const [student, setStudent] = useState({});
  const [fetching, setFetching] = useState(false);

  const params = useParams();
  const { studentID } = params;

  const { enqueueSnackbar } = useSnackbar();

  // fetching book info from database

  const { isLoading, refetch: fetchStudent } = useQuery(
    "query-book-by-slug",
    async () => {
      return await axios.get(`/api/v1/students/${studentID}`);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res);
        setStudent(res.data.found);
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
    fetchStudent();
  }, [false, fetchStudent]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!student) {
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
              <Tooltip title="Edit">
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
            justifyContent="start"
          >
            <Grid item xs={4} sm={4} md={2}>
              <div className="bg-gray-200 rounded-full shadow-md p-2">
                <img
                  src="https://m.media-amazon.com/images/I/61gS6EWmWwL.jpg"
                  alt={student.firstName}
                  className="w-full rounded-full"
                />
              </div>
            </Grid>
            <Grid item xs={8} sm={8} md={5}>
              <div className="flex flex-col px-3 py-3 border-2 rounded-md border-gray-100 bg-primary bg-opacity-25 lg:max-w-md shadow-sm">
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
                <div className="mt-2 w-full">
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<CreditScore />}
                  >
                    View Score Card
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={10} md={5}>
              <div className="flex flex-col px-2 py-3 border-2 rounded-md border-gray-200 bg-gray-100 shadow-sm lg:max-w-sm">
                <Heading type="secondary">Contact details</Heading>
                <Divider className="py-1" />
                <div className="mt-4 w-full">
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<WhatsApp />}
                  >
                    Whatsapp (0317-0460466)
                  </Button>
                </div>
                <div className="mt-4 w-full">
                  <Button fullWidth variant="contained" startIcon={<Email />}>
                    Email (azharzaman.001@gmail.com)
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Student;
