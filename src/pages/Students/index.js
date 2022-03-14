import { AppBar, Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import Heading from "../../components/Generic/Heading";
import Container from "../../components/Generic/Layout/Container";
import StudentsTable from "../../components/Generic/Table";
import Dialog from "../../components/Generic/Dialog";
import { useState } from "react";
import Text from "../../components/Generic/Text";

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

const students = [
  { class: "MB-1", id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { class: "MB-1", id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { class: "MB-1", id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { class: "MB-1", id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  {
    class: "MB-1",
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
  },
  { class: "MB-1", id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { class: "MB-1", id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { class: "MB-1", id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { class: "MB-1", id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Students = () => {
  const [addNewDialogOpen, setAddNewDialogOpen] = useState(false);

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
          <StudentsTable columns={columns} tableData={students} />
        </main>
      </Container>
      <Dialog
        dialogTitle="Add New Student"
        open={addNewDialogOpen}
        setOpen={setAddNewDialogOpen}
        confirmAction={() => console.log("Confirmed")}
        confirmActionLabel="Add Student"
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
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                id="last-name"
                label="Last Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                id="class-name"
                label="Class"
                fullWidth
                variant="outlined"
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
