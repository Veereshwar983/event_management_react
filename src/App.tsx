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
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import EventCreationForm from "./components/EventCreationForm";
import { useState } from "react";
import Logout from "./Logout";

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {
    setLoggedIn(false);
  };
  return (
    <Router>
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Event Management
            </Typography>

            <Logout loggedIn={loggedIn} handleLogout={handleLogout} />
          </Toolbar>
        </AppBar>

        <Container
          style={{
            paddingTop: "64px",
            overflow: "hidden",
            height: "calc(100vh - 64px)",
          }}
        >
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
