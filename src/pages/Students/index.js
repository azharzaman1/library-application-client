import React from "react";
import { Link } from "react-router-dom";

const Students = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/students/student1">Student1</Link>
        </li>
        <li>
          <Link to="/students/student2">Student2</Link>
        </li>
        <li>
          <Link to="/students/student3">Student3</Link>
        </li>
        <li>
          <Link to="/students/student4">Student4</Link>
        </li>
      </ul>
    </div>
  );
};

export default Students;
