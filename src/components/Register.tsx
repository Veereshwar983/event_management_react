import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Register.css';

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
      await axios
        .post("http://localhost:3004/register", formData)
        .then((res) => {
          navigate("/login");
        });
    } catch (error) {
      //   console.error(error.response.data.message);
      // Show error message
    }
  };

  const  handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="organizer">Organizer</option>
            <option value="attendee">Attendee</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
        <button onClick={handleLoginClick} className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Register;
