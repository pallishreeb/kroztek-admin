import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories, getSubCategories } from "../apis/category";
import { getPost, deleteImg, editPost, deleteDoc } from "../apis/product";
import { AuthContext } from "../context/auth/AuthProvider";
import { toast } from "react-toastify";
import { IMG_URL } from "../config";
import ProductDescriptionEditor from './Editor'; // Import the component
function EditProduct() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { isAuthenticated, token } = authContext;

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [docs, setDocs] = useState([]);
  const { productId } = useParams();
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [selectedDocumentCount, setSelectedDocumentCount] = useState(0);
  const fileInputRef = useRef(null);
  const docfileInputRef = useRef(null);
 const [loading , setLoading] = useState(false)
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

  useEffect(() => {
    // Fetch the existing product data based on the productId
    if (productId) {
      setLoading(true)
      getPost(productId, token)
        .then((res) => {
          const productData = res?.data;
          setProduct({
            ...product,
            name: productData.name,
            description: productData.description,
            category: productData.category?._id,
            subcategory: productData?.subcategory?._id,
            features: productData?.features,
            images: [],
            documents: [],
            websiteLink: productData?.websiteLink,
            youtubeLink: productData?.youtubeLink,
            rank:productData?.rank
          });
          setImgUrls(
            productData?.images?.length > 0 ? productData?.images : []
          );
          setDocs(
            productData?.documents?.length > 0 ? productData?.documents : []
          );
          setLoading(false)
          // console.log("category", product?.category)
          // console.log("images",productData?.images)
        })
        .catch((err) => {
          console.log(err);
          // Handle error here, e.g., show a toast notification
        });
    }
  }, [productId, token]);

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

  const handleFeatureChange = (index, e) => {
    const { name, value } = e.target;
    const newFeatures = [...product.features];
    newFeatures[index][name] = value;
    setProduct({
      ...product,
      features: newFeatures,
    });
  };

  const addFeature = () => {
    setProduct({
      ...product,
      features: [...product.features, { name: "", value: "" }],
    });
  };

  const removeFeature = (index) => {
    const newFeatures = [...product.features];
    newFeatures.splice(index, 1);
    setProduct({
      ...product,
      features: newFeatures,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...files], // Append new files to the existing array
    }));
    setSelectedImageCount(selectedImageCount + files.length);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      documents: [...prevProduct.documents, ...files], // Append new files to the existing array
    }));
    setSelectedDocumentCount(selectedDocumentCount + files.length);
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({
      ...product,
      images: newImages,
    });
    setSelectedImageCount(selectedImageCount - 1);
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
  const removeImageFromDb = (imageName) => {
    //delete image from db and server
    deleteImg(productId, imageName)
      .then((res) => {
        // console.log("deleted from server and db", res)
        toast.success("Image removed succesfully.");
      })
      .catch((error) => {
        console.log("error in removing image from db and server");
        toast.error("Error in removing image.Please try later.");
      });
  };
  const removeDocFromDb = (docName) => {
    //delete image from db and server
    deleteDoc(productId, docName)
      .then((res) => {
        // console.log("deleted from server and db", res)
        toast.success("Document removed succesfully.");
      })
      .catch((error) => {
        console.log("error in removing Document from db and server");
        toast.error("Error in removing Document.Please try later.");
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append product details to the FormData
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("subcategory", product.subcategory);
    formData.append("websiteLink", product?.websiteLink);
    formData.append("youtubeLink", product?.youtubeLink);
    formData.append("rank", product?.rank);
    // Filter out empty feature objects
    const filteredFeatures = product.features.filter((feature) => {
      return feature.name.trim() !== "" || feature.value.trim() !== "";
    });

    // Append features as JSON string
    formData.append("features", JSON.stringify(filteredFeatures));

    // Append images and documents
    for (let i = 0; i < product?.images.length; i++) {
      formData.append("images", product?.images[i]);
    }

    for (let i = 0; i < product?.documents.length; i++) {
      formData.append("documents", product?.documents[i]);
    }

    // API call to update the product
    editPost(productId, token, formData)
      .then((response) => {
        // Handle success
        // console.log(response);
        toast.success("Product updated.");
        navigate(`/products`);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // Handle error here, e.g., show a toast notification
        toast.error("Error updating product. Please try again later.");
      });
  };

if(loading){
  return(<h3 className="text-center">Loading product for Edit...</h3>)
}

  return (
    <div className="container mt-3">
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <Typography variant="h4">Edit Product</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
              {/* Rank */}
              <TextField
              label="Rank"
              name="rank"
              type="number"
              value={product?.rank}
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
                  label="Category"
                  name="category"
                  value={product?.category}
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
                  label="Subcategory"
                  name="subcategory"
                  value={product?.subcategory}
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
              label="Name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            {/* Description */}
            {/* <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            /> */}
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
              Add Documents
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

            {/* Existing Images Previews */}
            {imgUrls?.length > 0 && (
              <div>
                <h3>Existing Images Previews:</h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {imgUrls?.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        marginRight: "10px",
                        position: "relative", // Add this style to make positioning relative
                      }}
                    >
                      {/* Display the image */}
                      <img
                        src={`${IMG_URL}/images/${image}`} // Use the image URL from your product data
                        alt={`Imagee ${index}`}
                        width="100" // Set a square size for the image
                        height="100" // Set a square size for the image
                      />
                      {/* Remove button */}
                      <button
                        onClick={() => removeImageFromDb(image)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer", // Add a pointer cursor for interaction
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Documents preview */}
            {docs?.length > 0 && (
              <div>
                <h3>Product Documents:</h3>
                <ul>
                  {docs.map((document, index) => (
                    <li key={index}>
                      <a
                        href={`${IMG_URL}/docs/${document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        {document}
                      </a>
                      {/* Remove button */}
                      <button
                        onClick={() => removeDocFromDb(document)}
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
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <br />
            <Button type="submit" variant="contained" color="primary">
              Update Product
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditProduct;
