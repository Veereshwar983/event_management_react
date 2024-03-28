import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register.css";
import { Button, Link, TextField, Typography } from "@mui/material";
import { APIDirectory } from "../rest";

interface RegisterFormData {
  email: string;
  password: string;
  role: "organizer" | "attendee";
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    role: "attendee",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = APIDirectory.registerUser();
      await axios
        .post(url, formData)
        .then((res) => {
          navigate("/login");
        });
    } catch (error) {
      //   console.error(error.response.data.message);
      // Show error message
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
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
        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="organizer">Organizer</option>
            <option value="attendee">Attendee</option>
          </select>
        </div>

        <Button type="submit" variant="contained" className="btn btn-primary">
          Register
        </Button>

        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Have already an account?{" "}
          <Link
            onClick={handleLoginClick}
            style={{
              color: "green",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Login here
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default Register;
