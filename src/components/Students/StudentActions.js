import React, { useState } from "react";
import { Delete, Edit, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import Dialog from "../Generic/Dialog";
import Text from "../Generic/Text";
import AlertDialog from "../Generic/Dialog/Alert";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useSnackbar } from "notistack";
import dashify from "dashify";

const StudentActions = ({ student, setStudent }) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [slug, setSlug] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // open dialog with intial values as of student
  const handleUpdateDialogOpen = () => {
    setFirstName(student?.firstName);
    setLastName(student?.lastName);
    setStudentClass(student?.class);

    setSlug(student?.slug);
    setUpdateDialogOpen(true);
  };

  // react-query update student
  const { mutate: updateStudent } = useMutation(
    async (studentData) => {
      return await axios.put(`/api/v1/students/${slug}`, studentData);
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
        // if applicable navigate to new student page, cause slug gets updated
        // if you change firstName or lastName of student
        const newSlug = res.data.updated.slug;
        queryClient.invalidateQueries("query-student-by-slug");
        setStudent(res.data.updated);
        if (newSlug !== slug) {
          navigate(`/students/${newSlug}`, { replace: true });
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

  // update student handler
  const handleStudentUpdate = async () => {
    if (!firstName || !lastName) {
      enqueueSnackbar("Student firstName and firstName is required!", {
        variant: "info",
      });
    }
    const slug = dashify(`${firstName} ${lastName}`);
    updateStudent({
      firstName,
      lastName,
      class: studentClass,
      slug,
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // react-query student student
  const { mutate: deleteStudent } = useMutation(
    async () => {
      return await axios.delete(`/api/v1/students/${student?.slug || slug}`);
    },
    {
      onSuccess: (res) => {
        console.log("Deleted", res);
        enqueueSnackbar(res.statusText, {
          variant: "success",
        });
        setDeleteDialogOpen(false);
        // navigate to new student page, cause slug gets updated
        // if you change name of student
        queryClient.invalidateQueries("query-students");
        navigate(`/students`, { replace: true });
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        setUpdating(false);
        setDeleteDialogOpen(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  // delete student handler
  const handleStudentDelete = async () => {
    setSlug(student?.slug);
    deleteStudent();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setStudentClass("");
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
      {/* Edit Student dialog */}
      <Dialog
        dialogTitle={`Update Student: ${student?.firstName} ${student?.lastName}`}
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        confirmAction={handleStudentUpdate}
        confirmActionLabel={updating ? "Updating..." : "Update Student"}
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
                autoFocus
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
      {/* Delete student dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        dialogTitle={`Delete ${student?.firstName} ${student?.lastName}?`}
        confirmActionLabel="Delete"
        confirmAction={handleStudentDelete}
      >
        Are you sure you want to delete {student?.firstName}, this process can
        not be undone!
      </AlertDialog>
    </React.Fragment>
  );
};

export default StudentActions;
