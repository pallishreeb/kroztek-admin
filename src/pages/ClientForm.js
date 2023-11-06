// components/ClientForm.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';
import {API_URL} from "../config"



function ClientForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gstNumber: '',
    company: '',
    type: 'b2b',
    address: '',
  });

  const [gstOptions, setGstOptions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const [gstValue, setGstValue] = useState(''); // Separate state for GST input

  useEffect(() => {
    // Fetch GST options from your API
    fetch(`${API_URL}/client`)
      .then((response) => response.json())
      .then((data) => {
        setGstOptions(data.gstNumbers);
      });
  }, []);

  // const handleGstChange = (event) => {
  //   const selectedGst = event.target.value;
  //   setFormData({ ...formData, gstNumber: selectedGst });

  //   // Fetch client details for the selected GST number and autofill the form
  //   fetch(`${API_URL}/client/one?gstNumber=${selectedGst}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.client) {
  //         setFormData(data.client);
  //         setIsEditMode(true);
  //       } else {
  //         setIsEditMode(false);
  //       }
  //     });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Depending on whether it's edit mode or not, send the request to add or edit endpoint
    const endpoint = isEditMode ? `${API_URL}/client/edit` : `${API_URL}/client/add`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response as needed
        console.log(data);
      });
  };




const handleGstChange = (event, newValue) => {
  if (newValue === null) {
    setGstValue(''); // Reset GST input if newValue is null
  } else {
    setGstValue(newValue); // Set the GST input value based on newValue
  }

};
 return (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <InputLabel>Full Name</InputLabel>
        <TextField
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Email</InputLabel>
        <TextField
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Phone Number</InputLabel>
        <TextField
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>GST Number</InputLabel>
        <FormControl fullWidth>
          <Select
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleGstChange}
          >
            {gstOptions?.map((gst) => (
              <MenuItem key={gst} value={gst}>
                {gst}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Company</InputLabel>
        <TextField
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Type</InputLabel>
        <FormControl fullWidth>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value="b2b">B2B</MenuItem>
            <MenuItem value="b2c">B2C</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Address</InputLabel>
        <TextField
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
    <Button type="submit" variant="contained" color="primary">
      {isEditMode ? 'Update' : 'Save'}
    </Button>
  </form>
);
}

export default ClientForm;
