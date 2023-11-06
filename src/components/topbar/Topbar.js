import * as React from "react";

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import MenuItem from "../nav/MenuItem";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Home", "Blog", "Add Blog"];

function DrawerAppBar(props) {
  const { window } = props;

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        background: "#005BAB",
        height: "100vh",
        color: "tan",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        {/* <img src={logo} alt='logo' width={"39px"} height="39px" /> */}
        <Typography variant="h6" sx={{ my: 2, color: "tan" }}>
          Kroztek
        </Typography>
        <IconButton sx={{ color: "tan" }}></IconButton>
      </Box>

      <Divider sx={{ background: "tan" }} />
      <List>
        <MenuItem open={true} navigate={navigate} />
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginBottom: "1rem" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#005BAB",
          color: "tan",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* <img src={logo} alt='logo' width={"39px"} height="39px" /> */}
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "block" },
                fontSize: "2rem",
              }}
            >
              Kroztek
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
