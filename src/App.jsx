import { Slide, ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import { Container, Box } from "@mui/material";
import Preloader from "./components/Preloader/Preloader.jsx";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Solving from "./pages/Solving";
import Users from "./pages/Users.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import Stats from "./pages/Stats.jsx";

function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isAuth && <Header />}
          <Box
            component="main"
            sx={{
              flex: 1,
              paddingTop: isAuth ? "64px" : 0,
              paddingBottom: "40px",
            }}
          >
            <Container maxWidth="1240px">
              <Routes>
                <Route path="/login" element={isAuth ? <Navigate to={"/"} /> : <Login />} />
                <Route path="/register" element={isAuth ? <Navigate to={"/"} /> : <Register />} />
                <Route path="/" element={isAuth ? <Main /> : <Navigate to={"/login"} />} />
                <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to={"/login"} />} />
                <Route path="/users" element={isAuth ? <Users /> : <Navigate to={"/login"} />} />
                <Route path="/user/:id" element={isAuth ? <UserProfile /> : <Navigate to={"/login"} />} />
                <Route path="/task/:id" element={isAuth ? <Solving /> : <Navigate to={"/login"} />} />
                <Route path="/create" element={isAuth ? <CreateTask /> : <Navigate to={"/login"} />} />
                <Route path="/stats" element={isAuth ? <Stats /> : <Navigate to={"/login"} />} />
              </Routes>
            </Container>
          </Box>
          {isAuth && <Footer />}
        </>
      )}

      <ToastContainer
        position="top-left"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
        style={{ marginTop: "64px" }}
      />
    </Box>
  );
}

export default App;
