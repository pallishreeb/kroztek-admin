import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { Link, useParams, useNavigate } from "react-router-dom"
import { createMetadata, editMetadata, getMetadataForEdit } from '../apis/metadata'
import { AuthContext } from "../context/auth/AuthProvider";

function Metadata() {

  const params = useParams();
  const { metadataId } = params;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const [siteName, setSiteName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedImage, setSelectedImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');



  useEffect(() => {
    if (metadataId) {
      getMetadataForEdit(metadataId, token).then((res) => {
        setSiteName(res.data.response.siteName)
        setDescription(res.data.response.description)
        setEmail(res.data.response.email)
        setPhoneNumber(res.data.response.phoneNumber)
        setUploadedImage(res.data.response.logo)
      })
    }
  }, [metadataId])
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('upload_preset', 'socila_media');

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/da01buahx/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setUploadedImage(data.url);
        setLogo(data.url)
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !phoneNumber || !siteName || !description) {
      alert("Please fill all the fields")
    } else {
      const data = {
        siteName, description, email, phoneNumber, logo
      }
      createMetadata(data, token).then((res) => {
        alert("Saved metadata")
        navigate('/')
      }).catch((err) => {
        alert('Error in saving metadata')
        console.log("error in creating metadata", err)
      })
    }
  }

  function handleEdit(event) {
    event.preventDefault();
    if (!email || !phoneNumber || !siteName || !description) {
      alert("Please fill all the fields")
    } else {
      const data = {
        siteName, description, email, phoneNumber, logo
      }
      editMetadata(metadataId, token, data).then((res) => {
        alert("Updated metadata")
        navigate('/')
      }).catch((err) => {
        alert('Error in updating metadata')
        console.log("error in updating metadata", err)
      })
    }
  }

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className="col-md-6 offset-">
          <h2 className='text-center'>Add your Metada for website</h2>
          <form onSubmit={metadataId ? handleEdit : handleSubmit} action={<Link to="/login" />}>

            <TextField
              type="text"
              variant='outlined'
              color='secondary'
              label="Company Name"
              onChange={e => setSiteName(e.target.value)}
              value={siteName}
              fullWidth
              sx={{ mb: 4 }}
              required
            />
            <TextField
              type="text"
              variant='outlined'
              color='secondary'
              label="Tag Line"
              onChange={e => setDescription(e.target.value)}
              value={description}
              fullWidth
              sx={{ mb: 4 }}
              required
            />

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="email"
                variant='outlined'
                color='secondary'
                label="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="text"
                variant='outlined'
                color='secondary'
                label="Phone Number"
                onChange={e => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
                fullWidth
                sx={{ mb: 4 }}
              />
            </Stack>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Button variant="contained" color="primary" onClick={handleImageUpload}>
              Upload Image
            </Button>
            {uploadedImage ? (
              <CloudinaryContext cloudName="your_cloud_name">
                <Image publicId={uploadedImage} width="300" height="200" />
              </CloudinaryContext>
            ) : "Uploading Image"}


            <Button variant="outlined" color="secondary" type="submit" sx={{ ml: 2 }}>{metadataId ? 'Edit' : 'Save'}</Button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Metadata