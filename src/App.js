import { Route, Routes } from "react-router-dom";
import Layout from "./components/Generic/Layout";
import NotFound from "./pages/404";
import Book from "./pages/Books/Book";
import Books from "./pages/Books/Book";
import Homepage from "./pages/Homepage";
import Students from "./pages/Students";
import Student from "./pages/Students/Student";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        {/* <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> */}

        <Route index element={<Homepage />} />
        <Route path="students">
          <Route index element={<Students />}></Route>
          <Route path=":studentID" element={<Student />}></Route>
        </Route>
        <Route path="books">
          <Route index element={<Books />}></Route>
          <Route path=":bookID" element={<Book />}></Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
