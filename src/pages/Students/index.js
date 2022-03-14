import { AppBar, Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";
import StudentsTable from "../../components/Generic/Table";
import Dialog from "../../components/Generic/Dialog";
import { useEffect, useState } from "react";
import Text from "../../components/Generic/Text";
import { useSnackbar } from "notistack";
import axios from "../../api/axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "class",
    headerName: "Class",
    width: 160,
  },
];

const Students = () => {
  const [addNewDialogOpen, setAddNewDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [posting, setPosting] = useState(false);
  const [students, setStudents] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/v1/students", {
          signal: controller.signal,
        });
        const tableData = response.data.found.map((row, i) => ({
          id: i + 1,
          firstName: row.firstName,
          lastName: row.lastName,
          class: row.class,
        }));
        mounted && setStudents(tableData);
      } catch (err) {
        console.error(err.response || err.request);
      }
    };

    fetchStudents();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [posting]);

  const handleSaveStudent = async () => {
    if (firstName === "" || lastName === "") {
      enqueueSnackbar("First name & last name are required", {
        variant: "warning",
      });
    } else {
      console.log(firstName, lastName, studentClass);
      setPosting(true);
      try {
        const response = await axios.post("/api/v1/students", {
          firstName,
          lastName,
          class: studentClass,
        });
        console.log(response);
        resetForm();
        setPosting(false);
        setAddNewDialogOpen(false);
        enqueueSnackbar(response.statusText, { variant: "success" });
      } catch (err) {
        console.log(err.response || err.request);
        setPosting(false);
      }
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setStudentClass("");
  };

  console.log(students);

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
                Students
              </Heading>
              <div className="appBar__right flex-1 flex justify-end">
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<Add />}
                  onClick={() => setAddNewDialogOpen(true)}
                >
                  Add Student
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <main className="mt-2">
          <StudentsTable
            columns={columns}
            tableData={students}
            onRowClick={(e) => console.log(e)}
          />
        </main>
      </Container>
      <Dialog
        dialogTitle="Add New Student"
        open={addNewDialogOpen}
        setOpen={setAddNewDialogOpen}
        confirmAction={handleSaveStudent}
        confirmActionLabel={posting ? "Adding..." : "Add Student"}
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
                id="first-name"
                label="First Name"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                id="last-name"
                label="Last Name"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                id="class-name"
                label="Class"
                fullWidth
                variant="outlined"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
              />
            </Grid>
            <Grid item sx={12} md={6} lg={3}></Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
};

export default Students;
