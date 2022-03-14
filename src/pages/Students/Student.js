import { useParams } from "react-router-dom";

const Student = () => {
  const params = useParams();
  const { studentID } = params;
  return <div>Student : {studentID}</div>;
};

export default Student;
