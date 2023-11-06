import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getCategories, getSubCategories } from "../apis/category";
import { AuthContext } from "../context/auth/AuthProvider";
import { toast } from "react-toastify";
import { PostContext } from "../context/PostProvider";
import ProductDescriptionEditor from "./Editor";
function AddProduct() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { isAuthenticated, token } = authContext;
  const postContext = useContext(PostContext);
  const { addProduct } = postContext;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Track the number of selected images
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [selectedDocumentCount, setSelectedDocumentCount] = useState(0);
  // Create a ref for the file input field
  const fileInputRef = useRef(null);
  const docfileInputRef = useRef(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    features: [{ name: "", value: "" }],
    images: [],
    documents: [],
    websiteLink: "",
    youtubeLink: "",
    rank:0
  });
  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, token]);
  const getCategoryAndSubcategory = (token) => {
    getCategories(token)
      .then((res) => {
        setCategories(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
    if (product?.category) {
      getSubCategories(product?.category, token)
        .then((res) => {
          setSubcategories(res.data.response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getCategoryAndSubcategory(token);
  }, [product?.category, token]);
  // Function to handle changes in the form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  // Function to handle changes in the description field
  const handleDescriptionChange = (description) => {
    setProduct({
      ...product,
      description, // Update the description in the product state
    });
  };

  // Function to handle changes in the features input
  const handleFeatureChange = (index, e) => {
    const { name, value } = e.target;
    const newFeatures = [...product.features];
    newFeatures[index][name] = value;
    setProduct({
      ...product,
      features: newFeatures,
    });
  };

  // Function to add a new feature input
  const addFeature = () => {
    setProduct({
      ...product,
      features: [...product.features, { name: "", value: "" }],
    });
  };

  // Function to remove a feature input
  const removeFeature = (index) => {
    const newFeatures = [...product.features];
    newFeatures.splice(index, 1);
    setProduct({
      ...product,
      features: newFeatures,
    });
  };

  // Function to handle image file input
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...files], // Append new files to the existing array
    }));
    setSelectedImageCount(selectedImageCount + files.length); // Update selected image count
  };

  // Function to handle document file input
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      documents: [...prevProduct.documents, ...files], // Append new files to the existing array
    }));
    setSelectedDocumentCount(selectedDocumentCount + files.length);
  };

  // Define the removeImage function to remove an image by index
  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({
      ...product,
      images: newImages,
    });
    setSelectedImageCount(selectedImageCount - 1); // Update selected image count
    // Reset the file input field to clear the selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const removeDocument = (index) => {
    const newDocs = [...product.documents];
    newDocs.splice(index, 1);
    setProduct({
      ...product,
      documents: newDocs,
    });
    setSelectedDocumentCount(selectedDocumentCount - 1);

    if (docfileInputRef.current) {
      docfileInputRef.current.value = null;
    }
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.name &&
      !product.description &&
      !product.category &&
      !product.subcategory
    ) {
      toast.warning("Please fill up all the star marked Inputs");
      return;
    }
    // Filter out empty feature objects
    const filteredFeatures = product.features.filter((feature) => {
      return feature.name.trim() !== "" || feature.value.trim() !== "";
    });

    // Create a new product object without empty features
    const productToSend = {
      ...product,
      features: filteredFeatures,
    };

    addProduct(productToSend, token, navigate);
  };

  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <Typography variant="h4">Add Product</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            {/* Rank */}
            <TextField
              label="Rank"
              name="rank"
              type="number"
              value={product.rank}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            {/* Categories */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {/* Category Dropdown */}
                <TextField
                  select
                  label="Category*"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category?._id} value={category?._id}>
                      {category?.categoryName}
                    </MenuItem>
                  ))}
                  <MenuItem value="" onClick={() => navigate("/categories")}>
                    Add category
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Subcategory Dropdown */}
                <TextField
                  select
                  label="Subcategory*"
                  name="subcategory"
                  value={product.subcategory}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="">Select Subcategory</MenuItem>
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory?._id} value={subcategory?._id}>
                      {subcategory?.subcategoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            {/* Name */}
            <TextField
              label="Name*"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <ProductDescriptionEditor
              value={product.description} // Pass the description value
              onChange={handleDescriptionChange} // Pass the change handler
            />
            {/* Features */}
            {product.features.map((feature, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={6}>
                  {/* Feature Name */}
                  <TextField
                    label="Feature Name"
                    name="name"
                    placeholder="Feature Name"
                    value={feature.name}
                    onChange={(e) => handleFeatureChange(index, e)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Feature Value */}
                  <TextField
                    label="Feature Value"
                    name="value"
                    placeholder="Feature Value"
                    value={feature.value}
                    onChange={(e) => handleFeatureChange(index, e)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                {index > 0 && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Remove />}
                      onClick={() => removeFeature(index)}
                      style={{ marginTop: "10px" }}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            ))}
            <br />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={addFeature}
            >
              Add Feature
            </Button>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {/* Website Link */}
                <TextField
                  label="Website Link"
                  name="websiteLink"
                  value={product.websiteLink}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* YouTube Link */}
                <TextField
                  label="YouTube Link"
                  name="youtubeLink"
                  value={product.youtubeLink}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Add Images */}
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Add Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
            {/* Display the selected image count */}
            {selectedImageCount > 0 && (
              <p>{selectedImageCount} file(s) selected</p>
            )}
            {/* Image Previews */}

            {product.images.length > 0 && (
              <div>
                <h3>Image Previews:</h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        marginRight: "10px",
                        marginBottom: "10px", // Add margin to separate images
                      }}
                    >
                      {/* Display the image */}
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Imageb ${index}`}
                        height="100"
                      />
                      {/* Remove button */}
                      <button
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Documents */}
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Add Document
            </label>
            <input
              type="file"
              name="documents"
              multiple
              onChange={handleDocumentUpload}
              ref={docfileInputRef}
            />
            {/* Display the selected document count */}
            {selectedDocumentCount > 0 && (
              <p>{selectedDocumentCount} document(s) selected</p>
            )}
            {/* Document Previews */}
            {product.documents.length > 0 && (
              <div>
                <h3>Document Previews:</h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {product.documents.map((document, index) => (
                    <div key={index} style={{ marginRight: "10px" }}>
                      {/* Display the document */}
                      <a
                        href={URL.createObjectURL(document)} // Use the object URL of the selected document
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Document {index + 1}
                      </a>
                      {/* Remove button */}
                      <button
                        onClick={() => removeDocument(index)}
                        className="m-2"
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddProduct;
