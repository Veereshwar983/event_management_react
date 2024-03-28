// import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Home from './components/Home';
// import EventCreationForm from './components/EventCreationForm';

// const App = () => {
//     return (
//         <BrowserRouter>
//           <Routes>
//             <Route path='/register' element={<Register/>} />
//             <Route path='/login' element={<Login/>} />
//             <Route path='/home' element={<Home/>} />
//             <Route path='/eventCreation' element={<EventCreationForm/>} />
//           </Routes>
//         </BrowserRouter>
//     );
// };

// export default App;

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  // useNavigate,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import EventCreationForm from "./components/EventCreationForm";
import { useState } from "react";

const App = () => {
  // const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {
    // Perform logout actions here, such as clearing user data from local storage or state
    setLoggedIn(false);
    // Redirect to the login page after logout
    // history.push("/login");
    // navigate("/login");
  };
  return (
    <Router>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Event Management
            </Typography>
            {loggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            )}
            {/* <Button component={Link} to="/login" color="inherit">
              Login
            </Button> */}
          </Toolbar>
        </AppBar>
        <Container style={{ paddingTop: "64px" }}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/eventCreation" element={<EventCreationForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
