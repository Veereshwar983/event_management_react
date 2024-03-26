import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Register.css'
import { setUserData } from './actions/userActions';
import { useDispatch } from 'react-redux';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3004/login', formData)
      .then((res: any)=> {
        console.log('res==>>', res)
        if(res.data?.status === 'success'){
            console.log('its suceeededd', res.data.userData)
            dispatch(setUserData(res.data.userData))
            navigate('/home')
        }
      })
    } catch (error) {
    //   console.error(error.response.data.message);
      // Show error message
    }
  };

  const handleRegisterClick = () => {
    navigate('/register')
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
       
        <div className="form-group">
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        </div>
        
        <button type="submit" className="btn btn-primary">Login</button>
        <button onClick={handleRegisterClick} className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Login;
