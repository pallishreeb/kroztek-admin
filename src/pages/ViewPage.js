import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AuthContext } from "../context/auth/AuthProvider";
import { getPost as getProduct, approveProducts } from "../apis/product";
import { getPost, approveServices } from "../apis/service";
const ViewPage = () => {
  const [productDetails, setProductDetails] = useState(null);
  const { productId, name } = useParams();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  useEffect(() => {
    const getProductdata = (token) => {
      getProduct(productId, token)
        .then((res) => {
          setProductDetails(res.data);
        })
        .catch((error) =>
          console.error("Error fetching product details", error)
        );
    };
    const getServicedata = (token) => {
      getPost(productId, token)
        .then((res) => {
          setProductDetails(res.data);
        })
        .catch((error) =>
          console.error("Error fetching product details", error)
        );
    };

    if (name === "product") {
      getProductdata(token);
    } else {
      getServicedata(token);
    }
  }, [productId, token, name]);

  const handleApprove = (status) => {
    // Implement your approve logic here
    approveProducts(productId, token, status)
      .then(() => {
        navigate(`/products`);
      })
      .catch((error) => console.error("Error approving product", error));
  };
  const handleApproveService = (status) => {
    // Implement your approve logic here
    approveServices(productId, token, status)
      .then(() => {
        navigate(`/services`);
      })
      .catch((error) => console.error("Error approving product", error));
  };

  if (!productDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ padding: "20px", width: "80%", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>

      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Name: {productDetails.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Description:
            <div
              dangerouslySetInnerHTML={{ __html: productDetails?.description }}
              className="mt-2"
            ></div>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Category: {productDetails.category?.categoryName}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Subcategory: {productDetails.subcategory?.subcategoryName}
          </Typography>

          {/* Display Images */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Images
          </Typography>
          {productDetails.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              style={{ maxWidth: "100%" }}
            />
          ))}

          {/* Display Features in a Table */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Features
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productDetails.features.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell>{feature.name}</TableCell>
                    <TableCell>{feature.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Display Documents with Links */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Documents
          </Typography>
          {productDetails.documents.map((document, index) => (
            <div key={index}>
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                {document.name}
              </a>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Approve, Reject, Edit Buttons */}
      <div style={{ display: "flex" }}>
        {name === "product" ? (
          <Button onClick={() => handleApprove("approved")}>Approve</Button>
        ) : (
          <Button onClick={() => handleApproveService("approved")}>
            Approve
          </Button>
        )}

        <Button onClick={() => navigate(`/pendings/${name}`)}>Reject</Button>
        {/* Add an Edit button that navigates to the edit page */}

        {name === "product" ? (
          <Button onClick={() => navigate(`/edit-product/${productId}`)}>
            Edit
          </Button>
        ) : (
          <Button onClick={() => navigate(`/edit-service/${productId}`)}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ViewPage;
