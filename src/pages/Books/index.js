import React from "react";
import { Link } from "react-router-dom";

const Books = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/books/1">Books1</Link>
        </li>
        <li>
          <Link to="/books/2">Books2</Link>
        </li>
        <li>
          <Link to="/books/3">Books3</Link>
        </li>
        <li>
          <Link to="/books/4">Books4</Link>
        </li>
      </ul>
    </div>
  );
};

export default Books;
