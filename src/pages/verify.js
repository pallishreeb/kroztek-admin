import React, { useState, useEffect,useContext } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useParams} from "react-router-dom"
import { AuthContext } from '../context/auth/AuthProvider';
import { useNavigate } from "react-router-dom"
const Verify = () => {
const {email} = useParams()
const navigate = useNavigate();

const authContext = useContext(AuthContext);
const { resendOtp, verify } = authContext;
  const [formData, setFormData] = useState({
    email: email, // Received from params
    verificationCode: '',
  });

  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if(formData.verificationCode){
    verify({email , verificationCode : parseInt(formData.verificationCode)},navigate)
   }
  };

  const handleResend = () => {
    resendOtp(email)
    setCountdown(120);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Verify Email
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Verification Code"
            name="verificationCode"
            type="number"
            value={formData.verificationCode}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" mt={3}>
            Verify
          </Button>
        </form>
        {countdown > 0 ? (
          <Typography variant="body2" color="textSecondary" mt={2}>
            Resend OTP in {Math.floor(countdown / 60)}:{countdown % 60} minutes
          </Typography>
        ) : (
          <Link component="button" variant="body2" onClick={handleResend} mt={2}>
            Resend OTP
          </Link>
        )}
      </div>
    </Container>
  );
};

export default Verify;
