import React, { useState, useEffect, useContext } from "react";
import { MenuItem, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthProvider";
import { CategoryContext } from "../context/CategoryProvider";

function CategoryPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, token,user } = authContext;
  const categoryContext = useContext(CategoryContext);
  const {
    getAllCategories,
    updateCategory,
    removeCategory,
    createCategory,
    categories,
    loading,
    updateCategoryStatus,
  } = categoryContext;

  // State for category input field
  const [categoryName, setCategoryName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("Product");
  const [rank, setRank] = useState(0);

  // State for currently editing category (if any)
  const [editingCategory, setEditingCategory] = useState(null);
  const isAddInclude = JSON.parse(user)?.permissions?.includes("addCategory");
const isEditIncluded = JSON.parse(user)?.permissions?.includes("editCategory");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      getAllCategories(token);
    }
  }, [isAuthenticated, token, categories?.length]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return; // Prevent empty submissions

    // Check if we are editing an existing category
    if (editingCategory !== null) {
      // Update the category in your context
      let form = {
        categoryId: categories[editingCategory]._id,
        categoryName,
        brand,
        rank,
        type
      };
      updateCategory(form, token);
      setCategoryName("");
      setBrand("")
      setType("")
      setRank(0);
      setEditingCategory(null);
    } else {
      let form = {
        category: categoryName,
        brand,
        type,
        rank,
      };
      // Add a new category to your context

      createCategory(form, token);
      setCategoryName("");
      setBrand("")
      setType("")
      setRank(0);
    }
  };

  // Function to handle category edit
  const handleEdit = (index) => {
    setCategoryName(categories[index].categoryName);
    setEditingCategory(index);
    setRank(categories[index]?.rank || 0);
    setBrand(categories[index]?.brand || "")
    setType(categories[index]?.type)
  };

  // Function to handle category deletion
  const handleDelete = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item,products and subcategory related to this product will also be removed?"
    );
    if (confirmed) {
      // Remove the category from your context
      removeCategory(categories[index]._id, token);
    }
  };

  const handleToggle = (status, id) => {
    let form = {
      categoryId: id,
      status: !status,
    };
    updateCategoryStatus(form, token);
  };

  return (
    <Container className="container mt-5">
    
      {(isAddInclude || isEditIncluded) && (
        <>
       <h2>Add/Edit Category</h2>
  
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
           <TextField
          label="Brand Name"
          variant="outlined"
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <TextField
        select
        label="Select an Option"
        variant="outlined"
        fullWidth
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mt-2"
      >
        <MenuItem value="Product">Product</MenuItem>
        <MenuItem value="Service">Service</MenuItem>
      </TextField>
        <TextField
          label="Rank"
          variant="outlined"
          fullWidth
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="mt-2"
        />
        <Button
          className="mt-2"
          type="submit"
          variant="contained"
          color="primary"
        >
          {editingCategory !== null ? "Update" : "Add"}
        </Button>
      </form>
      </>
      )}
      <h2 className="mt-3">Categories</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Rank</TableCell>
             <TableCell>Brand</TableCell>    
             <TableCell>Type</TableCell>        
              <TableCell>Category Name</TableCell>
              {JSON.parse(user)?.permissions?.includes("editCategory") && (
              <TableCell>Edit</TableCell> )}
               {JSON.parse(user)?.permissions?.includes("deleteCategory") && (
              <TableCell>Delete</TableCell> )}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <h3>Loading..</h3>
            ) : (
              <>
                {categories.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{category?.rank || 0}</TableCell>
                    <TableCell>{category?.brand || "NA"}</TableCell>
                    <TableCell>{category?.type || "NA"}</TableCell>
                    <TableCell>{category.categoryName}</TableCell>
                    {JSON.parse(user)?.permissions?.includes("editCategory") && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    )}
                    {JSON.parse(user)?.permissions?.includes("deleteCategory") && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                        )}
                    <TableCell>
                      <ToggleButtonGroup
                        value={category?.isActive}
                        exclusive
                        onChange={() =>
                          handleToggle(category?.isActive, category._id)
                        }
                        size="small"
                      >
                        {category?.isActive === true ? (
                          <ToggleButton
                            value={true}
                            style={{ backgroundColor: "greenyellow" }}
                          >
                            On
                          </ToggleButton>
                        ) : (
                          <ToggleButton
                            value={false}
                            style={{ backgroundColor: "red", color: "#fff" }}
                          >
                            Off
                          </ToggleButton>
                        )}
                      </ToggleButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CategoryPage;
