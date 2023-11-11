import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../context/auth/AuthProvider';
import { getUsersToedit, updateUserPermission } from "../apis/user";
import {
  Typography,
  FormControlLabel,
  Button,
  Switch,
} from "@mui/material";
import { toast } from "react-toastify";

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const [checked, setChecked] = useState(false);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (token) {
      getUsersToedit(userId, token)
        .then(res => {
          setPermissions(res?.data?.response?.permissions || []);
          setChecked(res?.data?.response?.active || false);
        })
        .catch(err => {
          console.log("Error in getting User", err);
        });
    }
  }, [userId, token]);

  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) => {
      const updatedPermissions = prevPermissions?.includes(permission)
        ? prevPermissions?.filter((p) => p !== permission)
        : [...(prevPermissions || []), permission];

      console.log("Updated Permissions:", updatedPermissions);

      return updatedPermissions;
    });
  };

  const handleUpdate = () => {
    const data = {
      userId,
      permission: permissions,
      status: checked,
    };
    updateUserPermission(data,token).then((res) =>{
      // console.log('updated', res);
      toast.success('Successfully Updated');
      navigate('/users')
    }).catch((err) =>{
      console.log('error', err);
      toast.error('Something went wrong! Try again later');
    })
  };

  return (
    <div className="m-5">
        <Typography variant="h5" mb={4}>
          Edit User
        </Typography>
        <div style={{ marginBottom: 16 }}>
          <Typography variant="subtitle1" mb={2}>
            Product Permissions
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("addProduct")}
                onChange={() => handlePermissionChange("addProduct")}
              />
            }
            label="Add Product"
          />
          <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("editProduct")}
                onChange={() => handlePermissionChange("editProduct")}
              />
            }
            label="Edit Product"
          />
             <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("deleteProduct")}
                onChange={() => handlePermissionChange("deleteProduct")}
              />
            }
            label="Delete Product"
          />
          {/* Add other permission switches as needed */}
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography variant="subtitle1" mb={2}>
           Category Permissions
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("addCategory")}
                onChange={() => handlePermissionChange("addCategory")}
              />
            }
            label="Add Category"
          />
          <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("editCategory")}
                onChange={() => handlePermissionChange("editCategory")}
              />
            }
            label="Edit Category"
          />
             <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("deleteCategory")}
                onChange={() => handlePermissionChange("deleteCategory")}
              />
            }
            label="Delete Category"
          />
          {/* Add other permission switches as needed */}
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography variant="subtitle1" mb={2}>
            Subcategory Permissions
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("addSub")}
                onChange={() => handlePermissionChange("addSub")}
              />
            }
            label="Add SubCategory"
          />
          <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("editSub")}
                onChange={() => handlePermissionChange("editSub")}
              />
            }
            label="Edit SubCategory"
          />
            <FormControlLabel
            control={
              <Switch
                checked={permissions?.includes("deleteSub")}
                onChange={() => handlePermissionChange("deleteSub")}
              />
            }
            label="Delete SubCategory"
          />
          {/* Add other permission switches as needed */}
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography variant="subtitle1" mb={2}>
            Active/Block
          </Typography>
          <Switch
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          style={{ width: "50%" }}
        >
          Update
        </Button>
    </div>
  );
};

export default EditUser;
