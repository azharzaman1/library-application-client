import { Route, Routes } from "react-router-dom";
import PersistLogin from "./components/Auth/PersistLogin";
import RequireAuth from "./components/Auth/RequireAuth";
import Layout from "./components/Generic/Layout";
import NotFound from "./pages/404";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Books from "./pages/Books";
import Book from "./pages/Books/Book";
import Homepage from "./pages/Homepage";
import Students from "./pages/Students";
import Student from "./pages/Students/Student";
import { userRoles } from "./static/userRoles";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route index element={<Homepage />} />
          <Route
            element={
              <RequireAuth
                allowedRoles={[userRoles.Admin, userRoles.Student]}
              />
            }
          >
            <Route path="students">
              <Route index element={<Students />}></Route>
              <Route path=":studentID" element={<Student />}></Route>
            </Route>
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  userRoles.Admin,
                  userRoles.Student,
                  userRoles.User,
                ]}
              />
            }
          >
            <Route path="books">
              <Route index element={<Books />}></Route>
              <Route path=":bookID" element={<Book />}></Route>
            </Route>
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
