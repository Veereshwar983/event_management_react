import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register.css";
import { setUserData } from "./actions/userActions";
import { useDispatch } from "react-redux";
import {
  Alert,
  Button,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { APIDirectory } from "../rest";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [snackObj, setSnackObj] = React.useState({ open: false, message: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = APIDirectory.loginUser();
      await axios
        .post(url, formData)
        .then((res: any) => {
          if (res.data?.status === "success") {
            handleClick("Successfully loggedIn");
            dispatch(setUserData(res.data.userData));
            setLoggedIn(true);
            navigate("/home");
          } else if (res.data?.status === "error") {
            handleClick(res.data?.message);
          }
        });
    } catch (error) {
      //   console.error(error.response.data.message);
      // Show error message
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleClick = (message) => {
    setSnackObj({ ...snackObj, open: true, message: message });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackObj({ ...snackObj, open: false });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            label="Password"
          />
        </div>

        <Button type="submit" variant="contained" className="btn btn-primary">
          Login
        </Button>

        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Not registered?{" "}
          <Link
            onClick={handleRegisterClick}
            style={{
              color: "green",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Create Account
          </Link>
        </Typography>
      </form>
      <Snackbar
        open={snackObj.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackObj?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
