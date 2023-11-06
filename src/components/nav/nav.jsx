/** @format */

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  Drawer as MuiDrawer,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
// import logo from "../../img/logo.png";
const drawerWidth = 210;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#005BAB",
  color: "tan",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background: "#005BAB",
  color: "tan",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Nav({ active, type }) {
  const theme = useTheme();

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(active);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant={type ? type : "permanent"} open={open}>
        <DrawerHeader>
          {open && (
            <Box
              display={"flex"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {/* <img src={logo} alt="logo" width={"39px"} height="39px" /> */}
              <h3 className="mt-2">Kroztek</h3>
            </Box>
          )}
          <IconButton onClick={handleDrawerClose} sx={{ color: "tan" }}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <MenuItem open={open} navigate={navigate} />
        </List>
      </Drawer>
    </Box>
  );
}
