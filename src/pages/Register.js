import React, { useState,useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast} from 'react-toastify';
import { AuthContext } from '../context/auth/AuthProvider';
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const { register, isAuthenticated } = authContext;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
      toast.error('All fields are required');
      return;
    }else{
    register(formData, navigate);
    // Display success message
    toast.success('Registration successful');
    // Reset the form
    setFormData({
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    });
    }
 
  };

  return (
    <Container component="main" maxWidth="xs" className='mt-5'>
      <div>
        <Typography component="h1" variant="h5" className='text-center'>
          Register User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" mt={3}>
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
