import React, { useState, useEffect, useContext } from "react";
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
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthProvider";
import { CategoryContext } from "../context/CategoryProvider";

function SubcategoryPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  const subcategoryContext = useContext(CategoryContext);
  const {
    removeSubcategory,
    updateSubcategory,
    createSubcategory,
    allSubcategories,
    categories, // Assuming you have a categories array
    loading,
    subcategories,
    getAllCategories,
    updateSubCategoryStatus,
  } = subcategoryContext;

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, navigate, token]);

  useEffect(() => {
    getAllCategories(token);
    allSubcategories(token);
  }, [subcategories?.length]);

  // State for subcategory input fields
  const [subcategoryName, setSubcategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [rank, setRank] = useState(0);
  // State for currently editing subcategory (if any)
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subcategoryName || !parentCategory) return; // Prevent empty submissions

    // Check if we are editing an existing subcategory
    if (editingSubcategory !== null) {
      // Update the subcategory
      let form = {
        categoryId: parentCategory,
        subcategoryName: subcategoryName,
        subId: editingSubcategory,
        rank,
      };
      updateSubcategory(form, token);
      setSubcategoryName("");
      setParentCategory("");
      setEditingSubcategory(null);
      setRank(0);
    } else {
      // Add a new subcategory
      let form = {
        subcategory: subcategoryName,
        categoryId: parentCategory,
        rank,
      };
      createSubcategory(form, token);
      setSubcategoryName("");
      setParentCategory("");
      setRank(0);
    }
  };

  // Function to handle subcategory edit
  const handleEdit = (subcategory) => {
    setSubcategoryName(subcategory.subcategoryName);
    setParentCategory(subcategory.categoryId._id);
    setEditingSubcategory(subcategory._id);
  };

  // Function to handle subcategory deletion
  const handleDelete = (subcategory) => {
    // Delete the subcategory in the context
    removeSubcategory(subcategory._id, token);
  };

  const handleToggle = (status, id) => {
    let form = {
      subId: id,
      status: !status,
    };
    updateSubCategoryStatus(form, token);
  };

  return (
    <Container className="container mt-5">
      <h2>Add/Edit Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="parent-category">
          Select Parent Category
        </InputLabel>
        <Select
          variant="outlined"
          fullWidth
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="mt-2"
        >
          <MenuItem value="">Select Parent Category</MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Enter Subcategory Name"
          variant="outlined"
          fullWidth
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          className="mt-1"
        />
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
          {editingSubcategory !== null ? "Update" : "Add"}
        </Button>
      </form>

      <h2 className="mt-3">Subcategories</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Subcategory Name</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <h3>Loading..</h3>
            ) : (
              <>
                {subcategories?.map((subcategory) => (
                  <TableRow key={subcategory._id}>
                    <TableCell>{subcategory?.rank || 0}</TableCell>
                    <TableCell>{subcategory.subcategoryName}</TableCell>
                    <TableCell>
                      {subcategory?.categoryId.categoryName}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(subcategory)}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(subcategory)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ToggleButtonGroup
                        value={subcategory?.isActive}
                        exclusive
                        onChange={() =>
                          handleToggle(subcategory?.isActive, subcategory._id)
                        }
                        size="small"
                      >
                        {subcategory?.isActive === true ? (
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

export default SubcategoryPage;
