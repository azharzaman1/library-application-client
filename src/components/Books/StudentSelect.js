import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSnackbar } from "notistack";

export default function SelectLabels({ student, setStudent, setDBStudents }) {
  const axiosPrivate = useAxiosPrivate();
  const [students, setStudents] = React.useState();
  const { enqueueSnackbar } = useSnackbar();

  // react-query get all students
  const { isLoading, refetch: fetchStudents } = useQuery(
    "query-students",
    async () => {
      return await axiosPrivate.get(`/api/v1/students`);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("Get all students response", res);
        setDBStudents(res.data.found); // sending back to books page
        const dropdownData = res.data.found.map((item) => ({
          label: `${item?.firstName} ${item?.lastName}`,
          value: item?.slug,
        }));
        setStudents(dropdownData);
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const handleChange = (event) => {
    setStudent(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: "350px", maxWidth: "90vw" }}>
      <InputLabel id="demo-simple-select-helper-label">
        Select Student
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={student}
        label="Select Student"
        onChange={handleChange}
        onOpen={() => {
          !students && fetchStudents(); // making sure fetches only first open
        }}
      >
        <MenuItem value="none">
          <em>None</em>
        </MenuItem>
        {students &&
          students.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>
        Select student, or enter manually from below
      </FormHelperText>
    </FormControl>
  );
}
