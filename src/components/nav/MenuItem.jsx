/** @format */

import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home,
  // NoteAdd,
  ListAlt,
  Category,
  Logout,
  Groups2,
 Folder
} from "@mui/icons-material";
import InventoryIcon from '@mui/icons-material/Inventory';
import { AuthApiProvider } from "../../context/auth/AuthProvider";
const MenuItem = ({ open, navigate }) => {
  const { logout,user } = AuthApiProvider();
  const data = [
    {
      name: "Dashboard",
      icon: <Home color="white" />,
      path: "/",
    },
    {
      name: "Categories",
      icon: <Category color="white" />,
      path: "/categories",
    },
    {
      name: "Subcategories",
      icon: <Folder color="white" />,
      path: "/subcategories",
    },
    {
      name: "Products",
      icon: <InventoryIcon color="white" />,
      path: "/products",
    },
    {
      name: "Orders",
      icon: <InventoryIcon color="white" />,
      path: "/orders",
    },
    {
      name: "Services",
      icon: <InventoryIcon color="white" />,
      path: "/services",
    },
    {
      name: "Users",
      icon: <Groups2 color="white" />,
      path: "/users",
    },
    {
      name: "Metadata",
      icon: <ListAlt color="white" />,
      path: "/showmetadata",
    },
    {
      name: "Logout",
      icon: <Logout color="white" />,
      path: "/logout",
    },
  ];
  const handleNavigate = (path) => {
    if (path === "/logout") {
      logout();
      navigate("/login");
    } else {
      navigate(`${path}`);
    }
  };
  return (
    <div>
      {data.map((item, index) => (
        <ListItem
          key={index}
          // disablePadding
          sx={{ display: "block" }}
          onClick={() => handleNavigate(item.path)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </div>
  );
};

export default MenuItem;
